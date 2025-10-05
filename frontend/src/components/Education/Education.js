import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Education.css'; // ✅ external css

const Education = () => {
  const articles = [
    {
      title: 'Plastic Recycling Guide',
      description: 'Learn about different plastic types and how to recycle them properly',
      category: 'Recycling',
      readTime: '5 min read',
      image: '♻️',
      color: 'blue-gradient'
    },
    {
      title: 'Composting Basics',
      description: 'Start your own compost and turn organic waste into garden gold',
      category: 'Composting',
      readTime: '8 min read',
      image: '🌱',
      color: 'green-gradient'
    },
    {
      title: 'E-Waste Management',
      description: 'Safely dispose of electronics and recover valuable materials',
      category: 'Electronics',
      readTime: '6 min read',
      image: '📱',
      color: 'purple-gradient'
    },
    {
      title: 'Zero Waste Living',
      description: 'Tips and strategies to minimize your household waste footprint',
      category: 'Lifestyle',
      readTime: '10 min read',
      image: '🌍',
      color: 'orange-gradient'
    },
    {
      title: 'Textile Recycling',
      description: 'What to do with old clothes, shoes, and fabric materials',
      category: 'Textiles',
      readTime: '4 min read',
      image: '👕',
      color: 'pink-gradient'
    },
    {
      title: 'Hazardous Waste',
      description: 'Safely handle and dispose of dangerous household chemicals',
      category: 'Safety',
      readTime: '7 min read',
      image: '⚠️',
      color: 'yellow-gradient'
    }
  ];

  return (
    <div className="education-container">
      <div className="education-header">
        <h2>Learn & Grow</h2>
        <p>Expand your knowledge about sustainable waste management</p>
      </div>

      <div className="education-grid">
        {articles.map((article, index) => (
          <div key={index} className="education-card">
            <div className={`card-image ${article.color}`}>
              {article.image}
            </div>
            <div className="card-content">
              <div className="card-meta">
                <span className="category">{article.category}</span>
                <span className="time">{article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <button className="read-more">
                <span>Read More</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
