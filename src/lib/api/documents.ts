const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function graphqlRequest<T>(
  query: string,
  variables: Record<string, any> = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 401 || response.status === 403) {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('exobeUser');
        localStorage.removeItem('exobeUserAddresses');
      }
    } catch (_) {}
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'mutation{ logout }' }),
        credentials: 'include',
      });
    } catch (_) {}
    if (typeof window !== 'undefined') {
      const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/auth/login?returnUrl=${returnUrl}`;
    }
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    const first = json.errors[0]?.message || 'GraphQL error occurred';
    if (/unauthorized|forbidden/i.test(first)) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('exobeUser');
          localStorage.removeItem('exobeUserAddresses');
        }
      } catch (_) {}
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: 'mutation{ logout }' }),
          credentials: 'include',
        });
      } catch (_) {}
      if (typeof window !== 'undefined') {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/auth/login?returnUrl=${returnUrl}`;
      }
    }
    throw new Error(first);
  }

  if (!json.data) {
    throw new Error('No data returned from GraphQL query');
  }

  return json.data;
}

/**
 * Get or generate invoice URL for an order
 */
export async function getInvoiceUrl(orderId: string, token?: string): Promise<string> {
  const query = `
    query GetInvoiceUrl($orderId: String!) {
      getInvoiceUrl(orderId: $orderId)
    }
  `;

  const data = await graphqlRequest<{ getInvoiceUrl: string }>(
    query,
    { orderId },
    token
  );

  return data.getInvoiceUrl;
}

/**
 * Get or generate receipt URL for an order (only for paid orders)
 */
export async function getReceiptUrl(orderId: string, token?: string): Promise<string> {
  const query = `
    query GetReceiptUrl($orderId: String!) {
      getReceiptUrl(orderId: $orderId)
    }
  `;

  const data = await graphqlRequest<{ getReceiptUrl: string }>(
    query,
    { orderId },
    token
  );

  return data.getReceiptUrl;
}

/**
 * Force generate a new invoice
 */
export async function generateInvoice(orderId: string, token?: string): Promise<string> {
  const query = `
    mutation GenerateInvoice($orderId: String!) {
      generateInvoice(orderId: $orderId)
    }
  `;

  const data = await graphqlRequest<{ generateInvoice: string }>(
    query,
    { orderId },
    token
  );

  return data.generateInvoice;
}

/**
 * Force generate a new receipt (only for paid orders)
 */
export async function generateReceipt(orderId: string, token?: string): Promise<string> {
  const query = `
    mutation GenerateReceipt($orderId: String!) {
      generateReceipt(orderId: $orderId)
    }
  `;

  const data = await graphqlRequest<{ generateReceipt: string }>(
    query,
    { orderId },
    token
  );

  return data.generateReceipt;
}

/**
 * Download a document from a URL
 */
export async function downloadDocument(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to download document');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
}

