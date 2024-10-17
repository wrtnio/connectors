import { ISimilarweb } from "@wrtn/connector-api/lib/structures/connector/similarweb/ISimilarweb";

// Type Check
const google: ISimilarweb.IGetDomainInfoOutput = {
  description: "OK",
  status: 200,
  data: {
    Version: 1,
    SiteName: "google.com",
    Description: "",
    TopCountryShares: [
      {
        Country: 840,
        CountryCode: "US",
        Value: 0.24833007332424903,
      },
      {
        Country: 356,
        CountryCode: "IN",
        Value: 0.05524516448420652,
      },
      {
        Country: 392,
        CountryCode: "JP",
        Value: 0.05252948854269611,
      },
      {
        Country: 76,
        CountryCode: "BR",
        Value: 0.047973601084387876,
      },
      {
        Country: 826,
        CountryCode: "GB",
        Value: 0.037273915947943416,
      },
    ],
    Title: "google",
    Engagments: {
      BounceRate: "0.28308507182686815",
      Month: "9",
      Year: "2024",
      PagePerVisit: "8.207327756029974",
      Visits: "81953796787",
      TimeOnSite: "653.6227479279224",
    },
    EstimatedMonthlyVisits: {
      "2024-07-01": 84318641141,
      "2024-08-01": 83516004062,
      "2024-09-01": 81953796787,
    },
    GlobalRank: {
      Rank: 1,
    },
    CountryRank: {
      Country: 840,
      CountryCode: "US",
      Rank: 1,
    },
    CategoryRank: {
      Rank: "1",
      Category: "Computers_Electronics_and_Technology/Search_Engines",
    },
    GlobalCategoryRank: null,
    IsSmall: false,
    Policy: 0,
    TrafficSources: {
      Social: 0.010297137071998762,
      "Paid Referrals": 0.002866805356479344,
      Mail: 0.0006654744731606687,
      Referrals: 0.050105585314323235,
      Search: 0.057417288054704786,
      Direct: 0.8786477097293331,
    },
    Category: "computers_electronics_and_technology/search_engines",
    LargeScreenshot:
      "https://site-images.similarcdn.com/image?url=google.com&t=1&s=1&h=eb35e0fbafa3eb290132ffdfe47187d950d68daaa659ec1bd4b4e834b8f16461",
    IsDataFromGa: false,
    Countries: [
      {
        Code: "AF",
        UrlCode: "afghanistan",
        Name: "Afghanistan",
      },
      {
        Code: "AX",
        UrlCode: "land-islands",
        Name: "Åland Islands",
      },
      {
        Code: "AL",
        UrlCode: "albania",
        Name: "Albania",
      },
      {
        Code: "DZ",
        UrlCode: "algeria",
        Name: "Algeria",
      },
      {
        Code: "AS",
        UrlCode: "american-samoa",
        Name: "American Samoa",
      },
      {
        Code: "AD",
        UrlCode: "andorra",
        Name: "Andorra",
      },
      {
        Code: "AO",
        UrlCode: "angola",
        Name: "Angola",
      },
      {
        Code: "AI",
        UrlCode: "anguilla",
        Name: "Anguilla",
      },
      {
        Code: "AQ",
        UrlCode: "antarctica",
        Name: "Antarctica",
      },
      {
        Code: "AG",
        UrlCode: "antigua-and-barbuda",
        Name: "Antigua and Barbuda",
      },
      {
        Code: "AR",
        UrlCode: "argentina",
        Name: "Argentina",
      },
      {
        Code: "AM",
        UrlCode: "armenia",
        Name: "Armenia",
      },
      {
        Code: "AW",
        UrlCode: "aruba",
        Name: "Aruba",
      },
      {
        Code: "AU",
        UrlCode: "australia",
        Name: "Australia",
      },
      {
        Code: "AT",
        UrlCode: "austria",
        Name: "Austria",
      },
      {
        Code: "AZ",
        UrlCode: "azerbaijan",
        Name: "Azerbaijan",
      },
      {
        Code: "BS",
        UrlCode: "bahamas",
        Name: "Bahamas",
      },
      {
        Code: "BH",
        UrlCode: "bahrain",
        Name: "Bahrain",
      },
      {
        Code: "BD",
        UrlCode: "bangladesh",
        Name: "Bangladesh",
      },
      {
        Code: "BB",
        UrlCode: "barbados",
        Name: "Barbados",
      },
      {
        Code: "BY",
        UrlCode: "belarus",
        Name: "Belarus",
      },
      {
        Code: "BE",
        UrlCode: "belgium",
        Name: "Belgium",
      },
      {
        Code: "BZ",
        UrlCode: "belize",
        Name: "Belize",
      },
      {
        Code: "BJ",
        UrlCode: "benin",
        Name: "Benin",
      },
      {
        Code: "BM",
        UrlCode: "bermuda",
        Name: "Bermuda",
      },
      {
        Code: "BT",
        UrlCode: "bhutan",
        Name: "Bhutan",
      },
      {
        Code: "BO",
        UrlCode: "bolivia-plurinational-state-of",
        Name: "Bolivia",
      },
      {
        Code: "BQ",
        UrlCode: "bonaire-sint-eustatius-and-saba",
        Name: "Bonaire, Sint Eustatius and Saba",
      },
      {
        Code: "BA",
        UrlCode: "bosnia-and-herzegovina",
        Name: "Bosnia and Herzegovina",
      },
      {
        Code: "BW",
        UrlCode: "botswana",
        Name: "Botswana",
      },
      {
        Code: "BV",
        UrlCode: "bouvet-island",
        Name: "Bouvet Island",
      },
      {
        Code: "BR",
        UrlCode: "brazil",
        Name: "Brazil",
      },
      {
        Code: "IO",
        UrlCode: "british-indian-ocean-territory",
        Name: "British Indian Ocean Territory",
      },
      {
        Code: "BN",
        UrlCode: "brunei-darussalam",
        Name: "Brunei Darussalam",
      },
      {
        Code: "BG",
        UrlCode: "bulgaria",
        Name: "Bulgaria",
      },
      {
        Code: "BF",
        UrlCode: "burkina-faso",
        Name: "Burkina Faso",
      },
      {
        Code: "BI",
        UrlCode: "burundi",
        Name: "Burundi",
      },
      {
        Code: "CV",
        UrlCode: "cabo-verde",
        Name: "Cabo Verde",
      },
      {
        Code: "KH",
        UrlCode: "cambodia",
        Name: "Cambodia",
      },
      {
        Code: "CM",
        UrlCode: "cameroon",
        Name: "Cameroon",
      },
      {
        Code: "CA",
        UrlCode: "canada",
        Name: "Canada",
      },
      {
        Code: "KY",
        UrlCode: "cayman-islands",
        Name: "Cayman Islands",
      },
      {
        Code: "CF",
        UrlCode: "central-african-republic",
        Name: "Central African Republic",
      },
      {
        Code: "TD",
        UrlCode: "chad",
        Name: "Chad",
      },
      {
        Code: "CL",
        UrlCode: "chile",
        Name: "Chile",
      },
      {
        Code: "CN",
        UrlCode: "china",
        Name: "China",
      },
      {
        Code: "CX",
        UrlCode: "christmas-island",
        Name: "Christmas Island",
      },
      {
        Code: "CC",
        UrlCode: "cocos-keeling-islands",
        Name: "Cocos (Keeling) Islands",
      },
      {
        Code: "CO",
        UrlCode: "colombia",
        Name: "Colombia",
      },
      {
        Code: "KM",
        UrlCode: "comoros",
        Name: "Comoros",
      },
      {
        Code: "CG",
        UrlCode: "congo",
        Name: "Congo",
      },
      {
        Code: "CD",
        UrlCode: "congo-the-democratic-republic-of-the",
        Name: "Congo, the Democratic Republic of the",
      },
      {
        Code: "CK",
        UrlCode: "cook-islands",
        Name: "Cook Islands",
      },
      {
        Code: "CR",
        UrlCode: "costa-rica",
        Name: "Costa Rica",
      },
      {
        Code: "CI",
        UrlCode: "cte-divoire",
        Name: "Côte d'Ivoire",
      },
      {
        Code: "HR",
        UrlCode: "croatia",
        Name: "Croatia",
      },
      {
        Code: "CU",
        UrlCode: "cuba",
        Name: "Cuba",
      },
      {
        Code: "CW",
        UrlCode: "curaao",
        Name: "Curaçao",
      },
      {
        Code: "CY",
        UrlCode: "cyprus",
        Name: "Cyprus",
      },
      {
        Code: "CZ",
        UrlCode: "czech-republic",
        Name: "Czech Republic",
      },
      {
        Code: "DK",
        UrlCode: "denmark",
        Name: "Denmark",
      },
      {
        Code: "DJ",
        UrlCode: "djibouti",
        Name: "Djibouti",
      },
      {
        Code: "DM",
        UrlCode: "dominica",
        Name: "Dominica",
      },
      {
        Code: "DO",
        UrlCode: "dominican-republic",
        Name: "Dominican Republic",
      },
      {
        Code: "EC",
        UrlCode: "ecuador",
        Name: "Ecuador",
      },
      {
        Code: "EG",
        UrlCode: "egypt",
        Name: "Egypt",
      },
      {
        Code: "SV",
        UrlCode: "el-salvador",
        Name: "El Salvador",
      },
      {
        Code: "GQ",
        UrlCode: "equatorial-guinea",
        Name: "Equatorial Guinea",
      },
      {
        Code: "ER",
        UrlCode: "eritrea",
        Name: "Eritrea",
      },
      {
        Code: "EE",
        UrlCode: "estonia",
        Name: "Estonia",
      },
      {
        Code: "ET",
        UrlCode: "ethiopia",
        Name: "Ethiopia",
      },
      {
        Code: "FK",
        UrlCode: "falkland-islands-malvinas",
        Name: "Falkland Islands (Malvinas)",
      },
      {
        Code: "FO",
        UrlCode: "faroe-islands",
        Name: "Faroe Islands",
      },
      {
        Code: "FJ",
        UrlCode: "fiji",
        Name: "Fiji",
      },
      {
        Code: "FI",
        UrlCode: "finland",
        Name: "Finland",
      },
      {
        Code: "FR",
        UrlCode: "france",
        Name: "France",
      },
      {
        Code: "GF",
        UrlCode: "french-guiana",
        Name: "French Guiana",
      },
      {
        Code: "PF",
        UrlCode: "french-polynesia",
        Name: "French Polynesia",
      },
      {
        Code: "TF",
        UrlCode: "french-southern-territories",
        Name: "French Southern Territories",
      },
      {
        Code: "GA",
        UrlCode: "gabon",
        Name: "Gabon",
      },
      {
        Code: "GM",
        UrlCode: "gambia",
        Name: "Gambia",
      },
      {
        Code: "GE",
        UrlCode: "georgia",
        Name: "Georgia",
      },
      {
        Code: "DE",
        UrlCode: "germany",
        Name: "Germany",
      },
      {
        Code: "GH",
        UrlCode: "ghana",
        Name: "Ghana",
      },
      {
        Code: "GI",
        UrlCode: "gibraltar",
        Name: "Gibraltar",
      },
      {
        Code: "GR",
        UrlCode: "greece",
        Name: "Greece",
      },
      {
        Code: "GL",
        UrlCode: "greenland",
        Name: "Greenland",
      },
      {
        Code: "GD",
        UrlCode: "grenada",
        Name: "Grenada",
      },
      {
        Code: "GP",
        UrlCode: "guadeloupe",
        Name: "Guadeloupe",
      },
      {
        Code: "GU",
        UrlCode: "guam",
        Name: "Guam",
      },
      {
        Code: "GT",
        UrlCode: "guatemala",
        Name: "Guatemala",
      },
      {
        Code: "GG",
        UrlCode: "guernsey",
        Name: "Guernsey",
      },
      {
        Code: "GN",
        UrlCode: "guinea",
        Name: "Guinea",
      },
      {
        Code: "GW",
        UrlCode: "guinea-bissau",
        Name: "Guinea-Bissau",
      },
      {
        Code: "GY",
        UrlCode: "guyana",
        Name: "Guyana",
      },
      {
        Code: "HT",
        UrlCode: "haiti",
        Name: "Haiti",
      },
      {
        Code: "HM",
        UrlCode: "heard-island-and-mcdonald-islands",
        Name: "Heard Island and McDonald Islands",
      },
      {
        Code: "VA",
        UrlCode: "holy-see-vatican-city-state",
        Name: "Holy See (Vatican City State)",
      },
      {
        Code: "HN",
        UrlCode: "honduras",
        Name: "Honduras",
      },
      {
        Code: "HK",
        UrlCode: "hong-kong",
        Name: "Hong Kong",
      },
      {
        Code: "HU",
        UrlCode: "hungary",
        Name: "Hungary",
      },
      {
        Code: "IS",
        UrlCode: "iceland",
        Name: "Iceland",
      },
      {
        Code: "IN",
        UrlCode: "india",
        Name: "India",
      },
      {
        Code: "ID",
        UrlCode: "indonesia",
        Name: "Indonesia",
      },
      {
        Code: "IR",
        UrlCode: "iran-islamic-republic-of",
        Name: "Iran",
      },
      {
        Code: "IQ",
        UrlCode: "iraq",
        Name: "Iraq",
      },
      {
        Code: "IE",
        UrlCode: "ireland",
        Name: "Ireland",
      },
      {
        Code: "IM",
        UrlCode: "isle-of-man",
        Name: "Isle of Man",
      },
      {
        Code: "IL",
        UrlCode: "israel",
        Name: "Israel",
      },
      {
        Code: "IT",
        UrlCode: "italy",
        Name: "Italy",
      },
      {
        Code: "JM",
        UrlCode: "jamaica",
        Name: "Jamaica",
      },
      {
        Code: "JP",
        UrlCode: "japan",
        Name: "Japan",
      },
      {
        Code: "JE",
        UrlCode: "jersey",
        Name: "Jersey",
      },
      {
        Code: "JO",
        UrlCode: "jordan",
        Name: "Jordan",
      },
      {
        Code: "KZ",
        UrlCode: "kazakhstan",
        Name: "Kazakhstan",
      },
      {
        Code: "KE",
        UrlCode: "kenya",
        Name: "Kenya",
      },
      {
        Code: "KI",
        UrlCode: "kiribati",
        Name: "Kiribati",
      },
      {
        Code: "KP",
        UrlCode: "korea-democratic-peoples-republic-of",
        Name: "Korea, Democratic People's Republic of",
      },
      {
        Code: "KR",
        UrlCode: "korea-republic-of",
        Name: "Korea, Republic of",
      },
      {
        Code: "KW",
        UrlCode: "kuwait",
        Name: "Kuwait",
      },
      {
        Code: "KG",
        UrlCode: "kyrgyzstan",
        Name: "Kyrgyzstan",
      },
      {
        Code: "LA",
        UrlCode: "lao-peoples-democratic-republic",
        Name: "Lao People's Democratic Republic",
      },
      {
        Code: "LV",
        UrlCode: "latvia",
        Name: "Latvia",
      },
      {
        Code: "LB",
        UrlCode: "lebanon",
        Name: "Lebanon",
      },
      {
        Code: "LS",
        UrlCode: "lesotho",
        Name: "Lesotho",
      },
      {
        Code: "LR",
        UrlCode: "liberia",
        Name: "Liberia",
      },
      {
        Code: "LY",
        UrlCode: "libya",
        Name: "Libya",
      },
      {
        Code: "LI",
        UrlCode: "liechtenstein",
        Name: "Liechtenstein",
      },
      {
        Code: "LT",
        UrlCode: "lithuania",
        Name: "Lithuania",
      },
      {
        Code: "LU",
        UrlCode: "luxembourg",
        Name: "Luxembourg",
      },
      {
        Code: "MO",
        UrlCode: "macao",
        Name: "Macao",
      },
      {
        Code: "MK",
        UrlCode: "macedonia-the-former-yugoslav-republic-of",
        Name: "Macedonia (FYROM)",
      },
      {
        Code: "MG",
        UrlCode: "madagascar",
        Name: "Madagascar",
      },
      {
        Code: "MW",
        UrlCode: "malawi",
        Name: "Malawi",
      },
      {
        Code: "MY",
        UrlCode: "malaysia",
        Name: "Malaysia",
      },
      {
        Code: "MV",
        UrlCode: "maldives",
        Name: "Maldives",
      },
      {
        Code: "ML",
        UrlCode: "mali",
        Name: "Mali",
      },
      {
        Code: "MT",
        UrlCode: "malta",
        Name: "Malta",
      },
      {
        Code: "MH",
        UrlCode: "marshall-islands",
        Name: "Marshall Islands",
      },
      {
        Code: "MQ",
        UrlCode: "martinique",
        Name: "Martinique",
      },
      {
        Code: "MR",
        UrlCode: "mauritania",
        Name: "Mauritania",
      },
      {
        Code: "MU",
        UrlCode: "mauritius",
        Name: "Mauritius",
      },
      {
        Code: "YT",
        UrlCode: "mayotte",
        Name: "Mayotte",
      },
      {
        Code: "MX",
        UrlCode: "mexico",
        Name: "Mexico",
      },
      {
        Code: "FM",
        UrlCode: "micronesia-federated-states-of",
        Name: "Micronesia, Federated States of",
      },
      {
        Code: "MD",
        UrlCode: "moldova-republic-of",
        Name: "Moldova",
      },
      {
        Code: "MC",
        UrlCode: "monaco",
        Name: "Monaco",
      },
      {
        Code: "MN",
        UrlCode: "mongolia",
        Name: "Mongolia",
      },
      {
        Code: "ME",
        UrlCode: "montenegro",
        Name: "Montenegro",
      },
      {
        Code: "MS",
        UrlCode: "montserrat",
        Name: "Montserrat",
      },
      {
        Code: "MA",
        UrlCode: "morocco",
        Name: "Morocco",
      },
      {
        Code: "MZ",
        UrlCode: "mozambique",
        Name: "Mozambique",
      },
      {
        Code: "MM",
        UrlCode: "myanmar",
        Name: "Myanmar",
      },
      {
        Code: "NA",
        UrlCode: "namibia",
        Name: "Namibia",
      },
      {
        Code: "NR",
        UrlCode: "nauru",
        Name: "Nauru",
      },
      {
        Code: "NP",
        UrlCode: "nepal",
        Name: "Nepal",
      },
      {
        Code: "NL",
        UrlCode: "netherlands",
        Name: "Netherlands",
      },
      {
        Code: "AN",
        UrlCode: "netherlands-antilles",
        Name: "Netherlands Antilles",
      },
      {
        Code: "NC",
        UrlCode: "new-caledonia",
        Name: "New Caledonia",
      },
      {
        Code: "NZ",
        UrlCode: "new-zealand",
        Name: "New Zealand",
      },
      {
        Code: "NI",
        UrlCode: "nicaragua",
        Name: "Nicaragua",
      },
      {
        Code: "NE",
        UrlCode: "niger",
        Name: "Niger",
      },
      {
        Code: "NG",
        UrlCode: "nigeria",
        Name: "Nigeria",
      },
      {
        Code: "NU",
        UrlCode: "niue",
        Name: "Niue",
      },
      {
        Code: "AP",
        UrlCode: "non-spec-asia-pas-location",
        Name: "Non-spec Asia Pas Location",
      },
      {
        Code: "NF",
        UrlCode: "norfolk-island",
        Name: "Norfolk Island",
      },
      {
        Code: "MP",
        UrlCode: "northern-mariana-islands",
        Name: "Northern Mariana Islands",
      },
      {
        Code: "NO",
        UrlCode: "norway",
        Name: "Norway",
      },
      {
        Code: "OM",
        UrlCode: "oman",
        Name: "Oman",
      },
      {
        Code: "PK",
        UrlCode: "pakistan",
        Name: "Pakistan",
      },
      {
        Code: "PW",
        UrlCode: "palau",
        Name: "Palau",
      },
      {
        Code: "PS",
        UrlCode: "palestine-state-of",
        Name: "Palestine",
      },
      {
        Code: "PA",
        UrlCode: "panama",
        Name: "Panama",
      },
      {
        Code: "PG",
        UrlCode: "papua-new-guinea",
        Name: "Papua New Guinea",
      },
      {
        Code: "PY",
        UrlCode: "paraguay",
        Name: "Paraguay",
      },
      {
        Code: "PE",
        UrlCode: "peru",
        Name: "Peru",
      },
      {
        Code: "PH",
        UrlCode: "philippines",
        Name: "Philippines",
      },
      {
        Code: "PN",
        UrlCode: "pitcairn",
        Name: "Pitcairn",
      },
      {
        Code: "PL",
        UrlCode: "poland",
        Name: "Poland",
      },
      {
        Code: "PT",
        UrlCode: "portugal",
        Name: "Portugal",
      },
      {
        Code: "PR",
        UrlCode: "puerto-rico",
        Name: "Puerto Rico",
      },
      {
        Code: "QA",
        UrlCode: "qatar",
        Name: "Qatar",
      },
      {
        Code: "RE",
        UrlCode: "runion",
        Name: "Réunion",
      },
      {
        Code: "RO",
        UrlCode: "romania",
        Name: "Romania",
      },
      {
        Code: "RU",
        UrlCode: "russian-federation",
        Name: "Russia",
      },
      {
        Code: "RW",
        UrlCode: "rwanda",
        Name: "Rwanda",
      },
      {
        Code: "BL",
        UrlCode: "saint-barthlemy",
        Name: "Saint Barthélemy",
      },
      {
        Code: "SH",
        UrlCode: "saint-helena-ascension-and-tristan-da-cunha",
        Name: "Saint Helena, Ascension and Tristan da Cunha",
      },
      {
        Code: "KN",
        UrlCode: "saint-kitts-and-nevis",
        Name: "Saint Kitts and Nevis",
      },
      {
        Code: "LC",
        UrlCode: "saint-lucia",
        Name: "Saint Lucia",
      },
      {
        Code: "MF",
        UrlCode: "saint-martin-french-part",
        Name: "Saint Martin (French part)",
      },
      {
        Code: "PM",
        UrlCode: "saint-pierre-and-miquelon",
        Name: "Saint Pierre and Miquelon",
      },
      {
        Code: "VC",
        UrlCode: "saint-vincent-and-the-grenadines",
        Name: "Saint Vincent and the Grenadines",
      },
      {
        Code: "WS",
        UrlCode: "samoa",
        Name: "Samoa",
      },
      {
        Code: "SM",
        UrlCode: "san-marino",
        Name: "San Marino",
      },
      {
        Code: "ST",
        UrlCode: "sao-tome-and-principe",
        Name: "Sao Tome and Principe",
      },
      {
        Code: "SA",
        UrlCode: "saudi-arabia",
        Name: "Saudi Arabia",
      },
      {
        Code: "SN",
        UrlCode: "senegal",
        Name: "Senegal",
      },
      {
        Code: "RS",
        UrlCode: "serbia",
        Name: "Serbia",
      },
      {
        Code: "CS",
        UrlCode: "serbia-and-montenegro",
        Name: "SERBIA AND MONTENEGRO",
      },
      {
        Code: "SC",
        UrlCode: "seychelles",
        Name: "Seychelles",
      },
      {
        Code: "SL",
        UrlCode: "sierra-leone",
        Name: "Sierra Leone",
      },
      {
        Code: "SG",
        UrlCode: "singapore",
        Name: "Singapore",
      },
      {
        Code: "SX",
        UrlCode: "sint-maarten-dutch-part",
        Name: "Sint Maarten (Dutch part)",
      },
      {
        Code: "SK",
        UrlCode: "slovakia",
        Name: "Slovakia",
      },
      {
        Code: "SI",
        UrlCode: "slovenia",
        Name: "Slovenia",
      },
      {
        Code: "SB",
        UrlCode: "solomon-islands",
        Name: "Solomon Islands",
      },
      {
        Code: "SO",
        UrlCode: "somalia",
        Name: "Somalia",
      },
      {
        Code: "ZA",
        UrlCode: "south-africa",
        Name: "South Africa",
      },
      {
        Code: "GS",
        UrlCode: "south-georgia-and-the-south-sandwich-islands",
        Name: "South Georgia and the South Sandwich Islands",
      },
      {
        Code: "SS",
        UrlCode: "south-sudan",
        Name: "South Sudan",
      },
      {
        Code: "ES",
        UrlCode: "spain",
        Name: "Spain",
      },
      {
        Code: "LK",
        UrlCode: "sri-lanka",
        Name: "Sri Lanka",
      },
      {
        Code: "SD",
        UrlCode: "sudan",
        Name: "Sudan",
      },
      {
        Code: "SR",
        UrlCode: "suriname",
        Name: "Suriname",
      },
      {
        Code: "SJ",
        UrlCode: "svalbard-and-jan-mayen",
        Name: "Svalbard and Jan Mayen",
      },
      {
        Code: "SZ",
        UrlCode: "swaziland",
        Name: "Swaziland",
      },
      {
        Code: "SE",
        UrlCode: "sweden",
        Name: "Sweden",
      },
      {
        Code: "CH",
        UrlCode: "switzerland",
        Name: "Switzerland",
      },
      {
        Code: "SY",
        UrlCode: "syrian-arab-republic",
        Name: "Syrian Arab Republic",
      },
      {
        Code: "TW",
        UrlCode: "taiwan",
        Name: "Taiwan",
      },
      {
        Code: "TJ",
        UrlCode: "tajikistan",
        Name: "Tajikistan",
      },
      {
        Code: "TZ",
        UrlCode: "tanzania-united-republic-of",
        Name: "Tanzania, United Republic of",
      },
      {
        Code: "TH",
        UrlCode: "thailand",
        Name: "Thailand",
      },
      {
        Code: "TL",
        UrlCode: "timor-leste",
        Name: "Timor-Leste",
      },
      {
        Code: "TG",
        UrlCode: "togo",
        Name: "Togo",
      },
      {
        Code: "TK",
        UrlCode: "tokelau",
        Name: "Tokelau",
      },
      {
        Code: "TO",
        UrlCode: "tonga",
        Name: "Tonga",
      },
      {
        Code: "TT",
        UrlCode: "trinidad-and-tobago",
        Name: "Trinidad and Tobago",
      },
      {
        Code: "TN",
        UrlCode: "tunisia",
        Name: "Tunisia",
      },
      {
        Code: "TR",
        UrlCode: "turkey",
        Name: "Turkey",
      },
      {
        Code: "TM",
        UrlCode: "turkmenistan",
        Name: "Turkmenistan",
      },
      {
        Code: "TC",
        UrlCode: "turks-and-caicos-islands",
        Name: "Turks and Caicos Islands",
      },
      {
        Code: "TV",
        UrlCode: "tuvalu",
        Name: "Tuvalu",
      },
      {
        Code: "UG",
        UrlCode: "uganda",
        Name: "Uganda",
      },
      {
        Code: "UA",
        UrlCode: "ukraine",
        Name: "Ukraine",
      },
      {
        Code: "AE",
        UrlCode: "united-arab-emirates",
        Name: "United Arab Emirates",
      },
      {
        Code: "GB",
        UrlCode: "united-kingdom",
        Name: "United Kingdom",
      },
      {
        Code: "US",
        UrlCode: "united-states",
        Name: "United States",
      },
      {
        Code: "UM",
        UrlCode: "united-states-minor-outlying-islands",
        Name: "United States Minor Outlying Islands",
      },
      {
        Code: "UY",
        UrlCode: "uruguay",
        Name: "Uruguay",
      },
      {
        Code: "UZ",
        UrlCode: "uzbekistan",
        Name: "Uzbekistan",
      },
      {
        Code: "VU",
        UrlCode: "vanuatu",
        Name: "Vanuatu",
      },
      {
        Code: "VE",
        UrlCode: "venezuela-bolivarian-republic-of",
        Name: "Venezuela",
      },
      {
        Code: "VN",
        UrlCode: "vietnam",
        Name: "Vietnam",
      },
      {
        Code: "VG",
        UrlCode: "virgin-islands-british",
        Name: "Virgin Islands, British",
      },
      {
        Code: "VI",
        UrlCode: "virgin-islands-us",
        Name: "Virgin Islands, U.S.",
      },
      {
        Code: "WF",
        UrlCode: "wallis-and-futuna",
        Name: "Wallis and Futuna",
      },
      {
        Code: "EH",
        UrlCode: "western-sahara",
        Name: "Western Sahara",
      },
      {
        Code: "YE",
        UrlCode: "yemen",
        Name: "Yemen",
      },
      {
        Code: "ZM",
        UrlCode: "zambia",
        Name: "Zambia",
      },
      {
        Code: "ZW",
        UrlCode: "zimbabwe",
        Name: "Zimbabwe",
      },
    ],
    Competitors: {
      TopSimilarityCompetitors: [],
    },
    Notification: {
      Content: null,
    },
    TopKeywords: [
      {
        Name: "gmail",
        EstimatedValue: 188981855,
        Volume: 107566900,
        Cpc: 1.0309433125,
      },
      {
        Name: "google",
        EstimatedValue: 88938753,
        Volume: 67170070,
        Cpc: 0.61198575,
      },
      {
        Name: "google maps",
        EstimatedValue: 52791085,
        Volume: 62982000,
        Cpc: 0.4395144375,
      },
      {
        Name: "google docs",
        EstimatedValue: 30954805,
        Volume: 22480890,
        Cpc: 1.543063,
      },
      {
        Name: "google drive",
        EstimatedValue: 30770950,
        Volume: 18181220,
        Cpc: 1.24318225,
      },
    ],
    SnapshotDate: "2024-09-01T00:00:00+00:00",
  },
};

// Type Check
const wrtn: ISimilarweb.IGetDomainInfoOutput = {
  description: "OK",
  status: 200,
  data: {
    Version: 1,
    SiteName: "wrtn.ai",
    Description:
      "당신의 첫 ai 에이전트 뤼튼. ai 검색부터 나만의 ai 캐릭터까지, ai의 끝없는 가능성을 탐험해 보세요.",
    TopCountryShares: [
      {
        Country: 410,
        CountryCode: "KR",
        Value: 0.9784976876188887,
      },
      {
        Country: 840,
        CountryCode: "US",
        Value: 0.010597274187364846,
      },
      {
        Country: 356,
        CountryCode: "IN",
        Value: 0.0021384489813117704,
      },
      {
        Country: 124,
        CountryCode: "CA",
        Value: 0.001581869350173387,
      },
      {
        Country: 392,
        CountryCode: "JP",
        Value: 0.0014519817725164195,
      },
    ],
    Title: "뤼튼",
    Engagments: {
      BounceRate: "0.30651070313756",
      Month: "9",
      Year: "2024",
      PagePerVisit: "5.188952923887176",
      Visits: "3254665",
      TimeOnSite: "324.233034230767",
    },
    EstimatedMonthlyVisits: {
      "2024-07-01": 2921594,
      "2024-08-01": 2511112,
      "2024-09-01": 3254665,
    },
    GlobalRank: {
      Rank: 18088,
    },
    CountryRank: {
      Country: 410,
      CountryCode: "KR",
      Rank: 464,
    },
    CategoryRank: {
      Rank: "60",
      Category: "E-commerce_and_Shopping/E-commerce_and_Shopping",
    },
    GlobalCategoryRank: null,
    IsSmall: false,
    Policy: 0,
    TrafficSources: {
      Social: 0.0026171962453775564,
      "Paid Referrals": 0.003092766063458468,
      Mail: 3.471304885669862e-5,
      Referrals: 0.03531876353722226,
      Search: 0.39558307846009766,
      Direct: 0.5633534826449872,
    },
    Category: "e-commerce_and_shopping/e-commerce_and_shopping",
    LargeScreenshot:
      "https://site-images.similarcdn.com/image?url=wrtn.ai&amp;t=1&amp;s=1&amp;h=0b5a67ea5b321d3b77a0d60be4e7879e82d36c97048b19d4a02cecc6bb0a7080",
    IsDataFromGa: false,
    Countries: [
      {
        Code: "AF",
        UrlCode: "afghanistan",
        Name: "Afghanistan",
      },
      {
        Code: "AX",
        UrlCode: "land-islands",
        Name: "Åland Islands",
      },
      {
        Code: "AL",
        UrlCode: "albania",
        Name: "Albania",
      },
      {
        Code: "DZ",
        UrlCode: "algeria",
        Name: "Algeria",
      },
      {
        Code: "AS",
        UrlCode: "american-samoa",
        Name: "American Samoa",
      },
      {
        Code: "AD",
        UrlCode: "andorra",
        Name: "Andorra",
      },
      {
        Code: "AO",
        UrlCode: "angola",
        Name: "Angola",
      },
      {
        Code: "AI",
        UrlCode: "anguilla",
        Name: "Anguilla",
      },
      {
        Code: "AQ",
        UrlCode: "antarctica",
        Name: "Antarctica",
      },
      {
        Code: "AG",
        UrlCode: "antigua-and-barbuda",
        Name: "Antigua and Barbuda",
      },
      {
        Code: "AR",
        UrlCode: "argentina",
        Name: "Argentina",
      },
      {
        Code: "AM",
        UrlCode: "armenia",
        Name: "Armenia",
      },
      {
        Code: "AW",
        UrlCode: "aruba",
        Name: "Aruba",
      },
      {
        Code: "AU",
        UrlCode: "australia",
        Name: "Australia",
      },
      {
        Code: "AT",
        UrlCode: "austria",
        Name: "Austria",
      },
      {
        Code: "AZ",
        UrlCode: "azerbaijan",
        Name: "Azerbaijan",
      },
      {
        Code: "BS",
        UrlCode: "bahamas",
        Name: "Bahamas",
      },
      {
        Code: "BH",
        UrlCode: "bahrain",
        Name: "Bahrain",
      },
      {
        Code: "BD",
        UrlCode: "bangladesh",
        Name: "Bangladesh",
      },
      {
        Code: "BB",
        UrlCode: "barbados",
        Name: "Barbados",
      },
      {
        Code: "BY",
        UrlCode: "belarus",
        Name: "Belarus",
      },
      {
        Code: "BE",
        UrlCode: "belgium",
        Name: "Belgium",
      },
      {
        Code: "BZ",
        UrlCode: "belize",
        Name: "Belize",
      },
      {
        Code: "BJ",
        UrlCode: "benin",
        Name: "Benin",
      },
      {
        Code: "BM",
        UrlCode: "bermuda",
        Name: "Bermuda",
      },
      {
        Code: "BT",
        UrlCode: "bhutan",
        Name: "Bhutan",
      },
      {
        Code: "BO",
        UrlCode: "bolivia-plurinational-state-of",
        Name: "Bolivia",
      },
      {
        Code: "BQ",
        UrlCode: "bonaire-sint-eustatius-and-saba",
        Name: "Bonaire, Sint Eustatius and Saba",
      },
      {
        Code: "BA",
        UrlCode: "bosnia-and-herzegovina",
        Name: "Bosnia and Herzegovina",
      },
      {
        Code: "BW",
        UrlCode: "botswana",
        Name: "Botswana",
      },
      {
        Code: "BV",
        UrlCode: "bouvet-island",
        Name: "Bouvet Island",
      },
      {
        Code: "BR",
        UrlCode: "brazil",
        Name: "Brazil",
      },
      {
        Code: "IO",
        UrlCode: "british-indian-ocean-territory",
        Name: "British Indian Ocean Territory",
      },
      {
        Code: "BN",
        UrlCode: "brunei-darussalam",
        Name: "Brunei Darussalam",
      },
      {
        Code: "BG",
        UrlCode: "bulgaria",
        Name: "Bulgaria",
      },
      {
        Code: "BF",
        UrlCode: "burkina-faso",
        Name: "Burkina Faso",
      },
      {
        Code: "BI",
        UrlCode: "burundi",
        Name: "Burundi",
      },
      {
        Code: "CV",
        UrlCode: "cabo-verde",
        Name: "Cabo Verde",
      },
      {
        Code: "KH",
        UrlCode: "cambodia",
        Name: "Cambodia",
      },
      {
        Code: "CM",
        UrlCode: "cameroon",
        Name: "Cameroon",
      },
      {
        Code: "CA",
        UrlCode: "canada",
        Name: "Canada",
      },
      {
        Code: "KY",
        UrlCode: "cayman-islands",
        Name: "Cayman Islands",
      },
      {
        Code: "CF",
        UrlCode: "central-african-republic",
        Name: "Central African Republic",
      },
      {
        Code: "TD",
        UrlCode: "chad",
        Name: "Chad",
      },
      {
        Code: "CL",
        UrlCode: "chile",
        Name: "Chile",
      },
      {
        Code: "CN",
        UrlCode: "china",
        Name: "China",
      },
      {
        Code: "CX",
        UrlCode: "christmas-island",
        Name: "Christmas Island",
      },
      {
        Code: "CC",
        UrlCode: "cocos-keeling-islands",
        Name: "Cocos (Keeling) Islands",
      },
      {
        Code: "CO",
        UrlCode: "colombia",
        Name: "Colombia",
      },
      {
        Code: "KM",
        UrlCode: "comoros",
        Name: "Comoros",
      },
      {
        Code: "CG",
        UrlCode: "congo",
        Name: "Congo",
      },
      {
        Code: "CD",
        UrlCode: "congo-the-democratic-republic-of-the",
        Name: "Congo, the Democratic Republic of the",
      },
      {
        Code: "CK",
        UrlCode: "cook-islands",
        Name: "Cook Islands",
      },
      {
        Code: "CR",
        UrlCode: "costa-rica",
        Name: "Costa Rica",
      },
      {
        Code: "CI",
        UrlCode: "cte-divoire",
        Name: "Côte d'Ivoire",
      },
      {
        Code: "HR",
        UrlCode: "croatia",
        Name: "Croatia",
      },
      {
        Code: "CU",
        UrlCode: "cuba",
        Name: "Cuba",
      },
      {
        Code: "CW",
        UrlCode: "curaao",
        Name: "Curaçao",
      },
      {
        Code: "CY",
        UrlCode: "cyprus",
        Name: "Cyprus",
      },
      {
        Code: "CZ",
        UrlCode: "czech-republic",
        Name: "Czech Republic",
      },
      {
        Code: "DK",
        UrlCode: "denmark",
        Name: "Denmark",
      },
      {
        Code: "DJ",
        UrlCode: "djibouti",
        Name: "Djibouti",
      },
      {
        Code: "DM",
        UrlCode: "dominica",
        Name: "Dominica",
      },
      {
        Code: "DO",
        UrlCode: "dominican-republic",
        Name: "Dominican Republic",
      },
      {
        Code: "EC",
        UrlCode: "ecuador",
        Name: "Ecuador",
      },
      {
        Code: "EG",
        UrlCode: "egypt",
        Name: "Egypt",
      },
      {
        Code: "SV",
        UrlCode: "el-salvador",
        Name: "El Salvador",
      },
      {
        Code: "GQ",
        UrlCode: "equatorial-guinea",
        Name: "Equatorial Guinea",
      },
      {
        Code: "ER",
        UrlCode: "eritrea",
        Name: "Eritrea",
      },
      {
        Code: "EE",
        UrlCode: "estonia",
        Name: "Estonia",
      },
      {
        Code: "ET",
        UrlCode: "ethiopia",
        Name: "Ethiopia",
      },
      {
        Code: "FK",
        UrlCode: "falkland-islands-malvinas",
        Name: "Falkland Islands (Malvinas)",
      },
      {
        Code: "FO",
        UrlCode: "faroe-islands",
        Name: "Faroe Islands",
      },
      {
        Code: "FJ",
        UrlCode: "fiji",
        Name: "Fiji",
      },
      {
        Code: "FI",
        UrlCode: "finland",
        Name: "Finland",
      },
      {
        Code: "FR",
        UrlCode: "france",
        Name: "France",
      },
      {
        Code: "GF",
        UrlCode: "french-guiana",
        Name: "French Guiana",
      },
      {
        Code: "PF",
        UrlCode: "french-polynesia",
        Name: "French Polynesia",
      },
      {
        Code: "TF",
        UrlCode: "french-southern-territories",
        Name: "French Southern Territories",
      },
      {
        Code: "GA",
        UrlCode: "gabon",
        Name: "Gabon",
      },
      {
        Code: "GM",
        UrlCode: "gambia",
        Name: "Gambia",
      },
      {
        Code: "GE",
        UrlCode: "georgia",
        Name: "Georgia",
      },
      {
        Code: "DE",
        UrlCode: "germany",
        Name: "Germany",
      },
      {
        Code: "GH",
        UrlCode: "ghana",
        Name: "Ghana",
      },
      {
        Code: "GI",
        UrlCode: "gibraltar",
        Name: "Gibraltar",
      },
      {
        Code: "GR",
        UrlCode: "greece",
        Name: "Greece",
      },
      {
        Code: "GL",
        UrlCode: "greenland",
        Name: "Greenland",
      },
      {
        Code: "GD",
        UrlCode: "grenada",
        Name: "Grenada",
      },
      {
        Code: "GP",
        UrlCode: "guadeloupe",
        Name: "Guadeloupe",
      },
      {
        Code: "GU",
        UrlCode: "guam",
        Name: "Guam",
      },
      {
        Code: "GT",
        UrlCode: "guatemala",
        Name: "Guatemala",
      },
      {
        Code: "GG",
        UrlCode: "guernsey",
        Name: "Guernsey",
      },
      {
        Code: "GN",
        UrlCode: "guinea",
        Name: "Guinea",
      },
      {
        Code: "GW",
        UrlCode: "guinea-bissau",
        Name: "Guinea-Bissau",
      },
      {
        Code: "GY",
        UrlCode: "guyana",
        Name: "Guyana",
      },
      {
        Code: "HT",
        UrlCode: "haiti",
        Name: "Haiti",
      },
      {
        Code: "HM",
        UrlCode: "heard-island-and-mcdonald-islands",
        Name: "Heard Island and McDonald Islands",
      },
      {
        Code: "VA",
        UrlCode: "holy-see-vatican-city-state",
        Name: "Holy See (Vatican City State)",
      },
      {
        Code: "HN",
        UrlCode: "honduras",
        Name: "Honduras",
      },
      {
        Code: "HK",
        UrlCode: "hong-kong",
        Name: "Hong Kong",
      },
      {
        Code: "HU",
        UrlCode: "hungary",
        Name: "Hungary",
      },
      {
        Code: "IS",
        UrlCode: "iceland",
        Name: "Iceland",
      },
      {
        Code: "IN",
        UrlCode: "india",
        Name: "India",
      },
      {
        Code: "ID",
        UrlCode: "indonesia",
        Name: "Indonesia",
      },
      {
        Code: "IR",
        UrlCode: "iran-islamic-republic-of",
        Name: "Iran",
      },
      {
        Code: "IQ",
        UrlCode: "iraq",
        Name: "Iraq",
      },
      {
        Code: "IE",
        UrlCode: "ireland",
        Name: "Ireland",
      },
      {
        Code: "IM",
        UrlCode: "isle-of-man",
        Name: "Isle of Man",
      },
      {
        Code: "IL",
        UrlCode: "israel",
        Name: "Israel",
      },
      {
        Code: "IT",
        UrlCode: "italy",
        Name: "Italy",
      },
      {
        Code: "JM",
        UrlCode: "jamaica",
        Name: "Jamaica",
      },
      {
        Code: "JP",
        UrlCode: "japan",
        Name: "Japan",
      },
      {
        Code: "JE",
        UrlCode: "jersey",
        Name: "Jersey",
      },
      {
        Code: "JO",
        UrlCode: "jordan",
        Name: "Jordan",
      },
      {
        Code: "KZ",
        UrlCode: "kazakhstan",
        Name: "Kazakhstan",
      },
      {
        Code: "KE",
        UrlCode: "kenya",
        Name: "Kenya",
      },
      {
        Code: "KI",
        UrlCode: "kiribati",
        Name: "Kiribati",
      },
      {
        Code: "KP",
        UrlCode: "korea-democratic-peoples-republic-of",
        Name: "Korea, Democratic People's Republic of",
      },
      {
        Code: "KR",
        UrlCode: "korea-republic-of",
        Name: "Korea, Republic of",
      },
      {
        Code: "KW",
        UrlCode: "kuwait",
        Name: "Kuwait",
      },
      {
        Code: "KG",
        UrlCode: "kyrgyzstan",
        Name: "Kyrgyzstan",
      },
      {
        Code: "LA",
        UrlCode: "lao-peoples-democratic-republic",
        Name: "Lao People's Democratic Republic",
      },
      {
        Code: "LV",
        UrlCode: "latvia",
        Name: "Latvia",
      },
      {
        Code: "LB",
        UrlCode: "lebanon",
        Name: "Lebanon",
      },
      {
        Code: "LS",
        UrlCode: "lesotho",
        Name: "Lesotho",
      },
      {
        Code: "LR",
        UrlCode: "liberia",
        Name: "Liberia",
      },
      {
        Code: "LY",
        UrlCode: "libya",
        Name: "Libya",
      },
      {
        Code: "LI",
        UrlCode: "liechtenstein",
        Name: "Liechtenstein",
      },
      {
        Code: "LT",
        UrlCode: "lithuania",
        Name: "Lithuania",
      },
      {
        Code: "LU",
        UrlCode: "luxembourg",
        Name: "Luxembourg",
      },
      {
        Code: "MO",
        UrlCode: "macao",
        Name: "Macao",
      },
      {
        Code: "MK",
        UrlCode: "macedonia-the-former-yugoslav-republic-of",
        Name: "Macedonia (FYROM)",
      },
      {
        Code: "MG",
        UrlCode: "madagascar",
        Name: "Madagascar",
      },
      {
        Code: "MW",
        UrlCode: "malawi",
        Name: "Malawi",
      },
      {
        Code: "MY",
        UrlCode: "malaysia",
        Name: "Malaysia",
      },
      {
        Code: "MV",
        UrlCode: "maldives",
        Name: "Maldives",
      },
      {
        Code: "ML",
        UrlCode: "mali",
        Name: "Mali",
      },
      {
        Code: "MT",
        UrlCode: "malta",
        Name: "Malta",
      },
      {
        Code: "MH",
        UrlCode: "marshall-islands",
        Name: "Marshall Islands",
      },
      {
        Code: "MQ",
        UrlCode: "martinique",
        Name: "Martinique",
      },
      {
        Code: "MR",
        UrlCode: "mauritania",
        Name: "Mauritania",
      },
      {
        Code: "MU",
        UrlCode: "mauritius",
        Name: "Mauritius",
      },
      {
        Code: "YT",
        UrlCode: "mayotte",
        Name: "Mayotte",
      },
      {
        Code: "MX",
        UrlCode: "mexico",
        Name: "Mexico",
      },
      {
        Code: "FM",
        UrlCode: "micronesia-federated-states-of",
        Name: "Micronesia, Federated States of",
      },
      {
        Code: "MD",
        UrlCode: "moldova-republic-of",
        Name: "Moldova",
      },
      {
        Code: "MC",
        UrlCode: "monaco",
        Name: "Monaco",
      },
      {
        Code: "MN",
        UrlCode: "mongolia",
        Name: "Mongolia",
      },
      {
        Code: "ME",
        UrlCode: "montenegro",
        Name: "Montenegro",
      },
      {
        Code: "MS",
        UrlCode: "montserrat",
        Name: "Montserrat",
      },
      {
        Code: "MA",
        UrlCode: "morocco",
        Name: "Morocco",
      },
      {
        Code: "MZ",
        UrlCode: "mozambique",
        Name: "Mozambique",
      },
      {
        Code: "MM",
        UrlCode: "myanmar",
        Name: "Myanmar",
      },
      {
        Code: "NA",
        UrlCode: "namibia",
        Name: "Namibia",
      },
      {
        Code: "NR",
        UrlCode: "nauru",
        Name: "Nauru",
      },
      {
        Code: "NP",
        UrlCode: "nepal",
        Name: "Nepal",
      },
      {
        Code: "NL",
        UrlCode: "netherlands",
        Name: "Netherlands",
      },
      {
        Code: "AN",
        UrlCode: "netherlands-antilles",
        Name: "Netherlands Antilles",
      },
      {
        Code: "NC",
        UrlCode: "new-caledonia",
        Name: "New Caledonia",
      },
      {
        Code: "NZ",
        UrlCode: "new-zealand",
        Name: "New Zealand",
      },
      {
        Code: "NI",
        UrlCode: "nicaragua",
        Name: "Nicaragua",
      },
      {
        Code: "NE",
        UrlCode: "niger",
        Name: "Niger",
      },
      {
        Code: "NG",
        UrlCode: "nigeria",
        Name: "Nigeria",
      },
      {
        Code: "NU",
        UrlCode: "niue",
        Name: "Niue",
      },
      {
        Code: "AP",
        UrlCode: "non-spec-asia-pas-location",
        Name: "Non-spec Asia Pas Location",
      },
      {
        Code: "NF",
        UrlCode: "norfolk-island",
        Name: "Norfolk Island",
      },
      {
        Code: "MP",
        UrlCode: "northern-mariana-islands",
        Name: "Northern Mariana Islands",
      },
      {
        Code: "NO",
        UrlCode: "norway",
        Name: "Norway",
      },
      {
        Code: "OM",
        UrlCode: "oman",
        Name: "Oman",
      },
      {
        Code: "PK",
        UrlCode: "pakistan",
        Name: "Pakistan",
      },
      {
        Code: "PW",
        UrlCode: "palau",
        Name: "Palau",
      },
      {
        Code: "PS",
        UrlCode: "palestine-state-of",
        Name: "Palestine",
      },
      {
        Code: "PA",
        UrlCode: "panama",
        Name: "Panama",
      },
      {
        Code: "PG",
        UrlCode: "papua-new-guinea",
        Name: "Papua New Guinea",
      },
      {
        Code: "PY",
        UrlCode: "paraguay",
        Name: "Paraguay",
      },
      {
        Code: "PE",
        UrlCode: "peru",
        Name: "Peru",
      },
      {
        Code: "PH",
        UrlCode: "philippines",
        Name: "Philippines",
      },
      {
        Code: "PN",
        UrlCode: "pitcairn",
        Name: "Pitcairn",
      },
      {
        Code: "PL",
        UrlCode: "poland",
        Name: "Poland",
      },
      {
        Code: "PT",
        UrlCode: "portugal",
        Name: "Portugal",
      },
      {
        Code: "PR",
        UrlCode: "puerto-rico",
        Name: "Puerto Rico",
      },
      {
        Code: "QA",
        UrlCode: "qatar",
        Name: "Qatar",
      },
      {
        Code: "RE",
        UrlCode: "runion",
        Name: "Réunion",
      },
      {
        Code: "RO",
        UrlCode: "romania",
        Name: "Romania",
      },
      {
        Code: "RU",
        UrlCode: "russian-federation",
        Name: "Russia",
      },
      {
        Code: "RW",
        UrlCode: "rwanda",
        Name: "Rwanda",
      },
      {
        Code: "BL",
        UrlCode: "saint-barthlemy",
        Name: "Saint Barthélemy",
      },
      {
        Code: "SH",
        UrlCode: "saint-helena-ascension-and-tristan-da-cunha",
        Name: "Saint Helena, Ascension and Tristan da Cunha",
      },
      {
        Code: "KN",
        UrlCode: "saint-kitts-and-nevis",
        Name: "Saint Kitts and Nevis",
      },
      {
        Code: "LC",
        UrlCode: "saint-lucia",
        Name: "Saint Lucia",
      },
      {
        Code: "MF",
        UrlCode: "saint-martin-french-part",
        Name: "Saint Martin (French part)",
      },
      {
        Code: "PM",
        UrlCode: "saint-pierre-and-miquelon",
        Name: "Saint Pierre and Miquelon",
      },
      {
        Code: "VC",
        UrlCode: "saint-vincent-and-the-grenadines",
        Name: "Saint Vincent and the Grenadines",
      },
      {
        Code: "WS",
        UrlCode: "samoa",
        Name: "Samoa",
      },
      {
        Code: "SM",
        UrlCode: "san-marino",
        Name: "San Marino",
      },
      {
        Code: "ST",
        UrlCode: "sao-tome-and-principe",
        Name: "Sao Tome and Principe",
      },
      {
        Code: "SA",
        UrlCode: "saudi-arabia",
        Name: "Saudi Arabia",
      },
      {
        Code: "SN",
        UrlCode: "senegal",
        Name: "Senegal",
      },
      {
        Code: "RS",
        UrlCode: "serbia",
        Name: "Serbia",
      },
      {
        Code: "CS",
        UrlCode: "serbia-and-montenegro",
        Name: "SERBIA AND MONTENEGRO",
      },
      {
        Code: "SC",
        UrlCode: "seychelles",
        Name: "Seychelles",
      },
      {
        Code: "SL",
        UrlCode: "sierra-leone",
        Name: "Sierra Leone",
      },
      {
        Code: "SG",
        UrlCode: "singapore",
        Name: "Singapore",
      },
      {
        Code: "SX",
        UrlCode: "sint-maarten-dutch-part",
        Name: "Sint Maarten (Dutch part)",
      },
      {
        Code: "SK",
        UrlCode: "slovakia",
        Name: "Slovakia",
      },
      {
        Code: "SI",
        UrlCode: "slovenia",
        Name: "Slovenia",
      },
      {
        Code: "SB",
        UrlCode: "solomon-islands",
        Name: "Solomon Islands",
      },
      {
        Code: "SO",
        UrlCode: "somalia",
        Name: "Somalia",
      },
      {
        Code: "ZA",
        UrlCode: "south-africa",
        Name: "South Africa",
      },
      {
        Code: "GS",
        UrlCode: "south-georgia-and-the-south-sandwich-islands",
        Name: "South Georgia and the South Sandwich Islands",
      },
      {
        Code: "SS",
        UrlCode: "south-sudan",
        Name: "South Sudan",
      },
      {
        Code: "ES",
        UrlCode: "spain",
        Name: "Spain",
      },
      {
        Code: "LK",
        UrlCode: "sri-lanka",
        Name: "Sri Lanka",
      },
      {
        Code: "SD",
        UrlCode: "sudan",
        Name: "Sudan",
      },
      {
        Code: "SR",
        UrlCode: "suriname",
        Name: "Suriname",
      },
      {
        Code: "SJ",
        UrlCode: "svalbard-and-jan-mayen",
        Name: "Svalbard and Jan Mayen",
      },
      {
        Code: "SZ",
        UrlCode: "swaziland",
        Name: "Swaziland",
      },
      {
        Code: "SE",
        UrlCode: "sweden",
        Name: "Sweden",
      },
      {
        Code: "CH",
        UrlCode: "switzerland",
        Name: "Switzerland",
      },
      {
        Code: "SY",
        UrlCode: "syrian-arab-republic",
        Name: "Syrian Arab Republic",
      },
      {
        Code: "TW",
        UrlCode: "taiwan",
        Name: "Taiwan",
      },
      {
        Code: "TJ",
        UrlCode: "tajikistan",
        Name: "Tajikistan",
      },
      {
        Code: "TZ",
        UrlCode: "tanzania-united-republic-of",
        Name: "Tanzania, United Republic of",
      },
      {
        Code: "TH",
        UrlCode: "thailand",
        Name: "Thailand",
      },
      {
        Code: "TL",
        UrlCode: "timor-leste",
        Name: "Timor-Leste",
      },
      {
        Code: "TG",
        UrlCode: "togo",
        Name: "Togo",
      },
      {
        Code: "TK",
        UrlCode: "tokelau",
        Name: "Tokelau",
      },
      {
        Code: "TO",
        UrlCode: "tonga",
        Name: "Tonga",
      },
      {
        Code: "TT",
        UrlCode: "trinidad-and-tobago",
        Name: "Trinidad and Tobago",
      },
      {
        Code: "TN",
        UrlCode: "tunisia",
        Name: "Tunisia",
      },
      {
        Code: "TR",
        UrlCode: "turkey",
        Name: "Turkey",
      },
      {
        Code: "TM",
        UrlCode: "turkmenistan",
        Name: "Turkmenistan",
      },
      {
        Code: "TC",
        UrlCode: "turks-and-caicos-islands",
        Name: "Turks and Caicos Islands",
      },
      {
        Code: "TV",
        UrlCode: "tuvalu",
        Name: "Tuvalu",
      },
      {
        Code: "UG",
        UrlCode: "uganda",
        Name: "Uganda",
      },
      {
        Code: "UA",
        UrlCode: "ukraine",
        Name: "Ukraine",
      },
      {
        Code: "AE",
        UrlCode: "united-arab-emirates",
        Name: "United Arab Emirates",
      },
      {
        Code: "GB",
        UrlCode: "united-kingdom",
        Name: "United Kingdom",
      },
      {
        Code: "US",
        UrlCode: "united-states",
        Name: "United States",
      },
      {
        Code: "UM",
        UrlCode: "united-states-minor-outlying-islands",
        Name: "United States Minor Outlying Islands",
      },
      {
        Code: "UY",
        UrlCode: "uruguay",
        Name: "Uruguay",
      },
      {
        Code: "UZ",
        UrlCode: "uzbekistan",
        Name: "Uzbekistan",
      },
      {
        Code: "VU",
        UrlCode: "vanuatu",
        Name: "Vanuatu",
      },
      {
        Code: "VE",
        UrlCode: "venezuela-bolivarian-republic-of",
        Name: "Venezuela",
      },
      {
        Code: "VN",
        UrlCode: "vietnam",
        Name: "Vietnam",
      },
      {
        Code: "VG",
        UrlCode: "virgin-islands-british",
        Name: "Virgin Islands, British",
      },
      {
        Code: "VI",
        UrlCode: "virgin-islands-us",
        Name: "Virgin Islands, U.S.",
      },
      {
        Code: "WF",
        UrlCode: "wallis-and-futuna",
        Name: "Wallis and Futuna",
      },
      {
        Code: "EH",
        UrlCode: "western-sahara",
        Name: "Western Sahara",
      },
      {
        Code: "YE",
        UrlCode: "yemen",
        Name: "Yemen",
      },
      {
        Code: "ZM",
        UrlCode: "zambia",
        Name: "Zambia",
      },
      {
        Code: "ZW",
        UrlCode: "zimbabwe",
        Name: "Zimbabwe",
      },
    ],
    Competitors: {
      TopSimilarityCompetitors: [],
    },
    Notification: {
      Content: null,
    },
    TopKeywords: [
      {
        Name: "뤼튼",
        EstimatedValue: 785672,
        Volume: 230600,
        Cpc: 0.714781375,
      },
      {
        Name: "뤼튼 ai",
        EstimatedValue: 58242,
        Volume: 12630,
        Cpc: 0.530426375,
      },
      {
        Name: "wrtn",
        EstimatedValue: 42497,
        Volume: 25020,
        Cpc: 0.5900791875,
      },
      {
        Name: "fnlxms",
        EstimatedValue: 24776,
        Volume: 8330,
        Cpc: 0.5720154375,
      },
      {
        Name: "뤼튼ai",
        EstimatedValue: 14047,
        Volume: 3960,
        Cpc: null,
      },
    ],
    SnapshotDate: "2024-09-01T00:00:00+00:00",
  },
};

// Type Check
const naver: ISimilarweb.IGetDomainInfoOutput = {
  description: "OK",
  status: 200,
  data: {
    Version: 1,
    SiteName: "naver.com",
    Description: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
    TopCountryShares: [
      {
        Country: 410,
        CountryCode: "KR",
        Value: 0.9705477084068359,
      },
      {
        Country: 840,
        CountryCode: "US",
        Value: 0.01062794624404454,
      },
      {
        Country: 392,
        CountryCode: "JP",
        Value: 0.003922510831933884,
      },
      {
        Country: 704,
        CountryCode: "VN",
        Value: 0.0021760264706151937,
      },
      {
        Country: 124,
        CountryCode: "CA",
        Value: 0.0016704704230763227,
      },
    ],
    Title: "naver",
    Engagments: {
      BounceRate: "0.25769554395673305",
      Month: "9",
      Year: "2024",
      PagePerVisit: "11.07149818914855",
      Visits: "1547948924",
      TimeOnSite: "942.6239528348713",
    },
    EstimatedMonthlyVisits: {
      "2024-07-01": 1650666434,
      "2024-08-01": 1619738314,
      "2024-09-01": 1547948924,
    },
    GlobalRank: {
      Rank: 19,
    },
    CountryRank: {
      Country: 410,
      CountryCode: "KR",
      Rank: 1,
    },
    CategoryRank: {
      Rank: "1",
      Category: "News_and_Media",
    },
    GlobalCategoryRank: null,
    IsSmall: false,
    Policy: 0,
    TrafficSources: {
      Social: 0.008032730797941126,
      "Paid Referrals": 0.00920233305102113,
      Mail: 0.0037895496184155533,
      Referrals: 0.06586644495214125,
      Search: 0.1881043673154984,
      Direct: 0.7250045742634728,
    },
    Category: "news_and_media",
    LargeScreenshot:
      "https://site-images.similarcdn.com/image?url=naver.com&t=1&s=1&h=d0cb2a7c7e5048fcae43abc238269736c1eaae31a8f89160c5be0080115448fc",
    IsDataFromGa: false,
    Countries: [
      {
        Code: "AF",
        UrlCode: "afghanistan",
        Name: "Afghanistan",
      },
      {
        Code: "AX",
        UrlCode: "land-islands",
        Name: "Åland Islands",
      },
      {
        Code: "AL",
        UrlCode: "albania",
        Name: "Albania",
      },
      {
        Code: "DZ",
        UrlCode: "algeria",
        Name: "Algeria",
      },
      {
        Code: "AS",
        UrlCode: "american-samoa",
        Name: "American Samoa",
      },
      {
        Code: "AD",
        UrlCode: "andorra",
        Name: "Andorra",
      },
      {
        Code: "AO",
        UrlCode: "angola",
        Name: "Angola",
      },
      {
        Code: "AI",
        UrlCode: "anguilla",
        Name: "Anguilla",
      },
      {
        Code: "AQ",
        UrlCode: "antarctica",
        Name: "Antarctica",
      },
      {
        Code: "AG",
        UrlCode: "antigua-and-barbuda",
        Name: "Antigua and Barbuda",
      },
      {
        Code: "AR",
        UrlCode: "argentina",
        Name: "Argentina",
      },
      {
        Code: "AM",
        UrlCode: "armenia",
        Name: "Armenia",
      },
      {
        Code: "AW",
        UrlCode: "aruba",
        Name: "Aruba",
      },
      {
        Code: "AU",
        UrlCode: "australia",
        Name: "Australia",
      },
      {
        Code: "AT",
        UrlCode: "austria",
        Name: "Austria",
      },
      {
        Code: "AZ",
        UrlCode: "azerbaijan",
        Name: "Azerbaijan",
      },
      {
        Code: "BS",
        UrlCode: "bahamas",
        Name: "Bahamas",
      },
      {
        Code: "BH",
        UrlCode: "bahrain",
        Name: "Bahrain",
      },
      {
        Code: "BD",
        UrlCode: "bangladesh",
        Name: "Bangladesh",
      },
      {
        Code: "BB",
        UrlCode: "barbados",
        Name: "Barbados",
      },
      {
        Code: "BY",
        UrlCode: "belarus",
        Name: "Belarus",
      },
      {
        Code: "BE",
        UrlCode: "belgium",
        Name: "Belgium",
      },
      {
        Code: "BZ",
        UrlCode: "belize",
        Name: "Belize",
      },
      {
        Code: "BJ",
        UrlCode: "benin",
        Name: "Benin",
      },
      {
        Code: "BM",
        UrlCode: "bermuda",
        Name: "Bermuda",
      },
      {
        Code: "BT",
        UrlCode: "bhutan",
        Name: "Bhutan",
      },
      {
        Code: "BO",
        UrlCode: "bolivia-plurinational-state-of",
        Name: "Bolivia",
      },
      {
        Code: "BQ",
        UrlCode: "bonaire-sint-eustatius-and-saba",
        Name: "Bonaire, Sint Eustatius and Saba",
      },
      {
        Code: "BA",
        UrlCode: "bosnia-and-herzegovina",
        Name: "Bosnia and Herzegovina",
      },
      {
        Code: "BW",
        UrlCode: "botswana",
        Name: "Botswana",
      },
      {
        Code: "BV",
        UrlCode: "bouvet-island",
        Name: "Bouvet Island",
      },
      {
        Code: "BR",
        UrlCode: "brazil",
        Name: "Brazil",
      },
      {
        Code: "IO",
        UrlCode: "british-indian-ocean-territory",
        Name: "British Indian Ocean Territory",
      },
      {
        Code: "BN",
        UrlCode: "brunei-darussalam",
        Name: "Brunei Darussalam",
      },
      {
        Code: "BG",
        UrlCode: "bulgaria",
        Name: "Bulgaria",
      },
      {
        Code: "BF",
        UrlCode: "burkina-faso",
        Name: "Burkina Faso",
      },
      {
        Code: "BI",
        UrlCode: "burundi",
        Name: "Burundi",
      },
      {
        Code: "CV",
        UrlCode: "cabo-verde",
        Name: "Cabo Verde",
      },
      {
        Code: "KH",
        UrlCode: "cambodia",
        Name: "Cambodia",
      },
      {
        Code: "CM",
        UrlCode: "cameroon",
        Name: "Cameroon",
      },
      {
        Code: "CA",
        UrlCode: "canada",
        Name: "Canada",
      },
      {
        Code: "KY",
        UrlCode: "cayman-islands",
        Name: "Cayman Islands",
      },
      {
        Code: "CF",
        UrlCode: "central-african-republic",
        Name: "Central African Republic",
      },
      {
        Code: "TD",
        UrlCode: "chad",
        Name: "Chad",
      },
      {
        Code: "CL",
        UrlCode: "chile",
        Name: "Chile",
      },
      {
        Code: "CN",
        UrlCode: "china",
        Name: "China",
      },
      {
        Code: "CX",
        UrlCode: "christmas-island",
        Name: "Christmas Island",
      },
      {
        Code: "CC",
        UrlCode: "cocos-keeling-islands",
        Name: "Cocos (Keeling) Islands",
      },
      {
        Code: "CO",
        UrlCode: "colombia",
        Name: "Colombia",
      },
      {
        Code: "KM",
        UrlCode: "comoros",
        Name: "Comoros",
      },
      {
        Code: "CG",
        UrlCode: "congo",
        Name: "Congo",
      },
      {
        Code: "CD",
        UrlCode: "congo-the-democratic-republic-of-the",
        Name: "Congo, the Democratic Republic of the",
      },
      {
        Code: "CK",
        UrlCode: "cook-islands",
        Name: "Cook Islands",
      },
      {
        Code: "CR",
        UrlCode: "costa-rica",
        Name: "Costa Rica",
      },
      {
        Code: "CI",
        UrlCode: "cte-divoire",
        Name: "Côte d'Ivoire",
      },
      {
        Code: "HR",
        UrlCode: "croatia",
        Name: "Croatia",
      },
      {
        Code: "CU",
        UrlCode: "cuba",
        Name: "Cuba",
      },
      {
        Code: "CW",
        UrlCode: "curaao",
        Name: "Curaçao",
      },
      {
        Code: "CY",
        UrlCode: "cyprus",
        Name: "Cyprus",
      },
      {
        Code: "CZ",
        UrlCode: "czech-republic",
        Name: "Czech Republic",
      },
      {
        Code: "DK",
        UrlCode: "denmark",
        Name: "Denmark",
      },
      {
        Code: "DJ",
        UrlCode: "djibouti",
        Name: "Djibouti",
      },
      {
        Code: "DM",
        UrlCode: "dominica",
        Name: "Dominica",
      },
      {
        Code: "DO",
        UrlCode: "dominican-republic",
        Name: "Dominican Republic",
      },
      {
        Code: "EC",
        UrlCode: "ecuador",
        Name: "Ecuador",
      },
      {
        Code: "EG",
        UrlCode: "egypt",
        Name: "Egypt",
      },
      {
        Code: "SV",
        UrlCode: "el-salvador",
        Name: "El Salvador",
      },
      {
        Code: "GQ",
        UrlCode: "equatorial-guinea",
        Name: "Equatorial Guinea",
      },
      {
        Code: "ER",
        UrlCode: "eritrea",
        Name: "Eritrea",
      },
      {
        Code: "EE",
        UrlCode: "estonia",
        Name: "Estonia",
      },
      {
        Code: "ET",
        UrlCode: "ethiopia",
        Name: "Ethiopia",
      },
      {
        Code: "FK",
        UrlCode: "falkland-islands-malvinas",
        Name: "Falkland Islands (Malvinas)",
      },
      {
        Code: "FO",
        UrlCode: "faroe-islands",
        Name: "Faroe Islands",
      },
      {
        Code: "FJ",
        UrlCode: "fiji",
        Name: "Fiji",
      },
      {
        Code: "FI",
        UrlCode: "finland",
        Name: "Finland",
      },
      {
        Code: "FR",
        UrlCode: "france",
        Name: "France",
      },
      {
        Code: "GF",
        UrlCode: "french-guiana",
        Name: "French Guiana",
      },
      {
        Code: "PF",
        UrlCode: "french-polynesia",
        Name: "French Polynesia",
      },
      {
        Code: "TF",
        UrlCode: "french-southern-territories",
        Name: "French Southern Territories",
      },
      {
        Code: "GA",
        UrlCode: "gabon",
        Name: "Gabon",
      },
      {
        Code: "GM",
        UrlCode: "gambia",
        Name: "Gambia",
      },
      {
        Code: "GE",
        UrlCode: "georgia",
        Name: "Georgia",
      },
      {
        Code: "DE",
        UrlCode: "germany",
        Name: "Germany",
      },
      {
        Code: "GH",
        UrlCode: "ghana",
        Name: "Ghana",
      },
      {
        Code: "GI",
        UrlCode: "gibraltar",
        Name: "Gibraltar",
      },
      {
        Code: "GR",
        UrlCode: "greece",
        Name: "Greece",
      },
      {
        Code: "GL",
        UrlCode: "greenland",
        Name: "Greenland",
      },
      {
        Code: "GD",
        UrlCode: "grenada",
        Name: "Grenada",
      },
      {
        Code: "GP",
        UrlCode: "guadeloupe",
        Name: "Guadeloupe",
      },
      {
        Code: "GU",
        UrlCode: "guam",
        Name: "Guam",
      },
      {
        Code: "GT",
        UrlCode: "guatemala",
        Name: "Guatemala",
      },
      {
        Code: "GG",
        UrlCode: "guernsey",
        Name: "Guernsey",
      },
      {
        Code: "GN",
        UrlCode: "guinea",
        Name: "Guinea",
      },
      {
        Code: "GW",
        UrlCode: "guinea-bissau",
        Name: "Guinea-Bissau",
      },
      {
        Code: "GY",
        UrlCode: "guyana",
        Name: "Guyana",
      },
      {
        Code: "HT",
        UrlCode: "haiti",
        Name: "Haiti",
      },
      {
        Code: "HM",
        UrlCode: "heard-island-and-mcdonald-islands",
        Name: "Heard Island and McDonald Islands",
      },
      {
        Code: "VA",
        UrlCode: "holy-see-vatican-city-state",
        Name: "Holy See (Vatican City State)",
      },
      {
        Code: "HN",
        UrlCode: "honduras",
        Name: "Honduras",
      },
      {
        Code: "HK",
        UrlCode: "hong-kong",
        Name: "Hong Kong",
      },
      {
        Code: "HU",
        UrlCode: "hungary",
        Name: "Hungary",
      },
      {
        Code: "IS",
        UrlCode: "iceland",
        Name: "Iceland",
      },
      {
        Code: "IN",
        UrlCode: "india",
        Name: "India",
      },
      {
        Code: "ID",
        UrlCode: "indonesia",
        Name: "Indonesia",
      },
      {
        Code: "IR",
        UrlCode: "iran-islamic-republic-of",
        Name: "Iran",
      },
      {
        Code: "IQ",
        UrlCode: "iraq",
        Name: "Iraq",
      },
      {
        Code: "IE",
        UrlCode: "ireland",
        Name: "Ireland",
      },
      {
        Code: "IM",
        UrlCode: "isle-of-man",
        Name: "Isle of Man",
      },
      {
        Code: "IL",
        UrlCode: "israel",
        Name: "Israel",
      },
      {
        Code: "IT",
        UrlCode: "italy",
        Name: "Italy",
      },
      {
        Code: "JM",
        UrlCode: "jamaica",
        Name: "Jamaica",
      },
      {
        Code: "JP",
        UrlCode: "japan",
        Name: "Japan",
      },
      {
        Code: "JE",
        UrlCode: "jersey",
        Name: "Jersey",
      },
      {
        Code: "JO",
        UrlCode: "jordan",
        Name: "Jordan",
      },
      {
        Code: "KZ",
        UrlCode: "kazakhstan",
        Name: "Kazakhstan",
      },
      {
        Code: "KE",
        UrlCode: "kenya",
        Name: "Kenya",
      },
      {
        Code: "KI",
        UrlCode: "kiribati",
        Name: "Kiribati",
      },
      {
        Code: "KP",
        UrlCode: "korea-democratic-peoples-republic-of",
        Name: "Korea, Democratic People's Republic of",
      },
      {
        Code: "KR",
        UrlCode: "korea-republic-of",
        Name: "Korea, Republic of",
      },
      {
        Code: "KW",
        UrlCode: "kuwait",
        Name: "Kuwait",
      },
      {
        Code: "KG",
        UrlCode: "kyrgyzstan",
        Name: "Kyrgyzstan",
      },
      {
        Code: "LA",
        UrlCode: "lao-peoples-democratic-republic",
        Name: "Lao People's Democratic Republic",
      },
      {
        Code: "LV",
        UrlCode: "latvia",
        Name: "Latvia",
      },
      {
        Code: "LB",
        UrlCode: "lebanon",
        Name: "Lebanon",
      },
      {
        Code: "LS",
        UrlCode: "lesotho",
        Name: "Lesotho",
      },
      {
        Code: "LR",
        UrlCode: "liberia",
        Name: "Liberia",
      },
      {
        Code: "LY",
        UrlCode: "libya",
        Name: "Libya",
      },
      {
        Code: "LI",
        UrlCode: "liechtenstein",
        Name: "Liechtenstein",
      },
      {
        Code: "LT",
        UrlCode: "lithuania",
        Name: "Lithuania",
      },
      {
        Code: "LU",
        UrlCode: "luxembourg",
        Name: "Luxembourg",
      },
      {
        Code: "MO",
        UrlCode: "macao",
        Name: "Macao",
      },
      {
        Code: "MK",
        UrlCode: "macedonia-the-former-yugoslav-republic-of",
        Name: "Macedonia (FYROM)",
      },
      {
        Code: "MG",
        UrlCode: "madagascar",
        Name: "Madagascar",
      },
      {
        Code: "MW",
        UrlCode: "malawi",
        Name: "Malawi",
      },
      {
        Code: "MY",
        UrlCode: "malaysia",
        Name: "Malaysia",
      },
      {
        Code: "MV",
        UrlCode: "maldives",
        Name: "Maldives",
      },
      {
        Code: "ML",
        UrlCode: "mali",
        Name: "Mali",
      },
      {
        Code: "MT",
        UrlCode: "malta",
        Name: "Malta",
      },
      {
        Code: "MH",
        UrlCode: "marshall-islands",
        Name: "Marshall Islands",
      },
      {
        Code: "MQ",
        UrlCode: "martinique",
        Name: "Martinique",
      },
      {
        Code: "MR",
        UrlCode: "mauritania",
        Name: "Mauritania",
      },
      {
        Code: "MU",
        UrlCode: "mauritius",
        Name: "Mauritius",
      },
      {
        Code: "YT",
        UrlCode: "mayotte",
        Name: "Mayotte",
      },
      {
        Code: "MX",
        UrlCode: "mexico",
        Name: "Mexico",
      },
      {
        Code: "FM",
        UrlCode: "micronesia-federated-states-of",
        Name: "Micronesia, Federated States of",
      },
      {
        Code: "MD",
        UrlCode: "moldova-republic-of",
        Name: "Moldova",
      },
      {
        Code: "MC",
        UrlCode: "monaco",
        Name: "Monaco",
      },
      {
        Code: "MN",
        UrlCode: "mongolia",
        Name: "Mongolia",
      },
      {
        Code: "ME",
        UrlCode: "montenegro",
        Name: "Montenegro",
      },
      {
        Code: "MS",
        UrlCode: "montserrat",
        Name: "Montserrat",
      },
      {
        Code: "MA",
        UrlCode: "morocco",
        Name: "Morocco",
      },
      {
        Code: "MZ",
        UrlCode: "mozambique",
        Name: "Mozambique",
      },
      {
        Code: "MM",
        UrlCode: "myanmar",
        Name: "Myanmar",
      },
      {
        Code: "NA",
        UrlCode: "namibia",
        Name: "Namibia",
      },
      {
        Code: "NR",
        UrlCode: "nauru",
        Name: "Nauru",
      },
      {
        Code: "NP",
        UrlCode: "nepal",
        Name: "Nepal",
      },
      {
        Code: "NL",
        UrlCode: "netherlands",
        Name: "Netherlands",
      },
      {
        Code: "AN",
        UrlCode: "netherlands-antilles",
        Name: "Netherlands Antilles",
      },
      {
        Code: "NC",
        UrlCode: "new-caledonia",
        Name: "New Caledonia",
      },
      {
        Code: "NZ",
        UrlCode: "new-zealand",
        Name: "New Zealand",
      },
      {
        Code: "NI",
        UrlCode: "nicaragua",
        Name: "Nicaragua",
      },
      {
        Code: "NE",
        UrlCode: "niger",
        Name: "Niger",
      },
      {
        Code: "NG",
        UrlCode: "nigeria",
        Name: "Nigeria",
      },
      {
        Code: "NU",
        UrlCode: "niue",
        Name: "Niue",
      },
      {
        Code: "AP",
        UrlCode: "non-spec-asia-pas-location",
        Name: "Non-spec Asia Pas Location",
      },
      {
        Code: "NF",
        UrlCode: "norfolk-island",
        Name: "Norfolk Island",
      },
      {
        Code: "MP",
        UrlCode: "northern-mariana-islands",
        Name: "Northern Mariana Islands",
      },
      {
        Code: "NO",
        UrlCode: "norway",
        Name: "Norway",
      },
      {
        Code: "OM",
        UrlCode: "oman",
        Name: "Oman",
      },
      {
        Code: "PK",
        UrlCode: "pakistan",
        Name: "Pakistan",
      },
      {
        Code: "PW",
        UrlCode: "palau",
        Name: "Palau",
      },
      {
        Code: "PS",
        UrlCode: "palestine-state-of",
        Name: "Palestine",
      },
      {
        Code: "PA",
        UrlCode: "panama",
        Name: "Panama",
      },
      {
        Code: "PG",
        UrlCode: "papua-new-guinea",
        Name: "Papua New Guinea",
      },
      {
        Code: "PY",
        UrlCode: "paraguay",
        Name: "Paraguay",
      },
      {
        Code: "PE",
        UrlCode: "peru",
        Name: "Peru",
      },
      {
        Code: "PH",
        UrlCode: "philippines",
        Name: "Philippines",
      },
      {
        Code: "PN",
        UrlCode: "pitcairn",
        Name: "Pitcairn",
      },
      {
        Code: "PL",
        UrlCode: "poland",
        Name: "Poland",
      },
      {
        Code: "PT",
        UrlCode: "portugal",
        Name: "Portugal",
      },
      {
        Code: "PR",
        UrlCode: "puerto-rico",
        Name: "Puerto Rico",
      },
      {
        Code: "QA",
        UrlCode: "qatar",
        Name: "Qatar",
      },
      {
        Code: "RE",
        UrlCode: "runion",
        Name: "Réunion",
      },
      {
        Code: "RO",
        UrlCode: "romania",
        Name: "Romania",
      },
      {
        Code: "RU",
        UrlCode: "russian-federation",
        Name: "Russia",
      },
      {
        Code: "RW",
        UrlCode: "rwanda",
        Name: "Rwanda",
      },
      {
        Code: "BL",
        UrlCode: "saint-barthlemy",
        Name: "Saint Barthélemy",
      },
      {
        Code: "SH",
        UrlCode: "saint-helena-ascension-and-tristan-da-cunha",
        Name: "Saint Helena, Ascension and Tristan da Cunha",
      },
      {
        Code: "KN",
        UrlCode: "saint-kitts-and-nevis",
        Name: "Saint Kitts and Nevis",
      },
      {
        Code: "LC",
        UrlCode: "saint-lucia",
        Name: "Saint Lucia",
      },
      {
        Code: "MF",
        UrlCode: "saint-martin-french-part",
        Name: "Saint Martin (French part)",
      },
      {
        Code: "PM",
        UrlCode: "saint-pierre-and-miquelon",
        Name: "Saint Pierre and Miquelon",
      },
      {
        Code: "VC",
        UrlCode: "saint-vincent-and-the-grenadines",
        Name: "Saint Vincent and the Grenadines",
      },
      {
        Code: "WS",
        UrlCode: "samoa",
        Name: "Samoa",
      },
      {
        Code: "SM",
        UrlCode: "san-marino",
        Name: "San Marino",
      },
      {
        Code: "ST",
        UrlCode: "sao-tome-and-principe",
        Name: "Sao Tome and Principe",
      },
      {
        Code: "SA",
        UrlCode: "saudi-arabia",
        Name: "Saudi Arabia",
      },
      {
        Code: "SN",
        UrlCode: "senegal",
        Name: "Senegal",
      },
      {
        Code: "RS",
        UrlCode: "serbia",
        Name: "Serbia",
      },
      {
        Code: "CS",
        UrlCode: "serbia-and-montenegro",
        Name: "SERBIA AND MONTENEGRO",
      },
      {
        Code: "SC",
        UrlCode: "seychelles",
        Name: "Seychelles",
      },
      {
        Code: "SL",
        UrlCode: "sierra-leone",
        Name: "Sierra Leone",
      },
      {
        Code: "SG",
        UrlCode: "singapore",
        Name: "Singapore",
      },
      {
        Code: "SX",
        UrlCode: "sint-maarten-dutch-part",
        Name: "Sint Maarten (Dutch part)",
      },
      {
        Code: "SK",
        UrlCode: "slovakia",
        Name: "Slovakia",
      },
      {
        Code: "SI",
        UrlCode: "slovenia",
        Name: "Slovenia",
      },
      {
        Code: "SB",
        UrlCode: "solomon-islands",
        Name: "Solomon Islands",
      },
      {
        Code: "SO",
        UrlCode: "somalia",
        Name: "Somalia",
      },
      {
        Code: "ZA",
        UrlCode: "south-africa",
        Name: "South Africa",
      },
      {
        Code: "GS",
        UrlCode: "south-georgia-and-the-south-sandwich-islands",
        Name: "South Georgia and the South Sandwich Islands",
      },
      {
        Code: "SS",
        UrlCode: "south-sudan",
        Name: "South Sudan",
      },
      {
        Code: "ES",
        UrlCode: "spain",
        Name: "Spain",
      },
      {
        Code: "LK",
        UrlCode: "sri-lanka",
        Name: "Sri Lanka",
      },
      {
        Code: "SD",
        UrlCode: "sudan",
        Name: "Sudan",
      },
      {
        Code: "SR",
        UrlCode: "suriname",
        Name: "Suriname",
      },
      {
        Code: "SJ",
        UrlCode: "svalbard-and-jan-mayen",
        Name: "Svalbard and Jan Mayen",
      },
      {
        Code: "SZ",
        UrlCode: "swaziland",
        Name: "Swaziland",
      },
      {
        Code: "SE",
        UrlCode: "sweden",
        Name: "Sweden",
      },
      {
        Code: "CH",
        UrlCode: "switzerland",
        Name: "Switzerland",
      },
      {
        Code: "SY",
        UrlCode: "syrian-arab-republic",
        Name: "Syrian Arab Republic",
      },
      {
        Code: "TW",
        UrlCode: "taiwan",
        Name: "Taiwan",
      },
      {
        Code: "TJ",
        UrlCode: "tajikistan",
        Name: "Tajikistan",
      },
      {
        Code: "TZ",
        UrlCode: "tanzania-united-republic-of",
        Name: "Tanzania, United Republic of",
      },
      {
        Code: "TH",
        UrlCode: "thailand",
        Name: "Thailand",
      },
      {
        Code: "TL",
        UrlCode: "timor-leste",
        Name: "Timor-Leste",
      },
      {
        Code: "TG",
        UrlCode: "togo",
        Name: "Togo",
      },
      {
        Code: "TK",
        UrlCode: "tokelau",
        Name: "Tokelau",
      },
      {
        Code: "TO",
        UrlCode: "tonga",
        Name: "Tonga",
      },
      {
        Code: "TT",
        UrlCode: "trinidad-and-tobago",
        Name: "Trinidad and Tobago",
      },
      {
        Code: "TN",
        UrlCode: "tunisia",
        Name: "Tunisia",
      },
      {
        Code: "TR",
        UrlCode: "turkey",
        Name: "Turkey",
      },
      {
        Code: "TM",
        UrlCode: "turkmenistan",
        Name: "Turkmenistan",
      },
      {
        Code: "TC",
        UrlCode: "turks-and-caicos-islands",
        Name: "Turks and Caicos Islands",
      },
      {
        Code: "TV",
        UrlCode: "tuvalu",
        Name: "Tuvalu",
      },
      {
        Code: "UG",
        UrlCode: "uganda",
        Name: "Uganda",
      },
      {
        Code: "UA",
        UrlCode: "ukraine",
        Name: "Ukraine",
      },
      {
        Code: "AE",
        UrlCode: "united-arab-emirates",
        Name: "United Arab Emirates",
      },
      {
        Code: "GB",
        UrlCode: "united-kingdom",
        Name: "United Kingdom",
      },
      {
        Code: "US",
        UrlCode: "united-states",
        Name: "United States",
      },
      {
        Code: "UM",
        UrlCode: "united-states-minor-outlying-islands",
        Name: "United States Minor Outlying Islands",
      },
      {
        Code: "UY",
        UrlCode: "uruguay",
        Name: "Uruguay",
      },
      {
        Code: "UZ",
        UrlCode: "uzbekistan",
        Name: "Uzbekistan",
      },
      {
        Code: "VU",
        UrlCode: "vanuatu",
        Name: "Vanuatu",
      },
      {
        Code: "VE",
        UrlCode: "venezuela-bolivarian-republic-of",
        Name: "Venezuela",
      },
      {
        Code: "VN",
        UrlCode: "vietnam",
        Name: "Vietnam",
      },
      {
        Code: "VG",
        UrlCode: "virgin-islands-british",
        Name: "Virgin Islands, British",
      },
      {
        Code: "VI",
        UrlCode: "virgin-islands-us",
        Name: "Virgin Islands, U.S.",
      },
      {
        Code: "WF",
        UrlCode: "wallis-and-futuna",
        Name: "Wallis and Futuna",
      },
      {
        Code: "EH",
        UrlCode: "western-sahara",
        Name: "Western Sahara",
      },
      {
        Code: "YE",
        UrlCode: "yemen",
        Name: "Yemen",
      },
      {
        Code: "ZM",
        UrlCode: "zambia",
        Name: "Zambia",
      },
      {
        Code: "ZW",
        UrlCode: "zimbabwe",
        Name: "Zimbabwe",
      },
    ],
    Competitors: {
      TopSimilarityCompetitors: [],
    },
    Notification: {
      Content: null,
    },
    TopKeywords: [
      {
        Name: "네이버",
        EstimatedValue: 1920088,
        Volume: 3786130,
        Cpc: 1.071286125,
      },
      {
        Name: "치지직",
        EstimatedValue: 908910,
        Volume: 985300,
        Cpc: null,
      },
      {
        Name: "파파고",
        EstimatedValue: 805315,
        Volume: 942330,
        Cpc: null,
      },
      {
        Name: "네이버지도",
        EstimatedValue: 632263,
        Volume: 588480,
        Cpc: null,
      },
      {
        Name: "naver",
        EstimatedValue: 550719,
        Volume: 966540,
        Cpc: 0.735318,
      },
    ],
    SnapshotDate: "2024-09-01T00:00:00+00:00",
  },
};

// Type Check
const daum: ISimilarweb.IGetDomainInfoOutput = {
  description: "OK",
  status: 200,
  data: {
    Version: 1,
    SiteName: "daum.net",
    Description:
      "이용자 선택권을 강화한 뉴스, 세상의 모든 정보를 연결하는 검색. daum에서 나의 관심 콘텐츠를 즐겨보세요.",
    TopCountryShares: [
      {
        Country: 410,
        CountryCode: "KR",
        Value: 0.9628986705406283,
      },
      {
        Country: 840,
        CountryCode: "US",
        Value: 0.016367958675112308,
      },
      {
        Country: 124,
        CountryCode: "CA",
        Value: 0.0046147162529869565,
      },
      {
        Country: 392,
        CountryCode: "JP",
        Value: 0.0033560938783664756,
      },
      {
        Country: 36,
        CountryCode: "AU",
        Value: 0.0013527217368017493,
      },
    ],
    Title: "daum",
    Engagments: {
      BounceRate: "0.2771236630511542",
      Month: "9",
      Year: "2024",
      PagePerVisit: "9.48291547269675",
      Visits: "403311418",
      TimeOnSite: "915.104153484985",
    },
    EstimatedMonthlyVisits: {
      "2024-07-01": 432714196,
      "2024-08-01": 437762848,
      "2024-09-01": 403311418,
    },
    GlobalRank: {
      Rank: 82,
    },
    CountryRank: {
      Country: 410,
      CountryCode: "KR",
      Rank: 4,
    },
    CategoryRank: {
      Rank: "2",
      Category: "Computers_Electronics_and_Technology/Search_Engines",
    },
    GlobalCategoryRank: null,
    IsSmall: false,
    Policy: 0,
    TrafficSources: {
      Social: 0.0017937069360356363,
      "Paid Referrals": 0.002808215811627875,
      Mail: 0.0035799791523053017,
      Referrals: 0.1597437240219563,
      Search: 0.16529471722846167,
      Direct: 0.6667796225130688,
    },
    Category: "computers_electronics_and_technology/search_engines",
    LargeScreenshot:
      "https://site-images.similarcdn.com/image?url=daum.net&t=1&s=1&h=86047477cd324bd410c48b5a0b483b2499f022a93658efb42ae32030bc646175",
    IsDataFromGa: false,
    Countries: [
      {
        Code: "AF",
        UrlCode: "afghanistan",
        Name: "Afghanistan",
      },
      {
        Code: "AX",
        UrlCode: "land-islands",
        Name: "Åland Islands",
      },
      {
        Code: "AL",
        UrlCode: "albania",
        Name: "Albania",
      },
      {
        Code: "DZ",
        UrlCode: "algeria",
        Name: "Algeria",
      },
      {
        Code: "AS",
        UrlCode: "american-samoa",
        Name: "American Samoa",
      },
      {
        Code: "AD",
        UrlCode: "andorra",
        Name: "Andorra",
      },
      {
        Code: "AO",
        UrlCode: "angola",
        Name: "Angola",
      },
      {
        Code: "AI",
        UrlCode: "anguilla",
        Name: "Anguilla",
      },
      {
        Code: "AQ",
        UrlCode: "antarctica",
        Name: "Antarctica",
      },
      {
        Code: "AG",
        UrlCode: "antigua-and-barbuda",
        Name: "Antigua and Barbuda",
      },
      {
        Code: "AR",
        UrlCode: "argentina",
        Name: "Argentina",
      },
      {
        Code: "AM",
        UrlCode: "armenia",
        Name: "Armenia",
      },
      {
        Code: "AW",
        UrlCode: "aruba",
        Name: "Aruba",
      },
      {
        Code: "AU",
        UrlCode: "australia",
        Name: "Australia",
      },
      {
        Code: "AT",
        UrlCode: "austria",
        Name: "Austria",
      },
      {
        Code: "AZ",
        UrlCode: "azerbaijan",
        Name: "Azerbaijan",
      },
      {
        Code: "BS",
        UrlCode: "bahamas",
        Name: "Bahamas",
      },
      {
        Code: "BH",
        UrlCode: "bahrain",
        Name: "Bahrain",
      },
      {
        Code: "BD",
        UrlCode: "bangladesh",
        Name: "Bangladesh",
      },
      {
        Code: "BB",
        UrlCode: "barbados",
        Name: "Barbados",
      },
      {
        Code: "BY",
        UrlCode: "belarus",
        Name: "Belarus",
      },
      {
        Code: "BE",
        UrlCode: "belgium",
        Name: "Belgium",
      },
      {
        Code: "BZ",
        UrlCode: "belize",
        Name: "Belize",
      },
      {
        Code: "BJ",
        UrlCode: "benin",
        Name: "Benin",
      },
      {
        Code: "BM",
        UrlCode: "bermuda",
        Name: "Bermuda",
      },
      {
        Code: "BT",
        UrlCode: "bhutan",
        Name: "Bhutan",
      },
      {
        Code: "BO",
        UrlCode: "bolivia-plurinational-state-of",
        Name: "Bolivia",
      },
      {
        Code: "BQ",
        UrlCode: "bonaire-sint-eustatius-and-saba",
        Name: "Bonaire, Sint Eustatius and Saba",
      },
      {
        Code: "BA",
        UrlCode: "bosnia-and-herzegovina",
        Name: "Bosnia and Herzegovina",
      },
      {
        Code: "BW",
        UrlCode: "botswana",
        Name: "Botswana",
      },
      {
        Code: "BV",
        UrlCode: "bouvet-island",
        Name: "Bouvet Island",
      },
      {
        Code: "BR",
        UrlCode: "brazil",
        Name: "Brazil",
      },
      {
        Code: "IO",
        UrlCode: "british-indian-ocean-territory",
        Name: "British Indian Ocean Territory",
      },
      {
        Code: "BN",
        UrlCode: "brunei-darussalam",
        Name: "Brunei Darussalam",
      },
      {
        Code: "BG",
        UrlCode: "bulgaria",
        Name: "Bulgaria",
      },
      {
        Code: "BF",
        UrlCode: "burkina-faso",
        Name: "Burkina Faso",
      },
      {
        Code: "BI",
        UrlCode: "burundi",
        Name: "Burundi",
      },
      {
        Code: "CV",
        UrlCode: "cabo-verde",
        Name: "Cabo Verde",
      },
      {
        Code: "KH",
        UrlCode: "cambodia",
        Name: "Cambodia",
      },
      {
        Code: "CM",
        UrlCode: "cameroon",
        Name: "Cameroon",
      },
      {
        Code: "CA",
        UrlCode: "canada",
        Name: "Canada",
      },
      {
        Code: "KY",
        UrlCode: "cayman-islands",
        Name: "Cayman Islands",
      },
      {
        Code: "CF",
        UrlCode: "central-african-republic",
        Name: "Central African Republic",
      },
      {
        Code: "TD",
        UrlCode: "chad",
        Name: "Chad",
      },
      {
        Code: "CL",
        UrlCode: "chile",
        Name: "Chile",
      },
      {
        Code: "CN",
        UrlCode: "china",
        Name: "China",
      },
      {
        Code: "CX",
        UrlCode: "christmas-island",
        Name: "Christmas Island",
      },
      {
        Code: "CC",
        UrlCode: "cocos-keeling-islands",
        Name: "Cocos (Keeling) Islands",
      },
      {
        Code: "CO",
        UrlCode: "colombia",
        Name: "Colombia",
      },
      {
        Code: "KM",
        UrlCode: "comoros",
        Name: "Comoros",
      },
      {
        Code: "CG",
        UrlCode: "congo",
        Name: "Congo",
      },
      {
        Code: "CD",
        UrlCode: "congo-the-democratic-republic-of-the",
        Name: "Congo, the Democratic Republic of the",
      },
      {
        Code: "CK",
        UrlCode: "cook-islands",
        Name: "Cook Islands",
      },
      {
        Code: "CR",
        UrlCode: "costa-rica",
        Name: "Costa Rica",
      },
      {
        Code: "CI",
        UrlCode: "cte-divoire",
        Name: "Côte d'Ivoire",
      },
      {
        Code: "HR",
        UrlCode: "croatia",
        Name: "Croatia",
      },
      {
        Code: "CU",
        UrlCode: "cuba",
        Name: "Cuba",
      },
      {
        Code: "CW",
        UrlCode: "curaao",
        Name: "Curaçao",
      },
      {
        Code: "CY",
        UrlCode: "cyprus",
        Name: "Cyprus",
      },
      {
        Code: "CZ",
        UrlCode: "czech-republic",
        Name: "Czech Republic",
      },
      {
        Code: "DK",
        UrlCode: "denmark",
        Name: "Denmark",
      },
      {
        Code: "DJ",
        UrlCode: "djibouti",
        Name: "Djibouti",
      },
      {
        Code: "DM",
        UrlCode: "dominica",
        Name: "Dominica",
      },
      {
        Code: "DO",
        UrlCode: "dominican-republic",
        Name: "Dominican Republic",
      },
      {
        Code: "EC",
        UrlCode: "ecuador",
        Name: "Ecuador",
      },
      {
        Code: "EG",
        UrlCode: "egypt",
        Name: "Egypt",
      },
      {
        Code: "SV",
        UrlCode: "el-salvador",
        Name: "El Salvador",
      },
      {
        Code: "GQ",
        UrlCode: "equatorial-guinea",
        Name: "Equatorial Guinea",
      },
      {
        Code: "ER",
        UrlCode: "eritrea",
        Name: "Eritrea",
      },
      {
        Code: "EE",
        UrlCode: "estonia",
        Name: "Estonia",
      },
      {
        Code: "ET",
        UrlCode: "ethiopia",
        Name: "Ethiopia",
      },
      {
        Code: "FK",
        UrlCode: "falkland-islands-malvinas",
        Name: "Falkland Islands (Malvinas)",
      },
      {
        Code: "FO",
        UrlCode: "faroe-islands",
        Name: "Faroe Islands",
      },
      {
        Code: "FJ",
        UrlCode: "fiji",
        Name: "Fiji",
      },
      {
        Code: "FI",
        UrlCode: "finland",
        Name: "Finland",
      },
      {
        Code: "FR",
        UrlCode: "france",
        Name: "France",
      },
      {
        Code: "GF",
        UrlCode: "french-guiana",
        Name: "French Guiana",
      },
      {
        Code: "PF",
        UrlCode: "french-polynesia",
        Name: "French Polynesia",
      },
      {
        Code: "TF",
        UrlCode: "french-southern-territories",
        Name: "French Southern Territories",
      },
      {
        Code: "GA",
        UrlCode: "gabon",
        Name: "Gabon",
      },
      {
        Code: "GM",
        UrlCode: "gambia",
        Name: "Gambia",
      },
      {
        Code: "GE",
        UrlCode: "georgia",
        Name: "Georgia",
      },
      {
        Code: "DE",
        UrlCode: "germany",
        Name: "Germany",
      },
      {
        Code: "GH",
        UrlCode: "ghana",
        Name: "Ghana",
      },
      {
        Code: "GI",
        UrlCode: "gibraltar",
        Name: "Gibraltar",
      },
      {
        Code: "GR",
        UrlCode: "greece",
        Name: "Greece",
      },
      {
        Code: "GL",
        UrlCode: "greenland",
        Name: "Greenland",
      },
      {
        Code: "GD",
        UrlCode: "grenada",
        Name: "Grenada",
      },
      {
        Code: "GP",
        UrlCode: "guadeloupe",
        Name: "Guadeloupe",
      },
      {
        Code: "GU",
        UrlCode: "guam",
        Name: "Guam",
      },
      {
        Code: "GT",
        UrlCode: "guatemala",
        Name: "Guatemala",
      },
      {
        Code: "GG",
        UrlCode: "guernsey",
        Name: "Guernsey",
      },
      {
        Code: "GN",
        UrlCode: "guinea",
        Name: "Guinea",
      },
      {
        Code: "GW",
        UrlCode: "guinea-bissau",
        Name: "Guinea-Bissau",
      },
      {
        Code: "GY",
        UrlCode: "guyana",
        Name: "Guyana",
      },
      {
        Code: "HT",
        UrlCode: "haiti",
        Name: "Haiti",
      },
      {
        Code: "HM",
        UrlCode: "heard-island-and-mcdonald-islands",
        Name: "Heard Island and McDonald Islands",
      },
      {
        Code: "VA",
        UrlCode: "holy-see-vatican-city-state",
        Name: "Holy See (Vatican City State)",
      },
      {
        Code: "HN",
        UrlCode: "honduras",
        Name: "Honduras",
      },
      {
        Code: "HK",
        UrlCode: "hong-kong",
        Name: "Hong Kong",
      },
      {
        Code: "HU",
        UrlCode: "hungary",
        Name: "Hungary",
      },
      {
        Code: "IS",
        UrlCode: "iceland",
        Name: "Iceland",
      },
      {
        Code: "IN",
        UrlCode: "india",
        Name: "India",
      },
      {
        Code: "ID",
        UrlCode: "indonesia",
        Name: "Indonesia",
      },
      {
        Code: "IR",
        UrlCode: "iran-islamic-republic-of",
        Name: "Iran",
      },
      {
        Code: "IQ",
        UrlCode: "iraq",
        Name: "Iraq",
      },
      {
        Code: "IE",
        UrlCode: "ireland",
        Name: "Ireland",
      },
      {
        Code: "IM",
        UrlCode: "isle-of-man",
        Name: "Isle of Man",
      },
      {
        Code: "IL",
        UrlCode: "israel",
        Name: "Israel",
      },
      {
        Code: "IT",
        UrlCode: "italy",
        Name: "Italy",
      },
      {
        Code: "JM",
        UrlCode: "jamaica",
        Name: "Jamaica",
      },
      {
        Code: "JP",
        UrlCode: "japan",
        Name: "Japan",
      },
      {
        Code: "JE",
        UrlCode: "jersey",
        Name: "Jersey",
      },
      {
        Code: "JO",
        UrlCode: "jordan",
        Name: "Jordan",
      },
      {
        Code: "KZ",
        UrlCode: "kazakhstan",
        Name: "Kazakhstan",
      },
      {
        Code: "KE",
        UrlCode: "kenya",
        Name: "Kenya",
      },
      {
        Code: "KI",
        UrlCode: "kiribati",
        Name: "Kiribati",
      },
      {
        Code: "KP",
        UrlCode: "korea-democratic-peoples-republic-of",
        Name: "Korea, Democratic People's Republic of",
      },
      {
        Code: "KR",
        UrlCode: "korea-republic-of",
        Name: "Korea, Republic of",
      },
      {
        Code: "KW",
        UrlCode: "kuwait",
        Name: "Kuwait",
      },
      {
        Code: "KG",
        UrlCode: "kyrgyzstan",
        Name: "Kyrgyzstan",
      },
      {
        Code: "LA",
        UrlCode: "lao-peoples-democratic-republic",
        Name: "Lao People's Democratic Republic",
      },
      {
        Code: "LV",
        UrlCode: "latvia",
        Name: "Latvia",
      },
      {
        Code: "LB",
        UrlCode: "lebanon",
        Name: "Lebanon",
      },
      {
        Code: "LS",
        UrlCode: "lesotho",
        Name: "Lesotho",
      },
      {
        Code: "LR",
        UrlCode: "liberia",
        Name: "Liberia",
      },
      {
        Code: "LY",
        UrlCode: "libya",
        Name: "Libya",
      },
      {
        Code: "LI",
        UrlCode: "liechtenstein",
        Name: "Liechtenstein",
      },
      {
        Code: "LT",
        UrlCode: "lithuania",
        Name: "Lithuania",
      },
      {
        Code: "LU",
        UrlCode: "luxembourg",
        Name: "Luxembourg",
      },
      {
        Code: "MO",
        UrlCode: "macao",
        Name: "Macao",
      },
      {
        Code: "MK",
        UrlCode: "macedonia-the-former-yugoslav-republic-of",
        Name: "Macedonia (FYROM)",
      },
      {
        Code: "MG",
        UrlCode: "madagascar",
        Name: "Madagascar",
      },
      {
        Code: "MW",
        UrlCode: "malawi",
        Name: "Malawi",
      },
      {
        Code: "MY",
        UrlCode: "malaysia",
        Name: "Malaysia",
      },
      {
        Code: "MV",
        UrlCode: "maldives",
        Name: "Maldives",
      },
      {
        Code: "ML",
        UrlCode: "mali",
        Name: "Mali",
      },
      {
        Code: "MT",
        UrlCode: "malta",
        Name: "Malta",
      },
      {
        Code: "MH",
        UrlCode: "marshall-islands",
        Name: "Marshall Islands",
      },
      {
        Code: "MQ",
        UrlCode: "martinique",
        Name: "Martinique",
      },
      {
        Code: "MR",
        UrlCode: "mauritania",
        Name: "Mauritania",
      },
      {
        Code: "MU",
        UrlCode: "mauritius",
        Name: "Mauritius",
      },
      {
        Code: "YT",
        UrlCode: "mayotte",
        Name: "Mayotte",
      },
      {
        Code: "MX",
        UrlCode: "mexico",
        Name: "Mexico",
      },
      {
        Code: "FM",
        UrlCode: "micronesia-federated-states-of",
        Name: "Micronesia, Federated States of",
      },
      {
        Code: "MD",
        UrlCode: "moldova-republic-of",
        Name: "Moldova",
      },
      {
        Code: "MC",
        UrlCode: "monaco",
        Name: "Monaco",
      },
      {
        Code: "MN",
        UrlCode: "mongolia",
        Name: "Mongolia",
      },
      {
        Code: "ME",
        UrlCode: "montenegro",
        Name: "Montenegro",
      },
      {
        Code: "MS",
        UrlCode: "montserrat",
        Name: "Montserrat",
      },
      {
        Code: "MA",
        UrlCode: "morocco",
        Name: "Morocco",
      },
      {
        Code: "MZ",
        UrlCode: "mozambique",
        Name: "Mozambique",
      },
      {
        Code: "MM",
        UrlCode: "myanmar",
        Name: "Myanmar",
      },
      {
        Code: "NA",
        UrlCode: "namibia",
        Name: "Namibia",
      },
      {
        Code: "NR",
        UrlCode: "nauru",
        Name: "Nauru",
      },
      {
        Code: "NP",
        UrlCode: "nepal",
        Name: "Nepal",
      },
      {
        Code: "NL",
        UrlCode: "netherlands",
        Name: "Netherlands",
      },
      {
        Code: "AN",
        UrlCode: "netherlands-antilles",
        Name: "Netherlands Antilles",
      },
      {
        Code: "NC",
        UrlCode: "new-caledonia",
        Name: "New Caledonia",
      },
      {
        Code: "NZ",
        UrlCode: "new-zealand",
        Name: "New Zealand",
      },
      {
        Code: "NI",
        UrlCode: "nicaragua",
        Name: "Nicaragua",
      },
      {
        Code: "NE",
        UrlCode: "niger",
        Name: "Niger",
      },
      {
        Code: "NG",
        UrlCode: "nigeria",
        Name: "Nigeria",
      },
      {
        Code: "NU",
        UrlCode: "niue",
        Name: "Niue",
      },
      {
        Code: "AP",
        UrlCode: "non-spec-asia-pas-location",
        Name: "Non-spec Asia Pas Location",
      },
      {
        Code: "NF",
        UrlCode: "norfolk-island",
        Name: "Norfolk Island",
      },
      {
        Code: "MP",
        UrlCode: "northern-mariana-islands",
        Name: "Northern Mariana Islands",
      },
      {
        Code: "NO",
        UrlCode: "norway",
        Name: "Norway",
      },
      {
        Code: "OM",
        UrlCode: "oman",
        Name: "Oman",
      },
      {
        Code: "PK",
        UrlCode: "pakistan",
        Name: "Pakistan",
      },
      {
        Code: "PW",
        UrlCode: "palau",
        Name: "Palau",
      },
      {
        Code: "PS",
        UrlCode: "palestine-state-of",
        Name: "Palestine",
      },
      {
        Code: "PA",
        UrlCode: "panama",
        Name: "Panama",
      },
      {
        Code: "PG",
        UrlCode: "papua-new-guinea",
        Name: "Papua New Guinea",
      },
      {
        Code: "PY",
        UrlCode: "paraguay",
        Name: "Paraguay",
      },
      {
        Code: "PE",
        UrlCode: "peru",
        Name: "Peru",
      },
      {
        Code: "PH",
        UrlCode: "philippines",
        Name: "Philippines",
      },
      {
        Code: "PN",
        UrlCode: "pitcairn",
        Name: "Pitcairn",
      },
      {
        Code: "PL",
        UrlCode: "poland",
        Name: "Poland",
      },
      {
        Code: "PT",
        UrlCode: "portugal",
        Name: "Portugal",
      },
      {
        Code: "PR",
        UrlCode: "puerto-rico",
        Name: "Puerto Rico",
      },
      {
        Code: "QA",
        UrlCode: "qatar",
        Name: "Qatar",
      },
      {
        Code: "RE",
        UrlCode: "runion",
        Name: "Réunion",
      },
      {
        Code: "RO",
        UrlCode: "romania",
        Name: "Romania",
      },
      {
        Code: "RU",
        UrlCode: "russian-federation",
        Name: "Russia",
      },
      {
        Code: "RW",
        UrlCode: "rwanda",
        Name: "Rwanda",
      },
      {
        Code: "BL",
        UrlCode: "saint-barthlemy",
        Name: "Saint Barthélemy",
      },
      {
        Code: "SH",
        UrlCode: "saint-helena-ascension-and-tristan-da-cunha",
        Name: "Saint Helena, Ascension and Tristan da Cunha",
      },
      {
        Code: "KN",
        UrlCode: "saint-kitts-and-nevis",
        Name: "Saint Kitts and Nevis",
      },
      {
        Code: "LC",
        UrlCode: "saint-lucia",
        Name: "Saint Lucia",
      },
      {
        Code: "MF",
        UrlCode: "saint-martin-french-part",
        Name: "Saint Martin (French part)",
      },
      {
        Code: "PM",
        UrlCode: "saint-pierre-and-miquelon",
        Name: "Saint Pierre and Miquelon",
      },
      {
        Code: "VC",
        UrlCode: "saint-vincent-and-the-grenadines",
        Name: "Saint Vincent and the Grenadines",
      },
      {
        Code: "WS",
        UrlCode: "samoa",
        Name: "Samoa",
      },
      {
        Code: "SM",
        UrlCode: "san-marino",
        Name: "San Marino",
      },
      {
        Code: "ST",
        UrlCode: "sao-tome-and-principe",
        Name: "Sao Tome and Principe",
      },
      {
        Code: "SA",
        UrlCode: "saudi-arabia",
        Name: "Saudi Arabia",
      },
      {
        Code: "SN",
        UrlCode: "senegal",
        Name: "Senegal",
      },
      {
        Code: "RS",
        UrlCode: "serbia",
        Name: "Serbia",
      },
      {
        Code: "CS",
        UrlCode: "serbia-and-montenegro",
        Name: "SERBIA AND MONTENEGRO",
      },
      {
        Code: "SC",
        UrlCode: "seychelles",
        Name: "Seychelles",
      },
      {
        Code: "SL",
        UrlCode: "sierra-leone",
        Name: "Sierra Leone",
      },
      {
        Code: "SG",
        UrlCode: "singapore",
        Name: "Singapore",
      },
      {
        Code: "SX",
        UrlCode: "sint-maarten-dutch-part",
        Name: "Sint Maarten (Dutch part)",
      },
      {
        Code: "SK",
        UrlCode: "slovakia",
        Name: "Slovakia",
      },
      {
        Code: "SI",
        UrlCode: "slovenia",
        Name: "Slovenia",
      },
      {
        Code: "SB",
        UrlCode: "solomon-islands",
        Name: "Solomon Islands",
      },
      {
        Code: "SO",
        UrlCode: "somalia",
        Name: "Somalia",
      },
      {
        Code: "ZA",
        UrlCode: "south-africa",
        Name: "South Africa",
      },
      {
        Code: "GS",
        UrlCode: "south-georgia-and-the-south-sandwich-islands",
        Name: "South Georgia and the South Sandwich Islands",
      },
      {
        Code: "SS",
        UrlCode: "south-sudan",
        Name: "South Sudan",
      },
      {
        Code: "ES",
        UrlCode: "spain",
        Name: "Spain",
      },
      {
        Code: "LK",
        UrlCode: "sri-lanka",
        Name: "Sri Lanka",
      },
      {
        Code: "SD",
        UrlCode: "sudan",
        Name: "Sudan",
      },
      {
        Code: "SR",
        UrlCode: "suriname",
        Name: "Suriname",
      },
      {
        Code: "SJ",
        UrlCode: "svalbard-and-jan-mayen",
        Name: "Svalbard and Jan Mayen",
      },
      {
        Code: "SZ",
        UrlCode: "swaziland",
        Name: "Swaziland",
      },
      {
        Code: "SE",
        UrlCode: "sweden",
        Name: "Sweden",
      },
      {
        Code: "CH",
        UrlCode: "switzerland",
        Name: "Switzerland",
      },
      {
        Code: "SY",
        UrlCode: "syrian-arab-republic",
        Name: "Syrian Arab Republic",
      },
      {
        Code: "TW",
        UrlCode: "taiwan",
        Name: "Taiwan",
      },
      {
        Code: "TJ",
        UrlCode: "tajikistan",
        Name: "Tajikistan",
      },
      {
        Code: "TZ",
        UrlCode: "tanzania-united-republic-of",
        Name: "Tanzania, United Republic of",
      },
      {
        Code: "TH",
        UrlCode: "thailand",
        Name: "Thailand",
      },
      {
        Code: "TL",
        UrlCode: "timor-leste",
        Name: "Timor-Leste",
      },
      {
        Code: "TG",
        UrlCode: "togo",
        Name: "Togo",
      },
      {
        Code: "TK",
        UrlCode: "tokelau",
        Name: "Tokelau",
      },
      {
        Code: "TO",
        UrlCode: "tonga",
        Name: "Tonga",
      },
      {
        Code: "TT",
        UrlCode: "trinidad-and-tobago",
        Name: "Trinidad and Tobago",
      },
      {
        Code: "TN",
        UrlCode: "tunisia",
        Name: "Tunisia",
      },
      {
        Code: "TR",
        UrlCode: "turkey",
        Name: "Turkey",
      },
      {
        Code: "TM",
        UrlCode: "turkmenistan",
        Name: "Turkmenistan",
      },
      {
        Code: "TC",
        UrlCode: "turks-and-caicos-islands",
        Name: "Turks and Caicos Islands",
      },
      {
        Code: "TV",
        UrlCode: "tuvalu",
        Name: "Tuvalu",
      },
      {
        Code: "UG",
        UrlCode: "uganda",
        Name: "Uganda",
      },
      {
        Code: "UA",
        UrlCode: "ukraine",
        Name: "Ukraine",
      },
      {
        Code: "AE",
        UrlCode: "united-arab-emirates",
        Name: "United Arab Emirates",
      },
      {
        Code: "GB",
        UrlCode: "united-kingdom",
        Name: "United Kingdom",
      },
      {
        Code: "US",
        UrlCode: "united-states",
        Name: "United States",
      },
      {
        Code: "UM",
        UrlCode: "united-states-minor-outlying-islands",
        Name: "United States Minor Outlying Islands",
      },
      {
        Code: "UY",
        UrlCode: "uruguay",
        Name: "Uruguay",
      },
      {
        Code: "UZ",
        UrlCode: "uzbekistan",
        Name: "Uzbekistan",
      },
      {
        Code: "VU",
        UrlCode: "vanuatu",
        Name: "Vanuatu",
      },
      {
        Code: "VE",
        UrlCode: "venezuela-bolivarian-republic-of",
        Name: "Venezuela",
      },
      {
        Code: "VN",
        UrlCode: "vietnam",
        Name: "Vietnam",
      },
      {
        Code: "VG",
        UrlCode: "virgin-islands-british",
        Name: "Virgin Islands, British",
      },
      {
        Code: "VI",
        UrlCode: "virgin-islands-us",
        Name: "Virgin Islands, U.S.",
      },
      {
        Code: "WF",
        UrlCode: "wallis-and-futuna",
        Name: "Wallis and Futuna",
      },
      {
        Code: "EH",
        UrlCode: "western-sahara",
        Name: "Western Sahara",
      },
      {
        Code: "YE",
        UrlCode: "yemen",
        Name: "Yemen",
      },
      {
        Code: "ZM",
        UrlCode: "zambia",
        Name: "Zambia",
      },
      {
        Code: "ZW",
        UrlCode: "zimbabwe",
        Name: "Zimbabwe",
      },
    ],
    Competitors: {
      TopSimilarityCompetitors: [],
    },
    Notification: {
      Content: null,
    },
    TopKeywords: [
      {
        Name: "다음",
        EstimatedValue: 1422812,
        Volume: 808310,
        Cpc: 0.91046775,
      },
      {
        Name: "daum",
        EstimatedValue: 284384,
        Volume: 341720,
        Cpc: 1.1179345,
      },
      {
        Name: "potplayer",
        EstimatedValue: 194979,
        Volume: 296690,
        Cpc: 0.26458465625,
      },
      {
        Name: "다음카페",
        EstimatedValue: 189749,
        Volume: 77480,
        Cpc: null,
      },
      {
        Name: "ekdma",
        EstimatedValue: 134196,
        Volume: 31190,
        Cpc: 0.91046775,
      },
    ],
    SnapshotDate: "2024-09-01T00:00:00+00:00",
  },
};

// Type Check
const coupang: ISimilarweb.IGetDomainInfoOutput = {
  description: "OK",
  status: 200,
  data: {
    Version: 1,
    SiteName: "coupang.com",
    Description: "쿠팡은 로켓배송",
    TopCountryShares: [
      {
        Country: 410,
        CountryCode: "KR",
        Value: 0.9718434719275945,
      },
      {
        Country: 156,
        CountryCode: "CN",
        Value: 0.009969622173442008,
      },
      {
        Country: 158,
        CountryCode: "TW",
        Value: 0.007683547876865711,
      },
      {
        Country: 840,
        CountryCode: "US",
        Value: 0.0036063790713626617,
      },
      {
        Country: 392,
        CountryCode: "JP",
        Value: 0.0010060353532767453,
      },
    ],
    Title: "쿠팡!",
    Engagments: {
      BounceRate: "0.18312804578756434",
      Month: "9",
      Year: "2024",
      PagePerVisit: "6.025281059564887",
      Visits: "247346897",
      TimeOnSite: "187.52865801557698",
    },
    EstimatedMonthlyVisits: {
      "2024-07-01": 266286048,
      "2024-08-01": 264153207,
      "2024-09-01": 247346897,
    },
    GlobalRank: {
      Rank: 117,
    },
    CountryRank: {
      Country: 410,
      CountryCode: "KR",
      Rank: 6,
    },
    CategoryRank: {
      Rank: "1",
      Category: "E-commerce_and_Shopping/E-commerce_and_Shopping",
    },
    GlobalCategoryRank: null,
    IsSmall: false,
    Policy: 0,
    TrafficSources: {
      Social: 0.010708668145995897,
      "Paid Referrals": 0.032898203013600455,
      Mail: 0.003630950072540809,
      Referrals: 0.054761120779510924,
      Search: 0.2524270307752883,
      Direct: 0.6455740272053647,
    },
    Category: "e-commerce_and_shopping/e-commerce_and_shopping",
    LargeScreenshot:
      "https://site-images.similarcdn.com/image?url=coupang.com&t=1&s=1&h=daf45cab5cfceb5a268c282f07a591ff31e2ba5e72250d00f5529a51f70e554f",
    IsDataFromGa: false,
    Countries: [
      {
        Code: "AF",
        UrlCode: "afghanistan",
        Name: "Afghanistan",
      },
      {
        Code: "AX",
        UrlCode: "land-islands",
        Name: "Åland Islands",
      },
      {
        Code: "AL",
        UrlCode: "albania",
        Name: "Albania",
      },
      {
        Code: "DZ",
        UrlCode: "algeria",
        Name: "Algeria",
      },
      {
        Code: "AS",
        UrlCode: "american-samoa",
        Name: "American Samoa",
      },
      {
        Code: "AD",
        UrlCode: "andorra",
        Name: "Andorra",
      },
      {
        Code: "AO",
        UrlCode: "angola",
        Name: "Angola",
      },
      {
        Code: "AI",
        UrlCode: "anguilla",
        Name: "Anguilla",
      },
      {
        Code: "AQ",
        UrlCode: "antarctica",
        Name: "Antarctica",
      },
      {
        Code: "AG",
        UrlCode: "antigua-and-barbuda",
        Name: "Antigua and Barbuda",
      },
      {
        Code: "AR",
        UrlCode: "argentina",
        Name: "Argentina",
      },
      {
        Code: "AM",
        UrlCode: "armenia",
        Name: "Armenia",
      },
      {
        Code: "AW",
        UrlCode: "aruba",
        Name: "Aruba",
      },
      {
        Code: "AU",
        UrlCode: "australia",
        Name: "Australia",
      },
      {
        Code: "AT",
        UrlCode: "austria",
        Name: "Austria",
      },
      {
        Code: "AZ",
        UrlCode: "azerbaijan",
        Name: "Azerbaijan",
      },
      {
        Code: "BS",
        UrlCode: "bahamas",
        Name: "Bahamas",
      },
      {
        Code: "BH",
        UrlCode: "bahrain",
        Name: "Bahrain",
      },
      {
        Code: "BD",
        UrlCode: "bangladesh",
        Name: "Bangladesh",
      },
      {
        Code: "BB",
        UrlCode: "barbados",
        Name: "Barbados",
      },
      {
        Code: "BY",
        UrlCode: "belarus",
        Name: "Belarus",
      },
      {
        Code: "BE",
        UrlCode: "belgium",
        Name: "Belgium",
      },
      {
        Code: "BZ",
        UrlCode: "belize",
        Name: "Belize",
      },
      {
        Code: "BJ",
        UrlCode: "benin",
        Name: "Benin",
      },
      {
        Code: "BM",
        UrlCode: "bermuda",
        Name: "Bermuda",
      },
      {
        Code: "BT",
        UrlCode: "bhutan",
        Name: "Bhutan",
      },
      {
        Code: "BO",
        UrlCode: "bolivia-plurinational-state-of",
        Name: "Bolivia",
      },
      {
        Code: "BQ",
        UrlCode: "bonaire-sint-eustatius-and-saba",
        Name: "Bonaire, Sint Eustatius and Saba",
      },
      {
        Code: "BA",
        UrlCode: "bosnia-and-herzegovina",
        Name: "Bosnia and Herzegovina",
      },
      {
        Code: "BW",
        UrlCode: "botswana",
        Name: "Botswana",
      },
      {
        Code: "BV",
        UrlCode: "bouvet-island",
        Name: "Bouvet Island",
      },
      {
        Code: "BR",
        UrlCode: "brazil",
        Name: "Brazil",
      },
      {
        Code: "IO",
        UrlCode: "british-indian-ocean-territory",
        Name: "British Indian Ocean Territory",
      },
      {
        Code: "BN",
        UrlCode: "brunei-darussalam",
        Name: "Brunei Darussalam",
      },
      {
        Code: "BG",
        UrlCode: "bulgaria",
        Name: "Bulgaria",
      },
      {
        Code: "BF",
        UrlCode: "burkina-faso",
        Name: "Burkina Faso",
      },
      {
        Code: "BI",
        UrlCode: "burundi",
        Name: "Burundi",
      },
      {
        Code: "CV",
        UrlCode: "cabo-verde",
        Name: "Cabo Verde",
      },
      {
        Code: "KH",
        UrlCode: "cambodia",
        Name: "Cambodia",
      },
      {
        Code: "CM",
        UrlCode: "cameroon",
        Name: "Cameroon",
      },
      {
        Code: "CA",
        UrlCode: "canada",
        Name: "Canada",
      },
      {
        Code: "KY",
        UrlCode: "cayman-islands",
        Name: "Cayman Islands",
      },
      {
        Code: "CF",
        UrlCode: "central-african-republic",
        Name: "Central African Republic",
      },
      {
        Code: "TD",
        UrlCode: "chad",
        Name: "Chad",
      },
      {
        Code: "CL",
        UrlCode: "chile",
        Name: "Chile",
      },
      {
        Code: "CN",
        UrlCode: "china",
        Name: "China",
      },
      {
        Code: "CX",
        UrlCode: "christmas-island",
        Name: "Christmas Island",
      },
      {
        Code: "CC",
        UrlCode: "cocos-keeling-islands",
        Name: "Cocos (Keeling) Islands",
      },
      {
        Code: "CO",
        UrlCode: "colombia",
        Name: "Colombia",
      },
      {
        Code: "KM",
        UrlCode: "comoros",
        Name: "Comoros",
      },
      {
        Code: "CG",
        UrlCode: "congo",
        Name: "Congo",
      },
      {
        Code: "CD",
        UrlCode: "congo-the-democratic-republic-of-the",
        Name: "Congo, the Democratic Republic of the",
      },
      {
        Code: "CK",
        UrlCode: "cook-islands",
        Name: "Cook Islands",
      },
      {
        Code: "CR",
        UrlCode: "costa-rica",
        Name: "Costa Rica",
      },
      {
        Code: "CI",
        UrlCode: "cte-divoire",
        Name: "Côte d'Ivoire",
      },
      {
        Code: "HR",
        UrlCode: "croatia",
        Name: "Croatia",
      },
      {
        Code: "CU",
        UrlCode: "cuba",
        Name: "Cuba",
      },
      {
        Code: "CW",
        UrlCode: "curaao",
        Name: "Curaçao",
      },
      {
        Code: "CY",
        UrlCode: "cyprus",
        Name: "Cyprus",
      },
      {
        Code: "CZ",
        UrlCode: "czech-republic",
        Name: "Czech Republic",
      },
      {
        Code: "DK",
        UrlCode: "denmark",
        Name: "Denmark",
      },
      {
        Code: "DJ",
        UrlCode: "djibouti",
        Name: "Djibouti",
      },
      {
        Code: "DM",
        UrlCode: "dominica",
        Name: "Dominica",
      },
      {
        Code: "DO",
        UrlCode: "dominican-republic",
        Name: "Dominican Republic",
      },
      {
        Code: "EC",
        UrlCode: "ecuador",
        Name: "Ecuador",
      },
      {
        Code: "EG",
        UrlCode: "egypt",
        Name: "Egypt",
      },
      {
        Code: "SV",
        UrlCode: "el-salvador",
        Name: "El Salvador",
      },
      {
        Code: "GQ",
        UrlCode: "equatorial-guinea",
        Name: "Equatorial Guinea",
      },
      {
        Code: "ER",
        UrlCode: "eritrea",
        Name: "Eritrea",
      },
      {
        Code: "EE",
        UrlCode: "estonia",
        Name: "Estonia",
      },
      {
        Code: "ET",
        UrlCode: "ethiopia",
        Name: "Ethiopia",
      },
      {
        Code: "FK",
        UrlCode: "falkland-islands-malvinas",
        Name: "Falkland Islands (Malvinas)",
      },
      {
        Code: "FO",
        UrlCode: "faroe-islands",
        Name: "Faroe Islands",
      },
      {
        Code: "FJ",
        UrlCode: "fiji",
        Name: "Fiji",
      },
      {
        Code: "FI",
        UrlCode: "finland",
        Name: "Finland",
      },
      {
        Code: "FR",
        UrlCode: "france",
        Name: "France",
      },
      {
        Code: "GF",
        UrlCode: "french-guiana",
        Name: "French Guiana",
      },
      {
        Code: "PF",
        UrlCode: "french-polynesia",
        Name: "French Polynesia",
      },
      {
        Code: "TF",
        UrlCode: "french-southern-territories",
        Name: "French Southern Territories",
      },
      {
        Code: "GA",
        UrlCode: "gabon",
        Name: "Gabon",
      },
      {
        Code: "GM",
        UrlCode: "gambia",
        Name: "Gambia",
      },
      {
        Code: "GE",
        UrlCode: "georgia",
        Name: "Georgia",
      },
      {
        Code: "DE",
        UrlCode: "germany",
        Name: "Germany",
      },
      {
        Code: "GH",
        UrlCode: "ghana",
        Name: "Ghana",
      },
      {
        Code: "GI",
        UrlCode: "gibraltar",
        Name: "Gibraltar",
      },
      {
        Code: "GR",
        UrlCode: "greece",
        Name: "Greece",
      },
      {
        Code: "GL",
        UrlCode: "greenland",
        Name: "Greenland",
      },
      {
        Code: "GD",
        UrlCode: "grenada",
        Name: "Grenada",
      },
      {
        Code: "GP",
        UrlCode: "guadeloupe",
        Name: "Guadeloupe",
      },
      {
        Code: "GU",
        UrlCode: "guam",
        Name: "Guam",
      },
      {
        Code: "GT",
        UrlCode: "guatemala",
        Name: "Guatemala",
      },
      {
        Code: "GG",
        UrlCode: "guernsey",
        Name: "Guernsey",
      },
      {
        Code: "GN",
        UrlCode: "guinea",
        Name: "Guinea",
      },
      {
        Code: "GW",
        UrlCode: "guinea-bissau",
        Name: "Guinea-Bissau",
      },
      {
        Code: "GY",
        UrlCode: "guyana",
        Name: "Guyana",
      },
      {
        Code: "HT",
        UrlCode: "haiti",
        Name: "Haiti",
      },
      {
        Code: "HM",
        UrlCode: "heard-island-and-mcdonald-islands",
        Name: "Heard Island and McDonald Islands",
      },
      {
        Code: "VA",
        UrlCode: "holy-see-vatican-city-state",
        Name: "Holy See (Vatican City State)",
      },
      {
        Code: "HN",
        UrlCode: "honduras",
        Name: "Honduras",
      },
      {
        Code: "HK",
        UrlCode: "hong-kong",
        Name: "Hong Kong",
      },
      {
        Code: "HU",
        UrlCode: "hungary",
        Name: "Hungary",
      },
      {
        Code: "IS",
        UrlCode: "iceland",
        Name: "Iceland",
      },
      {
        Code: "IN",
        UrlCode: "india",
        Name: "India",
      },
      {
        Code: "ID",
        UrlCode: "indonesia",
        Name: "Indonesia",
      },
      {
        Code: "IR",
        UrlCode: "iran-islamic-republic-of",
        Name: "Iran",
      },
      {
        Code: "IQ",
        UrlCode: "iraq",
        Name: "Iraq",
      },
      {
        Code: "IE",
        UrlCode: "ireland",
        Name: "Ireland",
      },
      {
        Code: "IM",
        UrlCode: "isle-of-man",
        Name: "Isle of Man",
      },
      {
        Code: "IL",
        UrlCode: "israel",
        Name: "Israel",
      },
      {
        Code: "IT",
        UrlCode: "italy",
        Name: "Italy",
      },
      {
        Code: "JM",
        UrlCode: "jamaica",
        Name: "Jamaica",
      },
      {
        Code: "JP",
        UrlCode: "japan",
        Name: "Japan",
      },
      {
        Code: "JE",
        UrlCode: "jersey",
        Name: "Jersey",
      },
      {
        Code: "JO",
        UrlCode: "jordan",
        Name: "Jordan",
      },
      {
        Code: "KZ",
        UrlCode: "kazakhstan",
        Name: "Kazakhstan",
      },
      {
        Code: "KE",
        UrlCode: "kenya",
        Name: "Kenya",
      },
      {
        Code: "KI",
        UrlCode: "kiribati",
        Name: "Kiribati",
      },
      {
        Code: "KP",
        UrlCode: "korea-democratic-peoples-republic-of",
        Name: "Korea, Democratic People's Republic of",
      },
      {
        Code: "KR",
        UrlCode: "korea-republic-of",
        Name: "Korea, Republic of",
      },
      {
        Code: "KW",
        UrlCode: "kuwait",
        Name: "Kuwait",
      },
      {
        Code: "KG",
        UrlCode: "kyrgyzstan",
        Name: "Kyrgyzstan",
      },
      {
        Code: "LA",
        UrlCode: "lao-peoples-democratic-republic",
        Name: "Lao People's Democratic Republic",
      },
      {
        Code: "LV",
        UrlCode: "latvia",
        Name: "Latvia",
      },
      {
        Code: "LB",
        UrlCode: "lebanon",
        Name: "Lebanon",
      },
      {
        Code: "LS",
        UrlCode: "lesotho",
        Name: "Lesotho",
      },
      {
        Code: "LR",
        UrlCode: "liberia",
        Name: "Liberia",
      },
      {
        Code: "LY",
        UrlCode: "libya",
        Name: "Libya",
      },
      {
        Code: "LI",
        UrlCode: "liechtenstein",
        Name: "Liechtenstein",
      },
      {
        Code: "LT",
        UrlCode: "lithuania",
        Name: "Lithuania",
      },
      {
        Code: "LU",
        UrlCode: "luxembourg",
        Name: "Luxembourg",
      },
      {
        Code: "MO",
        UrlCode: "macao",
        Name: "Macao",
      },
      {
        Code: "MK",
        UrlCode: "macedonia-the-former-yugoslav-republic-of",
        Name: "Macedonia (FYROM)",
      },
      {
        Code: "MG",
        UrlCode: "madagascar",
        Name: "Madagascar",
      },
      {
        Code: "MW",
        UrlCode: "malawi",
        Name: "Malawi",
      },
      {
        Code: "MY",
        UrlCode: "malaysia",
        Name: "Malaysia",
      },
      {
        Code: "MV",
        UrlCode: "maldives",
        Name: "Maldives",
      },
      {
        Code: "ML",
        UrlCode: "mali",
        Name: "Mali",
      },
      {
        Code: "MT",
        UrlCode: "malta",
        Name: "Malta",
      },
      {
        Code: "MH",
        UrlCode: "marshall-islands",
        Name: "Marshall Islands",
      },
      {
        Code: "MQ",
        UrlCode: "martinique",
        Name: "Martinique",
      },
      {
        Code: "MR",
        UrlCode: "mauritania",
        Name: "Mauritania",
      },
      {
        Code: "MU",
        UrlCode: "mauritius",
        Name: "Mauritius",
      },
      {
        Code: "YT",
        UrlCode: "mayotte",
        Name: "Mayotte",
      },
      {
        Code: "MX",
        UrlCode: "mexico",
        Name: "Mexico",
      },
      {
        Code: "FM",
        UrlCode: "micronesia-federated-states-of",
        Name: "Micronesia, Federated States of",
      },
      {
        Code: "MD",
        UrlCode: "moldova-republic-of",
        Name: "Moldova",
      },
      {
        Code: "MC",
        UrlCode: "monaco",
        Name: "Monaco",
      },
      {
        Code: "MN",
        UrlCode: "mongolia",
        Name: "Mongolia",
      },
      {
        Code: "ME",
        UrlCode: "montenegro",
        Name: "Montenegro",
      },
      {
        Code: "MS",
        UrlCode: "montserrat",
        Name: "Montserrat",
      },
      {
        Code: "MA",
        UrlCode: "morocco",
        Name: "Morocco",
      },
      {
        Code: "MZ",
        UrlCode: "mozambique",
        Name: "Mozambique",
      },
      {
        Code: "MM",
        UrlCode: "myanmar",
        Name: "Myanmar",
      },
      {
        Code: "NA",
        UrlCode: "namibia",
        Name: "Namibia",
      },
      {
        Code: "NR",
        UrlCode: "nauru",
        Name: "Nauru",
      },
      {
        Code: "NP",
        UrlCode: "nepal",
        Name: "Nepal",
      },
      {
        Code: "NL",
        UrlCode: "netherlands",
        Name: "Netherlands",
      },
      {
        Code: "AN",
        UrlCode: "netherlands-antilles",
        Name: "Netherlands Antilles",
      },
      {
        Code: "NC",
        UrlCode: "new-caledonia",
        Name: "New Caledonia",
      },
      {
        Code: "NZ",
        UrlCode: "new-zealand",
        Name: "New Zealand",
      },
      {
        Code: "NI",
        UrlCode: "nicaragua",
        Name: "Nicaragua",
      },
      {
        Code: "NE",
        UrlCode: "niger",
        Name: "Niger",
      },
      {
        Code: "NG",
        UrlCode: "nigeria",
        Name: "Nigeria",
      },
      {
        Code: "NU",
        UrlCode: "niue",
        Name: "Niue",
      },
      {
        Code: "AP",
        UrlCode: "non-spec-asia-pas-location",
        Name: "Non-spec Asia Pas Location",
      },
      {
        Code: "NF",
        UrlCode: "norfolk-island",
        Name: "Norfolk Island",
      },
      {
        Code: "MP",
        UrlCode: "northern-mariana-islands",
        Name: "Northern Mariana Islands",
      },
      {
        Code: "NO",
        UrlCode: "norway",
        Name: "Norway",
      },
      {
        Code: "OM",
        UrlCode: "oman",
        Name: "Oman",
      },
      {
        Code: "PK",
        UrlCode: "pakistan",
        Name: "Pakistan",
      },
      {
        Code: "PW",
        UrlCode: "palau",
        Name: "Palau",
      },
      {
        Code: "PS",
        UrlCode: "palestine-state-of",
        Name: "Palestine",
      },
      {
        Code: "PA",
        UrlCode: "panama",
        Name: "Panama",
      },
      {
        Code: "PG",
        UrlCode: "papua-new-guinea",
        Name: "Papua New Guinea",
      },
      {
        Code: "PY",
        UrlCode: "paraguay",
        Name: "Paraguay",
      },
      {
        Code: "PE",
        UrlCode: "peru",
        Name: "Peru",
      },
      {
        Code: "PH",
        UrlCode: "philippines",
        Name: "Philippines",
      },
      {
        Code: "PN",
        UrlCode: "pitcairn",
        Name: "Pitcairn",
      },
      {
        Code: "PL",
        UrlCode: "poland",
        Name: "Poland",
      },
      {
        Code: "PT",
        UrlCode: "portugal",
        Name: "Portugal",
      },
      {
        Code: "PR",
        UrlCode: "puerto-rico",
        Name: "Puerto Rico",
      },
      {
        Code: "QA",
        UrlCode: "qatar",
        Name: "Qatar",
      },
      {
        Code: "RE",
        UrlCode: "runion",
        Name: "Réunion",
      },
      {
        Code: "RO",
        UrlCode: "romania",
        Name: "Romania",
      },
      {
        Code: "RU",
        UrlCode: "russian-federation",
        Name: "Russia",
      },
      {
        Code: "RW",
        UrlCode: "rwanda",
        Name: "Rwanda",
      },
      {
        Code: "BL",
        UrlCode: "saint-barthlemy",
        Name: "Saint Barthélemy",
      },
      {
        Code: "SH",
        UrlCode: "saint-helena-ascension-and-tristan-da-cunha",
        Name: "Saint Helena, Ascension and Tristan da Cunha",
      },
      {
        Code: "KN",
        UrlCode: "saint-kitts-and-nevis",
        Name: "Saint Kitts and Nevis",
      },
      {
        Code: "LC",
        UrlCode: "saint-lucia",
        Name: "Saint Lucia",
      },
      {
        Code: "MF",
        UrlCode: "saint-martin-french-part",
        Name: "Saint Martin (French part)",
      },
      {
        Code: "PM",
        UrlCode: "saint-pierre-and-miquelon",
        Name: "Saint Pierre and Miquelon",
      },
      {
        Code: "VC",
        UrlCode: "saint-vincent-and-the-grenadines",
        Name: "Saint Vincent and the Grenadines",
      },
      {
        Code: "WS",
        UrlCode: "samoa",
        Name: "Samoa",
      },
      {
        Code: "SM",
        UrlCode: "san-marino",
        Name: "San Marino",
      },
      {
        Code: "ST",
        UrlCode: "sao-tome-and-principe",
        Name: "Sao Tome and Principe",
      },
      {
        Code: "SA",
        UrlCode: "saudi-arabia",
        Name: "Saudi Arabia",
      },
      {
        Code: "SN",
        UrlCode: "senegal",
        Name: "Senegal",
      },
      {
        Code: "RS",
        UrlCode: "serbia",
        Name: "Serbia",
      },
      {
        Code: "CS",
        UrlCode: "serbia-and-montenegro",
        Name: "SERBIA AND MONTENEGRO",
      },
      {
        Code: "SC",
        UrlCode: "seychelles",
        Name: "Seychelles",
      },
      {
        Code: "SL",
        UrlCode: "sierra-leone",
        Name: "Sierra Leone",
      },
      {
        Code: "SG",
        UrlCode: "singapore",
        Name: "Singapore",
      },
      {
        Code: "SX",
        UrlCode: "sint-maarten-dutch-part",
        Name: "Sint Maarten (Dutch part)",
      },
      {
        Code: "SK",
        UrlCode: "slovakia",
        Name: "Slovakia",
      },
      {
        Code: "SI",
        UrlCode: "slovenia",
        Name: "Slovenia",
      },
      {
        Code: "SB",
        UrlCode: "solomon-islands",
        Name: "Solomon Islands",
      },
      {
        Code: "SO",
        UrlCode: "somalia",
        Name: "Somalia",
      },
      {
        Code: "ZA",
        UrlCode: "south-africa",
        Name: "South Africa",
      },
      {
        Code: "GS",
        UrlCode: "south-georgia-and-the-south-sandwich-islands",
        Name: "South Georgia and the South Sandwich Islands",
      },
      {
        Code: "SS",
        UrlCode: "south-sudan",
        Name: "South Sudan",
      },
      {
        Code: "ES",
        UrlCode: "spain",
        Name: "Spain",
      },
      {
        Code: "LK",
        UrlCode: "sri-lanka",
        Name: "Sri Lanka",
      },
      {
        Code: "SD",
        UrlCode: "sudan",
        Name: "Sudan",
      },
      {
        Code: "SR",
        UrlCode: "suriname",
        Name: "Suriname",
      },
      {
        Code: "SJ",
        UrlCode: "svalbard-and-jan-mayen",
        Name: "Svalbard and Jan Mayen",
      },
      {
        Code: "SZ",
        UrlCode: "swaziland",
        Name: "Swaziland",
      },
      {
        Code: "SE",
        UrlCode: "sweden",
        Name: "Sweden",
      },
      {
        Code: "CH",
        UrlCode: "switzerland",
        Name: "Switzerland",
      },
      {
        Code: "SY",
        UrlCode: "syrian-arab-republic",
        Name: "Syrian Arab Republic",
      },
      {
        Code: "TW",
        UrlCode: "taiwan",
        Name: "Taiwan",
      },
      {
        Code: "TJ",
        UrlCode: "tajikistan",
        Name: "Tajikistan",
      },
      {
        Code: "TZ",
        UrlCode: "tanzania-united-republic-of",
        Name: "Tanzania, United Republic of",
      },
      {
        Code: "TH",
        UrlCode: "thailand",
        Name: "Thailand",
      },
      {
        Code: "TL",
        UrlCode: "timor-leste",
        Name: "Timor-Leste",
      },
      {
        Code: "TG",
        UrlCode: "togo",
        Name: "Togo",
      },
      {
        Code: "TK",
        UrlCode: "tokelau",
        Name: "Tokelau",
      },
      {
        Code: "TO",
        UrlCode: "tonga",
        Name: "Tonga",
      },
      {
        Code: "TT",
        UrlCode: "trinidad-and-tobago",
        Name: "Trinidad and Tobago",
      },
      {
        Code: "TN",
        UrlCode: "tunisia",
        Name: "Tunisia",
      },
      {
        Code: "TR",
        UrlCode: "turkey",
        Name: "Turkey",
      },
      {
        Code: "TM",
        UrlCode: "turkmenistan",
        Name: "Turkmenistan",
      },
      {
        Code: "TC",
        UrlCode: "turks-and-caicos-islands",
        Name: "Turks and Caicos Islands",
      },
      {
        Code: "TV",
        UrlCode: "tuvalu",
        Name: "Tuvalu",
      },
      {
        Code: "UG",
        UrlCode: "uganda",
        Name: "Uganda",
      },
      {
        Code: "UA",
        UrlCode: "ukraine",
        Name: "Ukraine",
      },
      {
        Code: "AE",
        UrlCode: "united-arab-emirates",
        Name: "United Arab Emirates",
      },
      {
        Code: "GB",
        UrlCode: "united-kingdom",
        Name: "United Kingdom",
      },
      {
        Code: "US",
        UrlCode: "united-states",
        Name: "United States",
      },
      {
        Code: "UM",
        UrlCode: "united-states-minor-outlying-islands",
        Name: "United States Minor Outlying Islands",
      },
      {
        Code: "UY",
        UrlCode: "uruguay",
        Name: "Uruguay",
      },
      {
        Code: "UZ",
        UrlCode: "uzbekistan",
        Name: "Uzbekistan",
      },
      {
        Code: "VU",
        UrlCode: "vanuatu",
        Name: "Vanuatu",
      },
      {
        Code: "VE",
        UrlCode: "venezuela-bolivarian-republic-of",
        Name: "Venezuela",
      },
      {
        Code: "VN",
        UrlCode: "vietnam",
        Name: "Vietnam",
      },
      {
        Code: "VG",
        UrlCode: "virgin-islands-british",
        Name: "Virgin Islands, British",
      },
      {
        Code: "VI",
        UrlCode: "virgin-islands-us",
        Name: "Virgin Islands, U.S.",
      },
      {
        Code: "WF",
        UrlCode: "wallis-and-futuna",
        Name: "Wallis and Futuna",
      },
      {
        Code: "EH",
        UrlCode: "western-sahara",
        Name: "Western Sahara",
      },
      {
        Code: "YE",
        UrlCode: "yemen",
        Name: "Yemen",
      },
      {
        Code: "ZM",
        UrlCode: "zambia",
        Name: "Zambia",
      },
      {
        Code: "ZW",
        UrlCode: "zimbabwe",
        Name: "Zimbabwe",
      },
    ],
    Competitors: {
      TopSimilarityCompetitors: [],
    },
    Notification: {
      Content: null,
    },
    TopKeywords: [
      {
        Name: "쿠팡",
        EstimatedValue: 6604292,
        Volume: 3954910,
        Cpc: 0.7009065,
      },
      {
        Name: "쿠팡플레이",
        EstimatedValue: 636294,
        Volume: 466580,
        Cpc: null,
      },
      {
        Name: "znvkd",
        EstimatedValue: 330831,
        Volume: 155360,
        Cpc: 1.18187575,
      },
      {
        Name: "coupang",
        EstimatedValue: 305058,
        Volume: 325720,
        Cpc: 0.8370589375,
      },
      {
        Name: "쿠팡윙",
        EstimatedValue: 94176,
        Volume: 74260,
        Cpc: null,
      },
    ],
    SnapshotDate: "2024-09-01T00:00:00+00:00",
  },
};
