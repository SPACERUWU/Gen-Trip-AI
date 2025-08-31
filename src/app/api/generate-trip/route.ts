import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();
    
    if (!userInput) {
      return NextResponse.json({ error: 'User input is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API key is not configured");
    }

    const modelName = 'gemini-1.5-flash-latest'; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;

    // Enhanced prompt system for comprehensive worldwide travel planning
    const enhancedPrompt = `You are an expert travel planner with over 15 years of experience in creating comprehensive travel itineraries worldwide. You are also a skilled writer who can create engaging and easy-to-read content.

User Request: ${userInput}

Please create a comprehensive, enjoyable, and useful travel itinerary using the following format:

## 🗓️ Trip Information
- **Destination:** [Specify location]
- **Duration:** [Number of days/nights]
- **Estimated Budget:** [Cost estimate]
- **Recommended Time:** [Best season/month to visit]
- **Difficulty Level:** [Easy/Moderate/Challenging]

## 🚗 Transportation
- **Getting There:** [How to reach the destination from major cities, with approximate costs]
- **Local Transportation:** [Rental cars/public transport/taxis/ride-sharing with costs]
- **Travel Time:** [Duration of travel]
- **Tips:** [Transportation advice]

## 🏨 Accommodation
- **Accommodation Type:** [Hotel/Resort/Guesthouse/Hostel/Airbnb/Camping]
- **Approximate Price:** [Per night]
- **Recommended Places:** [3-4 accommodation options with highlights, prices, and booking links]
- **Tips:** [Accommodation booking advice]

## 🍽️ Food & Dining
- **Local Cuisine to Try:** [5-7 local dishes with descriptions]
- **Recommended Restaurants:** [Restaurant names with signature dishes, prices, and locations]
- **Food Costs:** [Estimated cost per meal]
- **Tips:** [Local dining advice]

## 🎯 Attractions & Activities
- **Day 1:** [Detailed activities and places with timing and costs]
- **Day 2:** [Detailed activities and places with timing and costs]
- **Day 3:** [Detailed activities and places with timing and costs]
- **Additional Activities:** [Other interesting activities like spa, massage, yoga, etc.]

## 💰 Detailed Budget Breakdown
- **Accommodation:** [Estimate]
- **Food:** [Estimate]
- **Transportation:** [Estimate]
- **Attractions:** [Estimate]
- **Other Expenses:** [Estimate]
- **Total:** [Total estimate]
- **Money-Saving Tips:** [Ways to save money]

## ⚠️ Important Information & Tips
- **Best Time to Visit:** [Optimal seasons/months]
- **What to Pack:** [Clothing/equipment/documents needed]
- **Safety Considerations:** [Safety/health/local customs]
- **Photography Tips:** [Best photo spots]

## 🎁 Souvenirs & Shopping
- **Popular Souvenirs:** [5-7 souvenir items with prices]
- **Recommended Shops:** [Best shopping areas]
- **Tips:** [How to choose souvenirs]

## 📱 Recommended Apps
- **Maps:** [Google Maps, local apps]
- **Booking:** [Booking.com, Airbnb, local platforms]
- **Food:** [Local food delivery apps]
- **Other:** [Essential apps for the destination]

## 🌟 Trip Highlights
- **Unique Features:** [What makes this trip special]
- **Must-Do Experiences:** [Activities not to miss]
- **Local Perspective:** [Insider tips from locals]

## 🛡️ Travel Essentials
- **Visa Requirements:** [Visa information if applicable]
- **Currency:** [Local currency and exchange rates]
- **Language:** [Local language and useful phrases]
- **Emergency Contacts:** [Important phone numbers]

Please respond in clear, friendly English that's easy to understand. Use engaging language and provide practical advice. Focus on safety and creating a great travel experience. Use emojis to make it easy to read and engaging.`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: enhancedPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 3072,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from Google API:', errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const itinerary = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ 
      itinerary,
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate itinerary. Please try again.',
      success: false
    }, { status: 500 });
  }
}
