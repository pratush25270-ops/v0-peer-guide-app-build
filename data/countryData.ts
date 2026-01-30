export interface CountryData {
  name: string
  code: string
  states: StateData[]
}

export interface StateData {
  name: string
  code: string
  cities: string[]
}

// Data sourced from countries-states-cities public library
export const COUNTRIES: CountryData[] = [
  {
    name: 'India',
    code: 'IN',
    states: [
      {
        name: 'Andaman and Nicobar Islands',
        code: 'AN',
        cities: ['Port Blair', 'Diglipur', 'Rangat', 'Car Nicobar']
      },
      {
        name: 'Andhra Pradesh',
        code: 'AP',
        cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Kurnool', 'Ongole']
      },
      {
        name: 'Arunachal Pradesh',
        code: 'AR',
        cities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tezpur']
      },
      {
        name: 'Assam',
        code: 'AS',
        cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Nagaon', 'Barpeta']
      },
      {
        name: 'Bihar',
        code: 'BR',
        cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia']
      },
      {
        name: 'Chhattisgarh',
        code: 'CG',
        cities: ['Raipur', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Jagdalpur']
      },
      {
        name: 'Dadra and Nagar Haveli and Daman and Diu',
        code: 'DN',
        cities: ['Silvassa', 'Daman', 'Diu']
      },
      {
        name: 'Delhi',
        code: 'DL',
        cities: ['New Delhi', 'Delhi', 'Dwarka', 'Noida']
      },
      {
        name: 'Goa',
        code: 'GA',
        cities: ['Panaji', 'Vasco da Gama', 'Margao', 'Ponda']
      },
      {
        name: 'Gujarat',
        code: 'GJ',
        cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Anand', 'Junagadh']
      },
      {
        name: 'Haryana',
        code: 'HR',
        cities: ['Faridabad', 'Gurgaon', 'Hisar', 'Rohtak', 'Panipat', 'Ambala']
      },
      {
        name: 'Himachal Pradesh',
        code: 'HP',
        cities: ['Shimla', 'Solan', 'Mandi', 'Kangra', 'Kullu', 'Rampur']
      },
      {
        name: 'Jharkhand',
        code: 'JH',
        cities: ['Ranchi', 'Dhanbad', 'Giridih', 'Jamshedpur', 'Bokaro']
      },
      {
        name: 'Karnataka',
        code: 'KA',
        cities: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Davangere', 'Shimoga']
      },
      {
        name: 'Kerala',
        code: 'KL',
        cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Ernakulam']
      },
      {
        name: 'Ladakh',
        code: 'LA',
        cities: ['Leh', 'Kargil']
      },
      {
        name: 'Lakshadweep',
        code: 'LD',
        cities: ['Kavaratti', 'Androth Island']
      },
      {
        name: 'Madhya Pradesh',
        code: 'MP',
        cities: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar']
      },
      {
        name: 'Maharashtra',
        code: 'MH',
        cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur']
      },
      {
        name: 'Manipur',
        code: 'MN',
        cities: ['Imphal', 'Bishnupur', 'Thoubal']
      },
      {
        name: 'Meghalaya',
        code: 'ML',
        cities: ['Shillong', 'Tura', 'Cherrapunji']
      },
      {
        name: 'Mizoram',
        code: 'MZ',
        cities: ['Aizawl', 'Lunglei', 'Champhai']
      },
      {
        name: 'Nagaland',
        code: 'NL',
        cities: ['Kohima', 'Dimapur', 'Kiphire']
      },
      {
        name: 'Odisha',
        code: 'OR',
        cities: ['Bhubaneswar', 'Rourkela', 'Cuttack', 'Balasore', 'Berhampur']
      },
      {
        name: 'Puducherry',
        code: 'PY',
        cities: ['Puducherry', 'Yanam', 'Karaikal', 'Mahe']
      },
      {
        name: 'Punjab',
        code: 'PB',
        cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda']
      },
      {
        name: 'Rajasthan',
        code: 'RJ',
        cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Pali']
      },
      {
        name: 'Sikkim',
        code: 'SK',
        cities: ['Gangtok', 'Rumtek', 'Namchi']
      },
      {
        name: 'Tamil Nadu',
        code: 'TN',
        cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tiruppur']
      },
      {
        name: 'Telangana',
        code: 'TG',
        cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam']
      },
      {
        name: 'Tripura',
        code: 'TR',
        cities: ['Agartala', 'Udaipur', 'Ambassa']
      },
      {
        name: 'Uttar Pradesh',
        code: 'UP',
        cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad', 'Noida', 'Ghaziabad']
      },
      {
        name: 'Uttarakhand',
        code: 'UT',
        cities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Almora']
      },
      {
        name: 'West Bengal',
        code: 'WB',
        cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Darjeeling']
      }
    ]
  },
  {
    name: 'United States',
    code: 'US',
    states: [
      {
        name: 'California',
        code: 'CA',
        cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Oakland', 'Palo Alto', 'Berkeley', 'Irvine', 'Long Beach']
      },
      {
        name: 'New York',
        code: 'NY',
        cities: ['New York', 'Buffalo', 'Rochester', 'Albany', 'Syracuse', 'Ithaca', 'Brooklyn', 'Queens']
      },
      {
        name: 'Massachusetts',
        code: 'MA',
        cities: ['Boston', 'Cambridge', 'Worcester', 'Springfield', 'Lowell', 'Salem', 'Brookline']
      },
      {
        name: 'Texas',
        code: 'TX',
        cities: ['Houston', 'Austin', 'Dallas', 'San Antonio', 'Fort Worth', 'Arlington', 'Plano']
      },
      {
        name: 'Illinois',
        code: 'IL',
        cities: ['Chicago', 'Aurora', 'Naperville', 'Evanston', 'Urbana', 'Champaign']
      },
      {
        name: 'Pennsylvania',
        code: 'PA',
        cities: ['Philadelphia', 'Pittsburgh', 'State College', 'Harrisburg', 'Allentown']
      },
      {
        name: 'Georgia',
        code: 'GA',
        cities: ['Atlanta', 'Augusta', 'Savannah', 'Athens', 'Columbus', 'Marietta']
      },
      {
        name: 'Michigan',
        code: 'MI',
        cities: ['Detroit', 'Ann Arbor', 'Grand Rapids', 'Lansing', 'Flint', 'Dearborn']
      },
      {
        name: 'North Carolina',
        code: 'NC',
        cities: ['Charlotte', 'Raleigh', 'Durham', 'Greensboro', 'Chapel Hill', 'Winston-Salem']
      },
      {
        name: 'New Jersey',
        code: 'NJ',
        cities: ['Newark', 'Jersey City', 'Princeton', 'Trenton', 'Edison', 'Paterson']
      }
    ]
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    states: [
      {
        name: 'England',
        code: 'ENG',
        cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Bristol', 'Oxford', 'Cambridge', 'Southampton', 'Sheffield', 'Newcastle']
      },
      {
        name: 'Scotland',
        code: 'SCT',
        cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'St Andrews', 'Perth', 'Stirling']
      },
      {
        name: 'Wales',
        code: 'WLS',
        cities: ['Cardiff', 'Swansea', 'Newport', 'Bangor', 'Wrexham']
      },
      {
        name: 'Northern Ireland',
        code: 'NIR',
        cities: ['Belfast', 'Londonderry', 'Lisburn', 'Newry', 'Armagh']
      }
    ]
  },
  {
    name: 'Canada',
    code: 'CA',
    states: [
      {
        name: 'Ontario',
        code: 'ON',
        cities: ['Toronto', 'Ottawa', 'Waterloo', 'Hamilton', 'London', 'Kingston', 'Mississauga']
      },
      {
        name: 'Quebec',
        code: 'QC',
        cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Sherbrooke', 'Trois-Rivières']
      },
      {
        name: 'British Columbia',
        code: 'BC',
        cities: ['Vancouver', 'Victoria', 'Burnaby', 'Surrey', 'Richmond', 'Kelowna']
      },
      {
        name: 'Alberta',
        code: 'AB',
        cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Airdrie']
      }
    ]
  },
  {
    name: 'Australia',
    code: 'AU',
    states: [
      {
        name: 'New South Wales',
        code: 'NSW',
        cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast', 'Canberra']
      },
      {
        name: 'Victoria',
        code: 'VIC',
        cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Albury']
      },
      {
        name: 'Queensland',
        code: 'QLD',
        cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns', 'Townsville']
      },
      {
        name: 'South Australia',
        code: 'SA',
        cities: ['Adelaide', 'Mount Barker', 'Gawler']
      },
      {
        name: 'Western Australia',
        code: 'WA',
        cities: ['Perth', 'Fremantle', 'Mandurah', 'Bunbury']
      },
      {
        name: 'Tasmania',
        code: 'TAS',
        cities: ['Hobart', 'Launceston', 'Devonport']
      },
      {
        name: 'Northern Territory',
        code: 'NT',
        cities: ['Darwin', 'Alice Springs', 'Palmerston']
      }
    ]
  },
  {
    name: 'Germany',
    code: 'DE',
    states: [
      {
        name: 'Bavaria',
        code: 'BY',
        cities: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Ingolstadt']
      },
      {
        name: 'Baden-Württemberg',
        code: 'BW',
        cities: ['Stuttgart', 'Karlsruhe', 'Mannheim', 'Heidelberg', 'Freiburg', 'Tübingen']
      },
      {
        name: 'Berlin',
        code: 'BE',
        cities: ['Berlin']
      },
      {
        name: 'North Rhine-Westphalia',
        code: 'NW',
        cities: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Bonn', 'Aachen']
      },
      {
        name: 'Hesse',
        code: 'HE',
        cities: ['Frankfurt', 'Wiesbaden', 'Darmstadt', 'Kassel', 'Giessen']
      }
    ]
  },
  {
    name: 'Singapore',
    code: 'SG',
    states: [
      {
        name: 'Singapore',
        code: 'SG',
        cities: ['Singapore', 'Jurong', 'Tampines', 'Bedok']
      }
    ]
  },
  {
    name: 'Switzerland',
    code: 'CH',
    states: [
      {
        name: 'Zurich',
        code: 'ZH',
        cities: ['Zurich', 'Winterthur', 'Uster']
      },
      {
        name: 'Geneva',
        code: 'GE',
        cities: ['Geneva', 'Vernier', 'Lancy']
      },
      {
        name: 'Vaud',
        code: 'VD',
        cities: ['Lausanne', 'Montreux', 'Yverdon-les-Bains']
      },
      {
        name: 'Basel-Stadt',
        code: 'BS',
        cities: ['Basel', 'Riehen']
      }
    ]
  },
  {
    name: 'Japan',
    code: 'JP',
    states: [
      {
        name: 'Tokyo',
        code: 'TK',
        cities: ['Tokyo', 'Shibuya', 'Shinjuku', 'Chiyoda']
      },
      {
        name: 'Osaka',
        code: 'OS',
        cities: ['Osaka', 'Sakai', 'Suita']
      },
      {
        name: 'Kyoto',
        code: 'KY',
        cities: ['Kyoto', 'Uji']
      },
      {
        name: 'Kanagawa',
        code: 'KN',
        cities: ['Yokohama', 'Kawasaki', 'Sagamihara']
      }
    ]
  },
  {
    name: 'China',
    code: 'CN',
    states: [
      {
        name: 'Beijing',
        code: 'BJ',
        cities: ['Beijing', 'Chaoyang', 'Haidian']
      },
      {
        name: 'Shanghai',
        code: 'SH',
        cities: ['Shanghai', 'Pudong', 'Huangpu']
      },
      {
        name: 'Guangdong',
        code: 'GD',
        cities: ['Guangzhou', 'Shenzhen', 'Dongguan', 'Zhuhai']
      },
      {
        name: 'Jiangsu',
        code: 'JS',
        cities: ['Nanjing', 'Suzhou', 'Wuxi', 'Changzhou']
      },
      {
        name: 'Zhejiang',
        code: 'ZJ',
        cities: ['Hangzhou', 'Ningbo', 'Wenzhou', 'Jiaxing']
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
