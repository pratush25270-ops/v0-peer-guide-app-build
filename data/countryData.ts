export interface CountryData {
  name: string
  states: StateData[]
}

export interface StateData {
  name: string
  cities: string[]
}

export const COUNTRIES: CountryData[] = [
  {
    name: 'India',
    states: [
      {
        name: 'Maharashtra',
        cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad']
      },
      {
        name: 'Delhi',
        cities: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi']
      },
      {
        name: 'Karnataka',
        cities: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum']
      },
      {
        name: 'Tamil Nadu',
        cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem']
      },
      {
        name: 'Telangana',
        cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam']
      },
      {
        name: 'West Bengal',
        cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri']
      },
      {
        name: 'Uttar Pradesh',
        cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad', 'Noida']
      },
      {
        name: 'Gujarat',
        cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar']
      },
      {
        name: 'Rajasthan',
        cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Pilani']
      },
      {
        name: 'Punjab',
        cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala']
      },
      {
        name: 'Kerala',
        cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam']
      },
      {
        name: 'Andhra Pradesh',
        cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore']
      }
    ]
  },
  {
    name: 'United States',
    states: [
      {
        name: 'California',
        cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Stanford', 'Berkeley', 'Palo Alto']
      },
      {
        name: 'New York',
        cities: ['New York', 'Buffalo', 'Rochester', 'Albany', 'Syracuse', 'Ithaca']
      },
      {
        name: 'Massachusetts',
        cities: ['Boston', 'Cambridge', 'Worcester', 'Springfield', 'Lowell']
      },
      {
        name: 'Texas',
        cities: ['Houston', 'Austin', 'Dallas', 'San Antonio', 'Fort Worth']
      },
      {
        name: 'Illinois',
        cities: ['Chicago', 'Aurora', 'Naperville', 'Evanston', 'Urbana-Champaign']
      },
      {
        name: 'Pennsylvania',
        cities: ['Philadelphia', 'Pittsburgh', 'State College', 'Harrisburg']
      },
      {
        name: 'Georgia',
        cities: ['Atlanta', 'Augusta', 'Savannah', 'Athens', 'Columbus']
      },
      {
        name: 'Michigan',
        cities: ['Detroit', 'Ann Arbor', 'Grand Rapids', 'Lansing', 'Flint']
      },
      {
        name: 'North Carolina',
        cities: ['Charlotte', 'Raleigh', 'Durham', 'Greensboro', 'Chapel Hill']
      },
      {
        name: 'New Jersey',
        cities: ['Newark', 'Jersey City', 'Princeton', 'Trenton', 'Edison']
      }
    ]
  },
  {
    name: 'United Kingdom',
    states: [
      {
        name: 'England',
        cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Bristol', 'Oxford', 'Cambridge', 'Southampton', 'Sheffield']
      },
      {
        name: 'Scotland',
        cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'St Andrews']
      },
      {
        name: 'Wales',
        cities: ['Cardiff', 'Swansea', 'Newport', 'Bangor']
      },
      {
        name: 'Northern Ireland',
        cities: ['Belfast', 'Londonderry', 'Lisburn', 'Newry']
      }
    ]
  },
  {
    name: 'Canada',
    states: [
      {
        name: 'Ontario',
        cities: ['Toronto', 'Ottawa', 'Waterloo', 'Hamilton', 'London', 'Kingston']
      },
      {
        name: 'Quebec',
        cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Sherbrooke']
      },
      {
        name: 'British Columbia',
        cities: ['Vancouver', 'Victoria', 'Burnaby', 'Surrey', 'Richmond']
      },
      {
        name: 'Alberta',
        cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge']
      }
    ]
  },
  {
    name: 'Australia',
    states: [
      {
        name: 'New South Wales',
        cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast']
      },
      {
        name: 'Victoria',
        cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo']
      },
      {
        name: 'Queensland',
        cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns']
      },
      {
        name: 'Australian Capital Territory',
        cities: ['Canberra']
      },
      {
        name: 'Western Australia',
        cities: ['Perth', 'Fremantle', 'Mandurah']
      }
    ]
  },
  {
    name: 'Germany',
    states: [
      {
        name: 'Bavaria',
        cities: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg']
      },
      {
        name: 'Baden-Württemberg',
        cities: ['Stuttgart', 'Karlsruhe', 'Mannheim', 'Heidelberg', 'Freiburg']
      },
      {
        name: 'Berlin',
        cities: ['Berlin']
      },
      {
        name: 'North Rhine-Westphalia',
        cities: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Bonn', 'Aachen']
      },
      {
        name: 'Hesse',
        cities: ['Frankfurt', 'Wiesbaden', 'Darmstadt', 'Kassel']
      }
    ]
  },
  {
    name: 'Singapore',
    states: [
      {
        name: 'Singapore',
        cities: ['Singapore']
      }
    ]
  },
  {
    name: 'Switzerland',
    states: [
      {
        name: 'Zurich',
        cities: ['Zurich', 'Winterthur']
      },
      {
        name: 'Geneva',
        cities: ['Geneva']
      },
      {
        name: 'Vaud',
        cities: ['Lausanne', 'Montreux']
      },
      {
        name: 'Basel',
        cities: ['Basel']
      }
    ]
  },
  {
    name: 'Japan',
    states: [
      {
        name: 'Tokyo',
        cities: ['Tokyo', 'Shibuya', 'Shinjuku']
      },
      {
        name: 'Osaka',
        cities: ['Osaka', 'Sakai']
      },
      {
        name: 'Kyoto',
        cities: ['Kyoto']
      },
      {
        name: 'Kanagawa',
        cities: ['Yokohama', 'Kawasaki']
      }
    ]
  },
  {
    name: 'China',
    states: [
      {
        name: 'Beijing',
        cities: ['Beijing']
      },
      {
        name: 'Shanghai',
        cities: ['Shanghai']
      },
      {
        name: 'Guangdong',
        cities: ['Guangzhou', 'Shenzhen', 'Dongguan']
      },
      {
        name: 'Jiangsu',
        cities: ['Nanjing', 'Suzhou', 'Wuxi']
      },
      {
        name: 'Zhejiang',
        cities: ['Hangzhou', 'Ningbo', 'Wenzhou']
      }
    ]
  }
]

export function getCountries(): string[] {
  return COUNTRIES.map(c => c.name)
}

export function getStates(country: string): string[] {
  const countryData = COUNTRIES.find(c => c.name === country)
  return countryData ? countryData.states.map(s => s.name) : []
}

export function getCities(country: string, state: string): string[] {
  const countryData = COUNTRIES.find(c => c.name === country)
  if (!countryData) return []
  const stateData = countryData.states.find(s => s.name === state)
  return stateData ? stateData.cities : []
}
