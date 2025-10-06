import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import "./Education.css";

const Education = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const articles = [
    {
      title: "Plastic Waste Management",
      description:
        "Understand how plastics are categorized, recycled, and reused to reduce environmental pollution.",
      category: "Plastic",
      readTime: "6 min read",
      image: "🧴",
      color: "blue-gradient",
      link: "https://en.wikipedia.org/wiki/Plastic_recycling",
      content: `
Plastic waste is one of the most significant global challenges today, as it contributes to pollution, marine contamination, and greenhouse gas emissions. 
Plastic can take hundreds of years to decompose, so proper segregation and recycling are vital. There are seven main categories of plastic, identified by their 
resin codes (1–7). Common recyclable plastics include PET (used in bottles), HDPE (containers), and PP (caps and packaging). 
To manage plastic waste, individuals should clean and segregate recyclable plastics before disposal. Non-recyclable items, such as multilayered plastics and 
styrofoam, should be minimized through conscious consumer choices. Reuse plastic containers whenever possible, and prefer biodegradable or compostable packaging alternatives.
Industries can contribute by adopting Extended Producer Responsibility (EPR), ensuring they take back used plastic packaging. 
Governments across the world are enforcing bans on single-use plastics to curb pollution. 
By following these principles, individuals and communities can drastically reduce plastic waste, promoting a circular economy and protecting marine ecosystems.
      `,
    },
    {
      title: "Paper Recycling & Reuse",
      description:
        "Learn how to recycle paper waste effectively and how paper products can be reused to save trees and energy.",
      category: "Paper",
      readTime: "5 min read",
      image: "📄",
      color: "orange-gradient",
      link: "https://en.wikipedia.org/wiki/Paper_recycling",
      content: `
Paper waste forms a major portion of household and office waste. Recycling paper helps conserve trees, water, and energy resources. 
The recycling process involves collecting used paper, removing contaminants (like staples or ink), and pulping it to form new sheets. 
Common recyclable paper items include newspapers, magazines, notebooks, and cardboard boxes. However, wax-coated, oily, or wet paper should not be recycled as they affect the quality of recycled paper.
Reusing paper is equally important — blank sides of printed sheets can be used for drafts or notes. Paper bags and packaging can also be reused before disposal.
Composting is another eco-friendly option for non-recyclable paper products, as they break down naturally and enrich the soil. 
At a larger scale, industries are shifting toward sustainable paper production through bamboo-based pulp or recycled fibers. 
Individuals can contribute by switching to digital documentation and minimizing unnecessary printing. Through proper recycling and reuse, we can significantly reduce deforestation and help mitigate climate change.
      `,
    },
    {
      title: "Tin & Metal Recycling",
      description:
        "Discover the recycling process of tin and other metals — reducing mining impact and conserving natural resources.",
      category: "Tin / Metals",
      readTime: "7 min read",
      image: "🥫",
      color: "gray-gradient",
      link: "https://en.wikipedia.org/wiki/Tin_recycling",
      content: `
Metal recycling is one of the most effective ways to conserve natural resources and energy. Tin, aluminum, steel, and copper are among the most recycled metals globally. 
Unlike many materials, metals can be recycled repeatedly without degrading their quality. 
Tin cans, beverage containers, kitchen utensils, and other metallic packaging materials can be collected, cleaned, and melted down to produce new metal products.
Recycling metals saves up to 75% of the energy required for mining and refining virgin ore. It also significantly reduces the amount of waste sent to landfills and decreases the environmental impact of mining.
To recycle metals effectively, users should rinse containers and separate them from non-metallic waste. Magnet-based sorting systems in recycling facilities make it easy to distinguish ferrous (iron-based) and non-ferrous metals.
Communities benefit from metal recycling not only by reducing pollution but also through economic growth via scrap collection industries.
By responsibly managing tin and metal waste, we move closer to sustainable resource use and a greener planet.
      `,
    },
    {
      title: "Composting Fruits & Vegetables",
      description:
        "Turn organic waste like fruit peels and vegetable scraps into compost — creating natural fertilizer for your garden.",
      category: "Compost / Organic",
      readTime: "8 min read",
      image: "🌱",
      color: "green-gradient",
      link: "https://en.wikipedia.org/wiki/Compost",
      content: `
Composting is a natural process that transforms organic waste such as fruit peels, vegetable scraps, leaves, and garden clippings into nutrient-rich soil. 
This process helps reduce landfill waste and methane emissions while providing a free and sustainable fertilizer for gardens and farms. 
There are two main types of composting — aerobic (with oxygen) and anaerobic (without oxygen). Aerobic composting is faster and more common for household use.
To start composting, collect biodegradable materials in a compost bin or pit. Maintain a proper balance between “green” waste (wet organic matter like food waste) and “brown” waste (dry leaves or paper). 
Turn the pile regularly to maintain aeration, and within a few weeks, the material transforms into dark, crumbly compost. 
Avoid adding meat, dairy, or oily foods, as they attract pests. Compost improves soil fertility, enhances moisture retention, and supports beneficial microorganisms.
Composting empowers individuals to take responsibility for their waste, turning what was once garbage into valuable garden nourishment — a true example of circular sustainability.
      `,
    },
  ];

  return (
    <div className="education-container">
      <div className="education-header">
        <h2>Learn Waste Management</h2>
        <p>
          Get detailed knowledge about how to handle, recycle, and reuse
          different types of waste effectively.
        </p>
      </div>

      <div className="education-grid">
        {articles.map((article, index) => (
          <div key={index} className="education-card">
            <div className={`card-image ${article.color}`}>{article.image}</div>
            <div className="card-content">
              <div className="card-meta">
                <span className="category">{article.category}</span>
                <span className="time">{article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>

              <button
                className="read-more"
                onClick={() => toggleExpand(index)}
              >
                <span>
                  {expandedIndex === index ? "Hide Details" : "Read More"}
                </span>
                {expandedIndex === index ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {expandedIndex === index && (
                <div className="article-details">
                  <p>{article.content}</p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wiki-link"
                  >
                    📖 Read on Wikipedia
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="extra-resources">
        <h3>📚 Additional Reading</h3>
        <ul>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Waste_management"
              target="_blank"
              rel="noopener noreferrer"
            >
              Waste Management Overview
            </a>
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Recycling"
              target="_blank"
              rel="noopener noreferrer"
            >
              Recycling Processes Explained
            </a>
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Solid_waste_policy_in_India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solid Waste Policy in India
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Education;
