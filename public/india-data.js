const locations = {
    "Andhra Pradesh": {
        "Visakhapatnam": ["530001", "530002", "530003"],
        "Vijayawada": ["520001", "520002", "520003"],
        "Guntur": ["522001", "522002"]
    },
    "Arunachal Pradesh": {
        "Itanagar": ["791111"],
        "Tawang": ["790104"]
    },
    "Assam": {
        "Guwahati": ["781001", "781005"],
        "Dibrugarh": ["786001"]
    },
    "Bihar": {
        "Patna": ["800001", "800020"],
        "Gaya": ["823001"]
    },
    "Chhattisgarh": {
        "Raipur": ["492001"],
        "Bhilai": ["490001"]
    },
    "Goa": {
        "Panaji": ["403001"],
        "Margao": ["403601"]
    },
    "Gujarat": {
        "Ahmedabad": ["380001", "380015"],
        "Surat": ["395001"],
        "Vadodara": ["390001"]
    },
    "Haryana": {
        "Gurugram": ["122001", "122018"],
        "Faridabad": ["121001"]
    },
    "Himachal Pradesh": {
        "Shimla": ["171001"],
        "Manali": ["175131"]
    },
    "Jharkhand": {
        "Ranchi": ["834001"],
        "Jamshedpur": ["831001"]
    },
    "Karnataka": {
        "Bangalore": ["560001", "560064", "560037"],
        "Mysore": ["570001"],
        "Hubli": ["580020"]
    },
    "Kerala": {
        "Thiruvananthapuram": ["695001"],
        "Kochi": ["682001"]
    },
    "Madhya Pradesh": {
        "Indore": ["452001"],
        "Bhopal": ["462001"]
    },
    "Maharashtra": {
        "Mumbai": ["400001", "400050", "400092"],
        "Pune": ["411001", "411045"],
        "Nagpur": ["440001"]
    },
    "Manipur": { "Imphal": ["795001"] },
    "Meghalaya": { "Shillong": ["793001"] },
    "Mizoram": { "Aizawl": ["796001"] },
    "Nagaland": { "Kohima": ["797001"] },
    "Odisha": {
        "Bhubaneswar": ["751001"],
        "Cuttack": ["753001"]
    },
    "Punjab": {
        "Ludhiana": ["141001"],
        "Amritsar": ["143001"]
    },
    "Rajasthan": {
        "Jaipur": ["302001"],
        "Jodhpur": ["342001"],
        "Udaipur": ["313001"]
    },
    "Sikkim": { "Gangtok": ["737101"] },
    "Tamil Nadu": {
        "Chennai": ["600001", "600028"],
        "Coimbatore": ["641001"],
        "Madurai": ["625001"]
    },
    "Telangana": {
        "Hyderabad": ["500001", "500032"],
        "Warangal": ["506001"]
    },
    "Tripura": { "Agartala": ["799001"] },
    "Uttar Pradesh": {
        "Lucknow": ["226001"],
        "Kanpur": ["208001"],
        "Varanasi": ["221001"],
        "Noida": ["201301"]
    },
    "Uttarakhand": { "Dehradun": ["248001"], "Nainital": ["263001"] },
    "West Bengal": {
        "Kolkata": ["700001", "700091"],
        "Howrah": ["711101"]
    },
    "Delhi": { "New Delhi": ["110001", "110011", "110045"] },
    "Jammu & Kashmir": { "Srinagar": ["190001"], "Jammu": ["180001"] },
    "Ladakh": { "Leh": ["194101"] },
    "Puducherry": { "Puducherry": ["605001"] }
};

if (typeof module !== 'undefined') module.exports = locations;
