"use client";

import { useParams } from 'next/navigation';
import { 
  ArticleHeader,
  ArticleMetadata,
  ArticleImage,
  ArticleContent,
  RelatedArticles,
  ArticleNotFound
} from '../../../components/pages/articles';
import { Newsletter } from '@/components/common';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  image: string;
  featured: boolean;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'eXobe Launches Revolutionary AI-Powered Shopping Assistant',
    excerpt: 'Experience the future of online shopping with our new AI assistant that helps you find exactly what you need, when you need it.',
    content: `
      <p>We're thrilled to announce the launch of our revolutionary AI-powered shopping assistant, marking a significant milestone in our commitment to enhancing the online shopping experience for our customers.</p>
      
      <h2>What Makes Our AI Assistant Special?</h2>
      <p>Our AI shopping assistant isn't just another chatbot. It's a sophisticated system that understands your preferences, learns from your shopping behaviour, and provides personalised recommendations that truly match your needs.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li><strong>Intelligent Product Discovery:</strong> Simply describe what you're looking for in natural language, and our AI will find the perfect products for you.</li>
        <li><strong>Personalised Recommendations:</strong> Based on your browsing history and preferences, get suggestions tailored specifically to your taste.</li>
        <li><strong>Smart Price Comparison:</strong> Automatically compare prices across different brands and find the best deals.</li>
        <li><strong>Real-time Availability:</strong> Get instant updates on product availability and delivery options in your area.</li>
      </ul>
      
      <h2>How It Works</h2>
      <p>The AI assistant is seamlessly integrated into our website and mobile app. You can access it through the chat icon in the bottom right corner of any page. Simply start a conversation by typing what you're looking for, and the assistant will guide you through the process.</p>
      
      <p>For example, you could type "I need a comfortable running shoe for long distances under R2000" and the AI will immediately show you relevant options, filtered by your budget and requirements.</p>
      
      <h2>Privacy and Security</h2>
      <p>We understand that privacy is paramount when it comes to AI and personal data. Our AI assistant operates with the highest security standards and only uses data that you explicitly share to improve your shopping experience. You have full control over your data and can opt out at any time.</p>
      
      <h2>What's Next?</h2>
      <p>This is just the beginning. We're continuously improving the AI assistant with new features like voice commands, image recognition for visual searches, and integration with our augmented reality try-on features.</p>
      
      <p>We invite you to try out our new AI shopping assistant and let us know what you think. Your feedback is invaluable in helping us create the best possible shopping experience.</p>
    `,
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15',
    readTime: 5,
    category: 'Technology',
    image: '🤖',
    featured: true
  },
  {
    id: '2',
    title: 'Sustainable Shopping: Our Commitment to a Greener Future',
    excerpt: 'Discover how eXobe is leading the charge in sustainable e-commerce with eco-friendly packaging and carbon-neutral delivery options.',
    content: `
      <p>At eXobe, we believe that great shopping experiences shouldn't come at the cost of our planet. That's why we're proud to announce our comprehensive sustainability initiative that will transform how we operate and serve our customers.</p>
      
      <h2>Our Green Commitment</h2>
      <p>We've made a bold commitment to achieve carbon neutrality by 2025 and become a fully sustainable e-commerce platform by 2030. This isn't just about reducing our environmental impact – it's about leading the industry towards a more sustainable future.</p>
      
      <h3>Eco-Friendly Packaging Revolution</h3>
      <p>Starting this month, all eXobe shipments will use our new sustainable packaging made from:</p>
      <ul>
        <li><strong>100% Recycled Materials:</strong> Our boxes are made entirely from post-consumer recycled cardboard.</li>
        <li><strong>Biodegradable Padding:</strong> We've replaced plastic bubble wrap with biodegradable cornstarch padding.</li>
        <li><strong>Minimal Design:</strong> Right-sized packaging reduces waste and shipping costs.</li>
        <li><strong>Reusable Components:</strong> Our boxes are designed to be reused for returns or personal storage.</li>
      </ul>
      
      <h2>Carbon-Neutral Delivery Options</h2>
      <p>We're partnering with leading logistics companies to offer carbon-neutral delivery options across South Africa. Here's how it works:</p>
      
      <h3>Green Delivery Network</h3>
      <ul>
        <li><strong>Electric Vehicle Fleet:</strong> Our urban deliveries now use electric vehicles in Johannesburg, Cape Town, and Durban.</li>
        <li><strong>Optimised Routes:</strong> AI-powered route optimisation reduces fuel consumption by up to 30%.</li>
        <li><strong>Carbon Offsetting:</strong> For deliveries that can't be made with electric vehicles, we offset 100% of carbon emissions through verified environmental projects.</li>
      </ul>
      
      <h2>Sustainable Product Curation</h2>
      <p>We're expanding our sustainable product range with a dedicated "Green Choice" section featuring:</p>
      <ul>
        <li>Products made from recycled or sustainable materials</li>
        <li>Items from certified B-Corp and environmentally responsible brands</li>
        <li>Energy-efficient electronics and appliances</li>
        <li>Locally sourced products to reduce transportation emissions</li>
      </ul>
      
      <h2>Customer Impact Tracking</h2>
      <p>Every customer will receive a personalised sustainability report showing:</p>
      <ul>
        <li>Carbon footprint of their orders</li>
        <li>Environmental impact savings from choosing sustainable options</li>
        <li>Recommendations for more eco-friendly alternatives</li>
      </ul>
      
      <h2>Join Us in Making a Difference</h2>
      <p>Sustainability is a journey we're taking together with our customers. Look out for our new "Green Choice" badges on products, opt for carbon-neutral delivery, and join our packaging return programme launching next month.</p>
      
      <p>Together, we can prove that exceptional shopping experiences and environmental responsibility go hand in hand.</p>
    `,
    author: 'Michael Green',
    publishedAt: '2024-01-12',
    readTime: 7,
    category: 'Sustainability',
    image: '🌱',
    featured: true
  },
  {
    id: '3',
    title: 'Black Friday 2024: Record-Breaking Sales and Customer Satisfaction',
    excerpt: 'A look back at our most successful Black Friday event, featuring incredible deals and unprecedented customer engagement.',
    content: `
      <p>What a week it's been! Our Black Friday 2024 event has officially ended, and we're absolutely blown away by the incredible response from our customers. This year's event wasn't just our biggest sale ever – it was a testament to the strength of our community and the trust you place in eXobe.</p>
      
      <h2>Breaking Records Across the Board</h2>
      <p>The numbers speak for themselves, but they only tell part of the story:</p>
      
      <h3>Sales Milestones</h3>
      <ul>
        <li><strong>2.3 Million Orders:</strong> More than double our previous Black Friday record</li>
        <li><strong>R450 Million in Sales:</strong> Our highest single-week revenue in company history</li>
        <li><strong>89% Customer Satisfaction:</strong> Highest satisfaction scores we've ever achieved during a major sale event</li>
        <li><strong>99.7% Uptime:</strong> Our platform remained stable despite unprecedented traffic</li>
      </ul>
      
      <h2>What Made This Year Special</h2>
      <p>Beyond the impressive numbers, what truly made Black Friday 2024 special was the experience we created for our customers.</p>
      
      <h3>Early Access Programme</h3>
      <p>Our eXobe Plus members enjoyed 48-hour early access to all deals, resulting in:</p>
      <ul>
        <li>40% of Plus members took advantage of early access</li>
        <li>Average order value 25% higher than general sale period</li>
        <li>98% satisfaction rate from early access participants</li>
      </ul>
      
      <h3>Mobile-First Experience</h3>
      <p>This year, mobile shopping dominated:</p>
      <ul>
        <li>72% of orders placed via mobile devices</li>
        <li>Mobile app downloads increased by 300% during the sale week</li>
        <li>Average mobile session time increased by 45%</li>
      </ul>
      
      <h2>Customer Stories That Inspired Us</h2>
      <p>While numbers are impressive, the stories from our customers truly made this Black Friday memorable:</p>
      
      <blockquote>
        <p>"I was able to get everything on my Christmas list for my three kids within my budget. The early access for Plus members was a game-changer!" - Maria K., Cape Town</p>
      </blockquote>
      
      <blockquote>
        <p>"The mobile app made shopping so easy. I completed my entire order during my lunch break!" - David M., Johannesburg</p>
      </blockquote>
      
      <h2>Behind the Scenes: Making It Happen</h2>
      <p>Our success wouldn't have been possible without months of preparation:</p>
      
      <h3>Infrastructure Scaling</h3>
      <ul>
        <li>Increased server capacity by 400% to handle traffic spikes</li>
        <li>Partnered with additional logistics providers to ensure fast delivery</li>
        <li>Enhanced our customer service team with 200% more agents</li>
      </ul>
      
      <h3>Vendor Partnerships</h3>
      <p>We worked closely with over 500 brands to secure exclusive deals and ensure adequate stock levels. Special thanks to our top-performing partners who helped make this event a success.</p>
      
      <h2>Looking Ahead</h2>
      <p>Black Friday 2024 has set a new standard for what's possible. We're already planning for next year with even more exciting features:</p>
      <ul>
        <li>Enhanced AI-powered deal recommendations</li>
        <li>Virtual reality shopping experiences</li>
        <li>Expanded same-day delivery coverage</li>
        <li>More sustainable packaging options</li>
      </ul>
      
      <h2>Thank You</h2>
      <p>To every customer who chose eXobe during Black Friday 2024 – thank you. Your trust and enthusiasm drive us to continuously improve and innovate. We're already working on making next year's event even better.</p>
      
      <p>Stay tuned for our upcoming Cyber Monday deals and our special Christmas campaign launching next week!</p>
    `,
    author: 'Emma Davis',
    publishedAt: '2024-01-10',
    readTime: 4,
    category: 'Business',
    image: '🛍️',
    featured: false
  }
];

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  
  const article = newsArticles.find(a => a.id === articleId);
  const relatedArticles = newsArticles.filter(a => a.id !== articleId && a.category === article?.category).slice(0, 2);

  if (!article) {
    return <ArticleNotFound />;
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Article link copied to clipboard!');
      }
    } catch (err) {
      console.error('Unable to share article');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleHeader title={article.title} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleMetadata article={article} onShare={handleShare} />
        
        <ArticleImage image={article.image} />
        
        <ArticleContent content={article.content} />
        
        <RelatedArticles articles={relatedArticles} />
      </article>
      <Newsletter />
    </div>
  );
}
