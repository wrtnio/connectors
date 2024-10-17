import { ICrunchbase } from "@wrtn/connector-api/lib/structures/connector/crunchbase/ICrunchbase";

// Type Check
const coupang: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "42f067ba-8233-c088-a83c-4bf86c8877fe",
      name: "Coupang",
      url: "https://www.crunchbase.com/organization/coupang",
      rank_company: 177635,
      locations: [
        {
          value: "Seoul",
          location_type: "city",
        },
        {
          value: "Seoul-t'ukpyolsi",
          location_type: "region",
        },
        {
          value: "South Korea",
          location_type: "country",
        },
        {
          value: "Asia",
          location_type: "continent",
        },
      ],
      address: "Seoul, Seoul-t'ukpyolsi, South Korea, Asia",
      about: "Coupang sells apparel, electronics, and footwear products.",
      full_description:
        "Coupang is an e-commerce company. The company sells apparel, electronics, footwear, food products, furniture, nutritional supplements, and other products. Its segments include product commerce and developing offerings.",
      industries: [
        "Apparel",
        "Consumer Electronics",
        "Consumer Goods",
        "Customer Service",
        "E-Commerce",
        "Retail",
        "Shopping",
      ],
      operating_status: "active",
      founded_date: "2010-01-01",
      company_type: "for_profit",
      social_media: [
        {
          name: "facebook",
          link: "https://www.facebook.com/Coupang.korea",
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/company/coupang",
        },
        {
          name: "twitter",
          link: "https://twitter.com/coupang",
        },
      ],
      num_employees: "",
      website: "https://www.aboutcoupang.com",
      ipo_status: "public",
      contact_email: "help@coupang.com",
      contact_phone: "+82 1577 7011",
      funding_info: [
        {
          title:
            "Asia-Pacific (APAC) Public Companies With More Than 10 Employees (Top 10K)",
          org_num: 6929,
          org_num_investors: 10673,
          org_funding_total: {
            value_usd: 829827603872,
            currency: "USD",
            value: 829827603872,
          },
        },
        {
          title: "Apparel Public Companies",
          org_num: 230,
          org_num_investors: 210,
          org_funding_total: {
            value_usd: 10614440536,
            currency: "USD",
            value: 10614440536,
          },
        },
        {
          title: "SoftBank Vision Fund Portfolio Companies",
          org_num: 345,
          org_num_investors: 6434,
          org_funding_total: {
            value_usd: 359954666411,
            currency: "USD",
            value: 359954666411,
          },
        },
        {
          title: "Customer Service Companies that Exited",
          org_num: 1418,
          org_num_investors: 1665,
          org_funding_total: {
            value_usd: 41307041315,
            currency: "USD",
            value: 41307041315,
          },
        },
      ],
      similar_companies: [
        {
          name: "Heat",
          url: "https://www.crunchbase.com/organization/heat-7fa2",
        },
        {
          name: "Ralali",
          url: "https://www.crunchbase.com/organization/ralali",
        },
        {
          name: "GrocerApp",
          url: "https://www.crunchbase.com/organization/grocerapp",
        },
        {
          name: "Steel City",
          url: "https://www.crunchbase.com/organization/steel-city",
        },
        {
          name: "Addison Bay",
          url: "https://www.crunchbase.com/organization/addison-bay",
        },
        {
          name: "Fingo",
          url: "https://www.crunchbase.com/organization/fingo-eb93",
        },
        {
          name: "InstaShop",
          url: "https://www.crunchbase.com/organization/instashop-3",
        },
        {
          name: "TogTees",
          url: "https://www.crunchbase.com/organization/togtees",
        },
        {
          name: "MrCase",
          url: "https://www.crunchbase.com/organization/mrcase",
        },
        {
          name: "AO World",
          url: "https://www.crunchbase.com/organization/ao-world",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/fsfmdpjoeqduryfp7awf",
      semrush_monthly_visits: 55869,
      semrush_monthly_visits_growth: 0.255172878614275,
      semrush_last_updated: "2024-07-15",
      num_contacts: 563,
      num_employee_profiles: 11,
      total_active_products: 0,
      num_news: 571,
      funding_rounds: {
        last_funding_at: "2021-01-01",
        last_funding_type: "post_ipo_equity",
        num_funding_rounds: 13,
        value: {
          currency: "USD",
          value: 3418000000,
          value_usd: 3418000000,
        },
      },
      bombora_last_updated: null,
      num_investors: 29,
      legal_name: "Coupang Co., Ltd.",
      num_event_appearances: 2,
      num_acquisitions: 3,
      num_investments: 1,
      num_advisor_positions: 9,
      num_exits: null,
      num_investments_lead: 1,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: "NYSE:CPNG",
      contacts: [
        {
          name: "Fan Xia",
          linkedin_id: "fanxia",
          levels: ["l_500_exec"],
          departments: ["engineering"],
        },
      ],
      event_appearances: [
        {
          appearance_type: "exhibitor",
          event: "CVPR 2018",
          event_starts_on: "2018-06-18",
          image: "gm3vtifcg8f7ckmrsjmc",
          permalink: "cvpr-2018",
        },
        {
          appearance_type: "sponsor",
          event: "CVPR 2018",
          event_starts_on: "2018-06-18",
          image: "gm3vtifcg8f7ckmrsjmc",
          permalink: "cvpr-2018",
        },
      ],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: "2021-03-11",
        stock_link: "https://www.google.com/finance?q=NYSE:CPNG",
        stock_symbol: "NYSE:CPNG",
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [
        {
          image: "v1482147802/ne5uhuh5w7vsqsxqd8cm.png",
          name: "Bom Kim",
          permalink: "bom-kim",
          title: "Bom Kim Founder & CEO @ Coupang",
        },
        {
          image: "lsudrzx3dxasugkzhssw",
          name: "Sangyeop Jung",
          permalink: "jung-sang-yeop",
          title:
            "Sangyeop Jung Director, Head of Corporate Development @ Coupang",
        },
        {
          image: "qprhx8zk3rwlxfmfl0oa",
          name: "Ben Gerber",
          permalink: "ben-gerber",
          title:
            "Ben Gerber Chief Information Security Officer (CISO) & Chief Privacy Officer (CPO) @ Coupang",
        },
        {
          image: "qq49kk06bggqtf8bnbpr",
          name: "TJ Kim",
          permalink: "tj-kim",
          title: "TJ Kim Head of Product, Search and Discovery @ Coupang",
        },
        {
          image: "y2bfujpytzvwzbgygcnx",
          name: "HL Rogers",
          permalink: "hl-rogers",
          title: "HL Rogers Chief Administrative Officer & SVP @ Coupang",
        },
        {
          image: "os38irifaycsmggy5aey",
          name: "Jay Jorgensen",
          permalink: "jay-jorgensen",
          title:
            "Jay Jorgensen General Counsel & Chief Compliance Officer @ Coupang",
        },
        {
          image: "v1431936951/qosr36rn7sbjqzskwcde.jpg",
          name: "Siddharth Chilukuri",
          permalink: "siddharth-chilukuri",
          title: "Siddharth Chilukuri Group Product Manager @ Coupang",
        },
        {
          image: "v1497430202/dt08fxkwmhsbj52fhgpn.png",
          name: "Soee Kwon",
          permalink: "soee-kwon",
          title:
            "Soee Kwon Sr. Content Operation Manager[Coupang Play] @ Coupang",
        },
        {
          image: "dydoep3c7zutfbx5zfvu",
          name: "Dongfeng Chen",
          permalink: "dongfeng-chen",
          title: "Dongfeng Chen Engineering Director @ Coupang",
        },
        {
          image: "eyf1ywzpwptfkn8pmctw",
          name: "Saurav Bajoria",
          permalink: "saurav-bajoria",
          title: "Saurav Bajoria Director @ Coupang",
        },
      ],
      semrush_location_list: [
        {
          locations: [
            {
              name: "South Korea",
              permalink: "south-korea",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 31202,
          rank_mom_pct: -0.557650594723337,
          visits_mom_pct: 2.62722431484608,
          visits_pct: 0.499847858383003,
        },
        {
          locations: [
            {
              name: "China",
              permalink: "china-500a",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 48510,
          rank_mom_pct: -0.511627906976744,
          visits_mom_pct: 1.15473441108545,
          visits_pct: 0.267196477474091,
        },
        {
          locations: [
            {
              name: "United States",
              permalink: "united-states",
            },
            {
              name: "North America",
              permalink: "north-america",
            },
          ],
          rank: 475589,
          rank_mom_pct: 0.131724229833854,
          visits_mom_pct: -0.316377816291161,
          visits_pct: 0.141205319586891,
        },
        {
          locations: [
            {
              name: "South Africa",
              permalink: "south-africa",
            },
            {
              name: "Africa",
              permalink: "africa",
            },
          ],
          rank: 65002,
          rank_mom_pct: null,
          visits_mom_pct: null,
          visits_pct: 0.0270812078254488,
        },
        {
          locations: [
            {
              name: "United Kingdom",
              permalink: "united-kingdom",
            },
            {
              name: "Europe",
              permalink: "europe",
            },
          ],
          rank: 439275,
          rank_mom_pct: 1.10865495391705,
          visits_mom_pct: -0.739962775857485,
          visits_pct: 0.0175052354615261,
        },
      ],
      siftery_products: [],
      funding_rounds_list: [
        {
          announced_on: "2021-01-01",
          id: "coupang-post-ipo-equity--c7d46fa4",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 1,
          lead_investors: null,
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
        },
        {
          announced_on: "2018-11-20",
          id: "coupang-private-equity--adef87ce",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 3,
          lead_investors: [
            {
              image: "ffdrqptwqzlbq8yw4qgq",
              name: "SoftBank Vision Fund",
              permalink: "softbank-vision-fund",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "2000000000",
            value_usd: "2000000000",
          },
        },
        {
          announced_on: "2018-03-05",
          id: "coupang-series-unknown--9e3f7d94",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 4,
          lead_investors: null,
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
        },
        {
          announced_on: "2016-08-05",
          id: "coupang-series-unknown--d41e0776",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 1,
          lead_investors: null,
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
        },
        {
          announced_on: "2015-06-22",
          id: "coupang-private-equity--975c9dfd",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 1,
          lead_investors: null,
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
        },
        {
          announced_on: "2015-06-02",
          id: "coupang-private-equity--1248e694",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 1,
          lead_investors: [
            {
              image: "liab4nlbn8ov1vzuwgqu",
              name: "SoftBank",
              permalink: "softbank",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "1000000000",
            value_usd: "1000000000",
          },
        },
        {
          announced_on: "2014-12-10",
          id: "coupang-private-equity--06476e55",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 6,
          lead_investors: [
            {
              image: "v1502779272/cywtk2ouxna5zh1h88yk.png",
              name: "BlackRock Private Equity Partners",
              permalink: "blackrock-private-equity-partners",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "300000000",
            value_usd: "300000000",
          },
        },
        {
          announced_on: "2014-11-24",
          id: "coupang-series-g--93df6730",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 1,
          lead_investors: null,
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
        },
        {
          announced_on: "2014-05-31",
          id: "coupang-series-f--374e1c99",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 1,
          lead_investors: null,
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
        },
        {
          announced_on: "2014-05-28",
          id: "coupang-series-unknown--eefb6987",
          image_id: "fsfmdpjoeqduryfp7awf",
          num_investors: 11,
          lead_investors: [
            {
              image: "itlvyekqsbl2orcjxugx",
              name: "Sequoia Capital",
              permalink: "sequoia-capital",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "100000000",
            value_usd: "100000000",
          },
        },
      ],
      overview_timeline: [
        {
          announced_on: "2024-10-04",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Coupang Officer Sells Shares to Cover Tax Obligations",
          uuid: "14a95841-3485-436f-a9a1-96ad3e059506",
        },
        {
          announced_on: "2024-10-02",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Coupang’s one-day luxury delivery service rebrands as R.LUX",
          uuid: "c231d6ab-cead-40d7-8e15-e82905b8888e",
        },
        {
          announced_on: "2024-08-26",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Around $7M Bet On Coupang? Check Out These 3 Stocks Executives Are Buying",
          uuid: "1ad98309-5624-481f-8ca7-b144b78f5ad7",
        },
        {
          announced_on: "2024-08-26",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Coupang hosts global hackathon to seek innovative solutions",
          uuid: "7231cdec-9ff7-4b71-9647-bbf646a17dae",
        },
        {
          announced_on: "2024-08-23",
          id: "episoden-series-a--eeee1ee9",
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
            {
              image: "blxbtxi598xsl3ygnrbx",
              name: "Episoden",
              permalink: "episoden",
              uuid: "16de6407-52e5-4f1f-8243-587d4ad6d551",
            },
            {
              image: "ulmlvtgrtnufp22nrjrd",
              name: "Primer Sazze Partners",
              permalink: "sazzepartners",
              uuid: "07b07656-93c2-b01e-7257-834679befdb5",
            },
            {
              image: "e34f3e8fcba8439fa996190f4b332c33",
              name: "Xquared VC",
              permalink: "xquared-vc",
              uuid: "8c938998-76f4-4f79-8e9b-dd64f5c1ed71",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "4500000000",
            value_usd: "3361690",
          },
          title: "Series A - Episoden",
          uuid: "eeee1ee9-1c08-41b0-a027-c426d01b0bea",
        },
        {
          announced_on: "2024-08-14",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Coupang, CJ Cheiljedang end feud to resume Rocket Delivery",
          uuid: "12b5b3d0-e851-4e77-a533-e46353c656b9",
        },
        {
          announced_on: "2024-08-14",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Whale Rock dives into Google, Coupang, sheds Salesforce, Marvell, others in Q2",
          uuid: "2d80a449-cfeb-4d57-9c8c-fb49881b8f43",
        },
        {
          announced_on: "2024-08-14",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Coupang CFO sells $4.55M in common stock",
          uuid: "4937811f-2ce3-43be-ae40-3d37e47145a3",
        },
        {
          announced_on: "2024-08-14",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Coupang Q2 2024: revenue rises 25 percent and profit soars 41 percent",
          uuid: "8fb81e8e-e94a-46b4-bec2-3037ebd07496",
        },
        {
          announced_on: "2024-08-14",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fsfmdpjoeqduryfp7awf",
              name: "Coupang",
              permalink: "coupang",
              uuid: "42f067ba-8233-c088-a83c-4bf86c8877fe",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Druckenmiller's Duquesne pares Apple, Coupang, adds Adobe, TeraWulf, others",
          uuid: "97a44c70-a3f4-4542-94c6-e035493df0c1",
        },
      ],
      bombora: [],
      investors: [
        {
          funding_round: {
            id: "c7d46fa4-d3f7-4a69-ab1c-72fd01e1ef6a",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Post-IPO Equity - Coupang",
          },
          id: "wolfswood-partners-invested-in-coupang-post-ipo-equity--c7d46fa4--25d886cd",
          investor: {
            id: "wolfswood-partners",
            image_id: null,
            type: "organization",
            value: "Wolfswood Partners",
          },
          lead_investor: null,
          type: "investment",
          value: "Wolfswood Partners investment in Post-IPO Equity - Coupang",
        },
        {
          funding_round: {
            id: "adef87ce-adba-4e9a-9cfc-bdb12d58eacf",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Private Equity Round - Coupang",
          },
          id: "softbank-vision-fund-invested-in-coupang-private-equity--adef87ce--34c614c6",
          investor: {
            id: "softbank-vision-fund",
            image_id: "ffdrqptwqzlbq8yw4qgq",
            type: "organization",
            value: "SoftBank Vision Fund",
          },
          lead_investor: true,
          type: "investment",
          value:
            "SoftBank Vision Fund investment in Private Equity Round - Coupang",
        },
        {
          funding_round: {
            id: "adef87ce-adba-4e9a-9cfc-bdb12d58eacf",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Private Equity Round - Coupang",
          },
          id: "sequoia-capital-invested-in-coupang-private-equity--adef87ce--a9fb3750",
          investor: {
            id: "sequoia-capital",
            image_id: "itlvyekqsbl2orcjxugx",
            type: "organization",
            value: "Sequoia Capital",
          },
          lead_investor: null,
          type: "investment",
          value: "Sequoia Capital investment in Private Equity Round - Coupang",
        },
        {
          funding_round: {
            id: "adef87ce-adba-4e9a-9cfc-bdb12d58eacf",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Private Equity Round - Coupang",
          },
          id: "blackrock-invested-in-coupang-private-equity--adef87ce--b885426d",
          investor: {
            id: "blackrock",
            image_id: "mrkgh4aeunkd2au7zaxf",
            type: "organization",
            value: "BlackRock",
          },
          lead_investor: null,
          type: "investment",
          value: "BlackRock investment in Private Equity Round - Coupang",
        },
        {
          funding_round: {
            id: "9e3f7d94-1276-4147-bf93-4e39927d0750",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Venture Round - Coupang",
          },
          id: "eso-fund-invested-in-coupang-series-unknown--9e3f7d94--4c029fe6",
          investor: {
            id: "eso-fund",
            image_id: "ltl4hw4qq8hro3awxysi",
            type: "organization",
            value: "Employee Stock Option Fund",
          },
          lead_investor: null,
          type: "investment",
          value:
            "Employee Stock Option Fund investment in Venture Round - Coupang",
        },
        {
          funding_round: {
            id: "9e3f7d94-1276-4147-bf93-4e39927d0750",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Venture Round - Coupang",
          },
          id: "reimagined-ventures-invested-in-coupang-series-unknown--9e3f7d94--51301a66",
          investor: {
            id: "reimagined-ventures",
            image_id: "v1492011243/ngxzjjcqpxt5zgto3lyy.jpg",
            type: "organization",
            value: "Reimagined Ventures",
          },
          lead_investor: null,
          type: "investment",
          value: "Reimagined Ventures investment in Venture Round - Coupang",
        },
        {
          funding_round: {
            id: "9e3f7d94-1276-4147-bf93-4e39927d0750",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Venture Round - Coupang",
          },
          id: "seek-ventures-invested-in-coupang-series-unknown--9e3f7d94--842d9dc8",
          investor: {
            id: "seek-ventures",
            image_id: "gw7g399pb2adst6yctx2",
            type: "organization",
            value: "Seek Ventures",
          },
          lead_investor: null,
          type: "investment",
          value: "Seek Ventures investment in Venture Round - Coupang",
        },
        {
          funding_round: {
            id: "9e3f7d94-1276-4147-bf93-4e39927d0750",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Venture Round - Coupang",
          },
          id: "trog-hawley-capital-invested-in-coupang-series-unknown--9e3f7d94--a360831b",
          investor: {
            id: "trog-hawley-capital",
            image_id: "abtsywk6yvfthnx2fmjv",
            type: "organization",
            value: "Trog Hawley Capital",
          },
          lead_investor: null,
          type: "investment",
          value: "Trog Hawley Capital investment in Venture Round - Coupang",
        },
        {
          funding_round: {
            id: "d41e0776-3ebf-d96a-1259-3d1a9ca36add",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Venture Round - Coupang",
          },
          id: "fj-labs-invested-in-coupang-series-unknown--d41e0776--f5b5568a",
          investor: {
            id: "fj-labs",
            image_id: "v1450889848/mwatezrueqsvpxtzfdnt.png",
            type: "organization",
            value: "FJ Labs",
          },
          lead_investor: null,
          type: "investment",
          value: "FJ Labs investment in Venture Round - Coupang",
        },
        {
          funding_round: {
            id: "975c9dfd-f745-4abc-98de-9ee647718895",
            image_id: "fsfmdpjoeqduryfp7awf",
            type: "funding_round",
            value: "Private Equity Round - Coupang",
          },
          id: "fifth-down-capital-invested-in-coupang-private-equity--975c9dfd--76a5e2a3",
          investor: {
            id: "fifth-down-capital",
            image_id: "pqg9ovvaa4zyupzfrnqv",
            type: "organization",
            value: "Fifth Down Capital",
          },
          lead_investor: null,
          type: "investment",
          value:
            "Fifth Down Capital investment in Private Equity Round - Coupang",
        },
      ],
      acquisitions: [
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "039dcb21-89b9-66eb-363c-6efa303373f8",
            value: "Farfetch",
            image_id: "wko3ka42ewzfyanrvm9h",
            permalink: "farfetch",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2023-12-19",
          },
          price: {
            value: 500000000,
            currency: "USD",
            value_usd: 500000000,
          },
          identifier: {
            uuid: "eaf97201-b5d3-47d2-936e-fcc0ba8da4d0",
            value: "Farfetch acquired by Coupang",
            image_id: "wko3ka42ewzfyanrvm9h",
            permalink: "coupang-acquires-farfetch--eaf97201",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "309af9ec-8d19-6c58-e9b1-543d852090b1",
            value: "HOOQ",
            image_id: "v1428911079/zflmxhxr0nb92omgv2ma.png",
            permalink: "hooq",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2020-07-09",
          },
          identifier: {
            uuid: "542bc7e5-628b-4aa4-9add-0faff5e3e354",
            value: "HOOQ acquired by Coupang",
            image_id: "v1428911079/zflmxhxr0nb92omgv2ma.png",
            permalink: "coupang-acquires-hooq--542bc7e5",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "4f607f7a-8046-85ab-c691-ca2639a31d10",
            value: "CalmSea",
            image_id: "v1397187839/204150013443b269c5a6835faa789350.png",
            permalink: "calmsea",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2014-05-16",
          },
          identifier: {
            uuid: "c4f981c4-e82c-ddcc-0865-11ebbc9f0110",
            value: "CalmSea acquired by Coupang",
            image_id: "v1397187839/204150013443b269c5a6835faa789350.png",
            permalink: "coupang-acquires-calmsea--c4f981c4",
            entity_def_id: "acquisition",
          },
        },
      ],
      funds_raised: [
        {
          announced_on: "2024-08-23",
          id: "coupang-invested-in-episoden-series-a--eeee1ee9--4e418e77",
          money_raised: 4500000000,
          money_raised_usd: 3361690,
          currency: "KRW",
          type: "investment",
          value: "Coupang investment in Series A - Episoden",
        },
      ],
      investments: [
        {
          announced_on: "2024-08-23",
          funding_round: {
            id: "episoden-series-a--eeee1ee9",
            image_id: "blxbtxi598xsl3ygnrbx",
            type: "funding_round",
            value: "Series A - Episoden",
          },
          id: "coupang-invested-in-episoden-series-a--eeee1ee9--4e418e77",
          organization: {
            id: "episoden",
            image_id: "blxbtxi598xsl3ygnrbx",
            type: "organization",
            value: "Episoden",
          },
          type: "investment",
          value: "Coupang investment in Series A - Episoden",
        },
      ],
      apptopia: [
        {
          identifier: {
            uuid: "13d79822-fff6-4c65-b7c0-fd62e388bb17",
            value: "Coupang Play",
            image_id: "apptopia/app/apptopia_app..com.coupang.mobile.play",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play"],
          monthly_downloads: 523015,
        },
        {
          identifier: {
            uuid: "04fcaf82-1ef4-4b2b-9c50-551be6c89c2a",
            value: "쿠팡 (Coupang)",
            image_id: "apptopia/app/0a643bb1-eec8-4bf0-947a-c2de4b0abdf8",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play"],
          monthly_downloads: 379520,
        },
        {
          identifier: {
            uuid: "99a98f68-3e29-4ed3-9a62-17274536ba71",
            value: "쿠팡 (Coupang)",
            image_id: "apptopia/app/4803ce13-775a-4669-a73c-6766b1a64aa4",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
          monthly_downloads: 302424,
        },
        {
          identifier: {
            uuid: "a53dab11-5203-46da-b9c8-04c0fb0c2124",
            value: "Coupang クーパン - 最短10分で届くネットスーパー",
            image_id:
              "apptopia/app/apptopia_app.1567026344.com.coupang.mobile.lightspeed",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play", "itunes_connect"],
          monthly_downloads: 235261,
        },
        {
          identifier: {
            uuid: "7b5b4964-1c11-4e00-be1d-773a8cd4d3b9",
            value: "쿠팡플레이",
            image_id:
              "apptopia/app/apptopia_app.1536885649.com.coupang.mobile.play",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
          monthly_downloads: 130077,
        },
        {
          identifier: {
            uuid: "7e2a58a0-1282-4751-82b2-3e0882c7705e",
            value: "쿠팡이츠",
            image_id:
              "apptopia/app/apptopia_app.1445504255.com.coupang.mobile.eats",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
          monthly_downloads: 60294,
        },
        {
          identifier: {
            uuid: "19f57454-ec43-4e46-afde-ee6c36419d4c",
            value: "Coupang Eats-Delivery for Food",
            image_id: "apptopia/app/apptopia_app..com.coupang.mobile.eats",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play"],
          monthly_downloads: 58171,
        },
        {
          identifier: {
            uuid: "9c616fad-8906-4baa-832c-0658f0aad509",
            value: "쿠팡 윙 판매자센터",
            image_id: "apptopia/app/apptopia_app.1569143887.com.coupang.wing",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play", "itunes_connect"],
          monthly_downloads: 23806,
        },
        {
          identifier: {
            uuid: "57bb4f4e-905d-4dd4-b7c3-d7787cac7e9f",
            value: "쿠팡이츠 배달 파트너",
            image_id:
              "apptopia/app/apptopia_app..com.coupang.mobile.eats.courier",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play"],
          monthly_downloads: 20247,
        },
        {
          identifier: {
            uuid: "e42fd2e7-4f5c-48a4-a93c-5aa27a70a724",
            value: "쿠펀치",
            image_id:
              "apptopia/app/apptopia_app.1463753771.com.coupang.mobile.coupunch",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
          monthly_downloads: 18324,
        },
      ],
      current_advisors: [
        {
          image: "v1474121987/vlwiqhzwtswiqj8ijyvc.jpg",
          job_type: "board_member",
          name: "Jai Choi",
          permalink: "jai-choi",
        },
        {
          image: "v1427569558/g6azyokyif1alrqixsmg.jpg",
          job_type: "advisor",
          name: "Jeff Carr",
          permalink: "jeff-carr-2",
        },
        {
          image: "v1482147802/ne5uhuh5w7vsqsxqd8cm.png",
          job_type: "board_member",
          name: "Bom Kim",
          permalink: "bom-kim",
        },
        {
          image: "yt6mzmaei24eebngsdoa",
          job_type: "advisor",
          name: "Eric J. Kim",
          permalink: "eric-j-kim",
        },
        {
          image: "qzpta1dj08asu6ljltj7",
          job_type: "board_member",
          name: "Matthew Christensen",
          permalink: "matthew-christensen",
        },
        {
          image: "v1401298920/ipeiwqwt3q0wxrvayq4j.jpg",
          job_type: "board_member",
          name: "Benjamin Sun",
          permalink: "ben-sun",
        },
        {
          image: "jrrljhgsrci8idk1zmf9",
          job_type: "board_member",
          name: "Neil Mehta",
          permalink: "neil-mehta-f8d9",
        },
        {
          image: "czecmarwqiqozkb0nihb",
          job_type: "board_member",
          name: "Rafael Ortiz",
          permalink: "rafael-ortiz-c5da",
        },
      ],
      exits: [],
      news: [
        {
          date: "2024-10-04",
          organization: "Coupang",
          publisher: "TradingView",
          thumbnail_url: null,
          title: "Coupang Officer Sells Shares to Cover Tax Obligations",
          url: "https://www.tradingview.com/news/tradingview:ffbee52f7d59c:0-coupang-officer-sells-shares-to-cover-tax-obligations/",
        },
        {
          date: "2024-10-02",
          organization: "Coupang",
          publisher: "Korea Herald",
          thumbnail_url: null,
          title: "Coupang’s one-day luxury delivery service rebrands as R.LUX",
          url: "http://www.koreaherald.com/view.php?ud=20241002050701",
        },
        {
          date: "2024-08-26",
          organization: "Coupang",
          publisher: "Benzinga",
          thumbnail_url: null,
          title:
            "Around $7M Bet On Coupang? Check Out These 3 Stocks Executives Are Buying",
          url: "https://www.benzinga.com/trading-ideas/long-ideas/24/08/40551171/around-7m-bet-on-coupang-check-out-these-3-stocks-executives-are-buying",
        },
        {
          date: "2024-08-26",
          organization: "Coupang",
          publisher: "Korea Herald",
          thumbnail_url: null,
          title: "Coupang hosts global hackathon to seek innovative solutions",
          url: "http://www.koreaherald.com/view.php?ud=20240826050451",
        },
        {
          date: "2024-08-23",
          organization: "Coupang",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
        {
          date: "2024-08-14",
          organization: "Coupang",
          publisher: "Korea Economic Daily",
          thumbnail_url: null,
          title: "Coupang, CJ Cheiljedang end feud to resume Rocket Delivery",
          url: "https://www.kedglobal.com/e-commerce/newsView/ked202408140011",
        },
        {
          date: "2024-08-14",
          organization: "Coupang",
          publisher: "SeekingAlpha",
          thumbnail_url: null,
          title:
            "Whale Rock dives into Google, Coupang, sheds Salesforce, Marvell, others in Q2",
          url: "https://seekingalpha.com/news/4140137-whale-rock-dives-into-google-coupang-sheds-salesforce-marvell-others-in-q2",
        },
        {
          date: "2024-08-14",
          organization: "Coupang",
          publisher: "thefly.com",
          thumbnail_url: null,
          title: "Coupang CFO sells $4.55M in common stock",
          url: "https://thefly.com/permalinks/entry.php/id3969420/CPNG-Coupang-CFO-sells-M-in-common-stock",
        },
        {
          date: "2024-08-14",
          organization: "Coupang",
          publisher: "Global Cosmetics News",
          thumbnail_url: null,
          title:
            "Coupang Q2 2024: revenue rises 25 percent and profit soars 41 percent",
          url: "https://www.globalcosmeticsnews.com/coupang-q2-2024-revenue-rises-25-percent-and-profit-soars-41-percent/",
        },
        {
          date: "2024-08-14",
          organization: "Coupang",
          publisher: "SeekingAlpha",
          thumbnail_url: null,
          title:
            "Druckenmiller's Duquesne pares Apple, Coupang, adds Adobe, TeraWulf, others",
          url: "https://seekingalpha.com/news/4140034-druckenmillers-duquesne-pares-apple-coupang-adds-adobe-terawulf-others",
        },
      ],
      aberdeen_it_spend: null,
      headquarters_regions: [
        {
          id: "asia-pacific",
          value: "Asia-Pacific (APAC)",
        },
      ],
      financials_highlights: {
        num_lead_investments: 1,
        num_investments: 1,
        num_investors: 29,
        num_lead_investors: 6,
        listed_stock_symbol: "NYSE:CPNG",
        funding_total: {
          value: 3418000000,
          currency: "USD",
          value_usd: 3418000000,
        },
        num_funding_rounds: 13,
      },
      ipqwery: {
        ipqwery_popular_patent_category: "g06",
        ipqwery_popular_trademark_class: "c9",
        ipqwery_num_trademark_registered: 175,
        ipqwery_num_patent_granted: 1048,
      },
      overview_highlights: {
        num_org_similarities: 34,
        num_current_positions: 33,
        num_investments: 1,
        num_investors: 29,
        listed_stock_symbol: "NYSE:CPNG",
        num_contacts: 563,
        funding_total: {
          value: 3418000000,
          currency: "USD",
          value_usd: 3418000000,
        },
      },
      people_highlights: {
        num_contacts: 563,
        num_current_advisor_positions: 9,
        num_current_positions: 33,
      },
      technology_highlights: {
        apptopia_total_downloads: 1791675,
        builtwith_num_technologies_used: 149,
        semrush_visits_latest_month: 55869,
        semrush_visits_mom_pct: 0.255172878614275,
      },
      founders: [
        {
          id: "bom-kim",
          type: "person",
          value: "Bom Kim",
        },
      ],
    },
  },
};

// Type Check
const wrtnTechnologies: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
      name: "Wrtn Technologies",
      url: "https://www.crunchbase.com/organization/wrtn-technologies",
      rank_company: 15605,
      locations: [
        {
          value: "Seoul",
          location_type: "city",
        },
        {
          value: "Seoul-t'ukpyolsi",
          location_type: "region",
        },
        {
          value: "South Korea",
          location_type: "country",
        },
        {
          value: "Asia",
          location_type: "continent",
        },
      ],
      address: "Seoul, Seoul-t'ukpyolsi, South Korea, Asia",
      about:
        "Wrtn Technologies develops an AI and NLP-based writing assistant to enhance creativity and productivity.",
      full_description:
        "Wrtn Technologies develops an AI-based content writing assistant using NLP-based AI. Its platform offers AI writing assistance in which AI and humans write together to determine the difficulties caused by the decline in writing ability, helping clients push the limits of creativity and productivity through powerful AI-assisted writing.",
      industries: [
        "Artificial Intelligence (AI)",
        "Content",
        "Machine Learning",
        "Natural Language Processing",
      ],
      operating_status: "active",
      founded_date: "2021-01-01",
      company_type: "for_profit",
      social_media: [
        {
          name: "facebook",
          link: "https://www.facebook.com/wrtn.io",
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/company/wrtn-technologies-inc",
        },
      ],
      num_employees: "11-50",
      website: "https://wrtn.io",
      ipo_status: "private",
      contact_email: "contact@wrtn.io",
      contact_phone: "+82 02 499 1885",
      funding_info: [
        {
          title: "Seoul Companies With More Than $1M in Revenue",
          org_num: 1920,
          org_num_investors: 3468,
          org_funding_total: {
            value_usd: 112117541341,
            currency: "USD",
            value: 112117541341,
          },
        },
        {
          title: "South Korea Early Stage Companies",
          org_num: 1267,
          org_num_investors: 7060,
          org_funding_total: {
            value_usd: 14718040327,
            currency: "USD",
            value: 14718040327,
          },
        },
        {
          title: "South Korea Startups",
          org_num: 4400,
          org_num_investors: 15006,
          org_funding_total: {
            value_usd: 31556414237,
            currency: "USD",
            value: 31556414237,
          },
        },
        {
          title:
            "Machine Learning Early Stage Companies With More Than 10 Employees",
          org_num: 1346,
          org_num_investors: 9450,
          org_funding_total: {
            value_usd: 42154379164,
            currency: "USD",
            value: 42154379164,
          },
        },
      ],
      similar_companies: [
        {
          name: "Fainders.AI",
          url: "https://www.crunchbase.com/organization/fainders-ai",
        },
        {
          name: "Pinch Ta",
          url: "https://www.crunchbase.com/organization/nieta-art",
        },
        {
          name: "Dotcom Systems Private Limited",
          url: "https://www.crunchbase.com/organization/dotcom-systems-private-limited",
        },
        {
          name: "Summari",
          url: "https://www.crunchbase.com/organization/joggo",
        },
        {
          name: "Lightkey",
          url: "https://www.crunchbase.com/organization/lightkey-sources-ltd",
        },
        {
          name: "Video Inform",
          url: "https://www.crunchbase.com/organization/video-inform",
        },
        {
          name: "Mustmove",
          url: "https://www.crunchbase.com/organization/mustmove",
        },
        {
          name: "PostPro",
          url: "https://www.crunchbase.com/organization/post-pro",
        },
        {
          name: "Nome",
          url: "https://www.crunchbase.com/organization/nome-5b7b",
        },
        {
          name: "Officy",
          url: "https://www.crunchbase.com/organization/officy",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/fg00pyoi8cdykk5rlivo",
      semrush_monthly_visits: 17468,
      semrush_monthly_visits_growth: -0.691987586401467,
      semrush_last_updated: "2024-07-15",
      num_contacts: 1,
      num_employee_profiles: 11,
      total_active_products: 0,
      num_news: 16,
      funding_rounds: {
        last_funding_at: "2024-06-06",
        last_funding_type: "series_b",
        num_funding_rounds: 5,
        value: {
          currency: "KRW",
          value: 44300000000,
          value_usd: 33273959,
        },
      },
      bombora_last_updated: "2024-10-13",
      num_investors: 13,
      legal_name: "Wrtn Technologies, Inc.",
      num_event_appearances: null,
      num_acquisitions: null,
      num_investments: null,
      num_advisor_positions: null,
      num_exits: null,
      num_investments_lead: null,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: null,
      contacts: [
        {
          name: "Jiseop Kim",
          linkedin_id: "jiseop-kim",
          levels: ["l_100_individual"],
          departments: null,
        },
      ],
      event_appearances: [],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: null,
        stock_link: null,
        stock_symbol: null,
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [
        {
          image: "piy60j4or0xxmdtrvyl5",
          name: "Seyoung Lee",
          permalink: "seyoung-lee-1380",
          title: "Seyoung Lee Founder & CEO @ Wrtn Technologies",
        },
      ],
      semrush_location_list: [
        {
          locations: [
            {
              name: "South Korea",
              permalink: "south-korea",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 58438,
          rank_mom_pct: 2.02255094651909,
          visits_mom_pct: -0.747473421708886,
          visits_pct: 0.771009846576597,
        },
        {
          locations: [
            {
              name: "Japan",
              permalink: "japan",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 269295,
          rank_mom_pct: -0.460312275167691,
          visits_mom_pct: 7.46572104018913,
          visits_pct: 0.205003434852301,
        },
        {
          locations: [
            {
              name: "Australia",
              permalink: "australia",
            },
            {
              name: "Oceania",
              permalink: "oceania",
            },
          ],
          rank: 543004,
          rank_mom_pct: 0.742905655895824,
          visits_mom_pct: -0.733870967741935,
          visits_pct: 0.0113350125944584,
        },
        {
          locations: [
            {
              name: "India",
              permalink: "india",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 1047192,
          rank_mom_pct: 2.11166974210859,
          visits_mom_pct: -0.855018587360595,
          visits_pct: 0.00893061598351271,
        },
        {
          locations: [
            {
              name: "Vietnam",
              permalink: "vietnam",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 431298,
          rank_mom_pct: null,
          visits_mom_pct: null,
          visits_pct: 0.00337760476299519,
        },
      ],
      siftery_products: [],
      funding_rounds_list: [
        {
          announced_on: "2024-06-06",
          id: "wrtn-technologies-series-b--aa6b00d8",
          image_id: "fg00pyoi8cdykk5rlivo",
          num_investors: 5,
          lead_investors: [
            {
              image: "utl4b1m383k7n82zrprb",
              name: "BRV Capital Management",
              permalink: "brv-capital-management",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "25000000000",
            value_usd: "18308339",
          },
        },
        {
          announced_on: "2023-06-16",
          id: "wrtn-technologies-series-a--d6e7b90e",
          image_id: "fg00pyoi8cdykk5rlivo",
          num_investors: 5,
          lead_investors: [
            {
              image: "ieduoy7bvbkba3i4zdgu",
              name: "Capstone Partners",
              permalink: "capstone-partners-korea",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "15000000000",
            value_usd: "11743521",
          },
        },
        {
          announced_on: "2022-11-10",
          id: "wrtn-technologies-seed--7e94195b",
          image_id: "fg00pyoi8cdykk5rlivo",
          num_investors: 5,
          lead_investors: null,
          money_raised: {
            currency: "KRW",
            value: "3800000000",
            value_usd: "2815294",
          },
        },
        {
          announced_on: "2022-04-15",
          id: "wrtn-technologies-pre-seed--58ac1c6c",
          image_id: "fg00pyoi8cdykk5rlivo",
          num_investors: 1,
          lead_investors: [
            {
              image: "kfkxxzaeafgiuo5r0pkj",
              name: "TIPS Program",
              permalink: "tips-program",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "500000000",
            value_usd: "406805",
          },
        },
        {
          announced_on: "2021-06-22",
          id: "wrtn-technologies-seed--08d98ff6",
          image_id: "fg00pyoi8cdykk5rlivo",
          num_investors: 1,
          lead_investors: [
            {
              image: "v1436517784/prtj30uoi1tjm0mzxbm1.png",
              name: "MashUp Angels",
              permalink: "mashup-angels",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
        },
      ],
      overview_timeline: [
        {
          announced_on: "2024-06-30",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Tech startup Wrtn Technologies raises $18 million for AI push",
          uuid: "432f4e42-2880-47fe-865f-b0ba2e2fcd9b",
        },
        {
          announced_on: "2024-06-30",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Korean AI Startup Wrtn Raises Funds in Round Led by BRV Capital",
          uuid: "8edb4e9b-7e27-4271-ba3f-e547764889d3",
        },
        {
          announced_on: "2024-06-30",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Connecting Asia's startup ecosystem",
          uuid: "ad030bfb-750d-4920-a426-bbd075c6026e",
        },
        {
          announced_on: "2024-06-24",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Tech startup Wrtn Technologies raises $18 million for AI push",
          uuid: "086b2df5-de35-43ea-86f4-f07a38fb95d2",
        },
        {
          announced_on: "2024-06-06",
          id: "wrtn-technologies-series-b--aa6b00d8",
          image_id: null,
          lead_investors: [
            {
              image: "utl4b1m383k7n82zrprb",
              name: "BRV Capital Management",
              permalink: "brv-capital-management",
              uuid: "2dec21c9-b64d-4e7b-98a5-8950c46a44db",
            },
            {
              image: "ieduoy7bvbkba3i4zdgu",
              name: "Capstone Partners",
              permalink: "capstone-partners-korea",
              uuid: "1ba766ba-03f9-7410-0072-62b8ef4921b5",
            },
            {
              image: "v1470074844/epbft3p4blgoqtgex5fq.png",
              name: "Industrial Bank of Korea",
              permalink: "industrial-bank-of-korea",
              uuid: "06329fdf-f3db-dbe0-9f89-c1ea59dcb959",
            },
            {
              image: "e18768eecb7141ad87c48dbfc959fe95",
              name: "Line Yahoo",
              permalink: "ly-corporation",
              uuid: "611025cc-ce2f-4cc6-bdb6-7d4c82c94e9d",
            },
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
            {
              image: "o6oxr4bug6s5nzulk1kk",
              name: "Z Venture Capital",
              permalink: "z-venture-capital",
              uuid: "8e4bc595-4e69-431a-894f-50476351d0f7",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "25000000000",
            value_usd: "18308339",
          },
          title: "Series B - Wrtn Technologies",
          uuid: "aa6b00d8-ef2b-465c-b837-9cead54486b0",
        },
        {
          announced_on: "2024-04-17",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Wrtn opens free AI search service",
          uuid: "a47b2ce7-c975-43ea-a6c0-f3ca1bdff37b",
        },
        {
          announced_on: "2024-03-28",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Wrtn opens free AI search service",
          uuid: "72fbaa04-2d55-4750-93f9-b0fd929d523f",
        },
        {
          announced_on: "2024-03-26",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Wrtn opens free AI search service",
          uuid: "c84d7492-a4f1-47d4-9960-3d6f9d723e29",
        },
        {
          announced_on: "2024-01-11",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Wrtn seeks to expand into overseas AI market in 2024",
          uuid: "0964e595-a152-4d1c-a468-79fb47779838",
        },
        {
          announced_on: "2024-01-11",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fg00pyoi8cdykk5rlivo",
              name: "Wrtn Technologies",
              permalink: "wrtn-technologies",
              uuid: "17cf0223-7504-4f61-92bd-7c03bb5222a1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Wrtn seeks to expand into overseas AI market in 2024",
          uuid: "1222f58e-171d-4c6d-9e13-ec4565596b72",
        },
      ],
      bombora: [
        {
          category: "technology",
          score: 84,
          topic: "Google (GOOG)",
          weeks_surging: 1,
          wow_growth: null,
        },
        {
          category: "dev_ops",
          score: 72,
          topic: "Server Software",
          weeks_surging: 2,
          wow_growth: -0.0886075949367089,
        },
      ],
      investors: [
        {
          funding_round: {
            id: "aa6b00d8-ef2b-465c-b837-9cead54486b0",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series B - Wrtn Technologies",
          },
          id: "ly-corporation-invested-in-wrtn-technologies-series-b--aa6b00d8--2d45164f",
          investor: {
            id: "ly-corporation",
            image_id: "e18768eecb7141ad87c48dbfc959fe95",
            type: "organization",
            value: "Line Yahoo",
          },
          lead_investor: null,
          type: "investment",
          value: "Line Yahoo investment in Series B - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "aa6b00d8-ef2b-465c-b837-9cead54486b0",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series B - Wrtn Technologies",
          },
          id: "z-venture-capital-invested-in-wrtn-technologies-series-b--aa6b00d8--4bb0a76f",
          investor: {
            id: "z-venture-capital",
            image_id: "o6oxr4bug6s5nzulk1kk",
            type: "organization",
            value: "Z Venture Capital",
          },
          lead_investor: null,
          type: "investment",
          value: "Z Venture Capital investment in Series B - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "aa6b00d8-ef2b-465c-b837-9cead54486b0",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series B - Wrtn Technologies",
          },
          id: "industrial-bank-of-korea-invested-in-wrtn-technologies-series-b--aa6b00d8--a67eb788",
          investor: {
            id: "industrial-bank-of-korea",
            image_id: "v1470074844/epbft3p4blgoqtgex5fq.png",
            type: "organization",
            value: "Industrial Bank of Korea",
          },
          lead_investor: null,
          type: "investment",
          value:
            "Industrial Bank of Korea investment in Series B - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "aa6b00d8-ef2b-465c-b837-9cead54486b0",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series B - Wrtn Technologies",
          },
          id: "brv-capital-management-invested-in-wrtn-technologies-series-b--aa6b00d8--befd39cf",
          investor: {
            id: "brv-capital-management",
            image_id: "utl4b1m383k7n82zrprb",
            type: "organization",
            value: "BRV Capital Management",
          },
          lead_investor: true,
          type: "investment",
          value:
            "BRV Capital Management investment in Series B - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "aa6b00d8-ef2b-465c-b837-9cead54486b0",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series B - Wrtn Technologies",
          },
          id: "capstone-partners-korea-invested-in-wrtn-technologies-series-b--aa6b00d8--ec9bbdf6",
          investor: {
            id: "capstone-partners-korea",
            image_id: "ieduoy7bvbkba3i4zdgu",
            type: "organization",
            value: "Capstone Partners",
          },
          lead_investor: null,
          type: "investment",
          value: "Capstone Partners investment in Series B - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "d6e7b90e-e751-4955-b751-73ac095e94da",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series A - Wrtn Technologies",
          },
          id: "z-venture-capital-invested-in-wrtn-technologies-series-a--d6e7b90e--7f3a03d5",
          investor: {
            id: "z-venture-capital",
            image_id: "o6oxr4bug6s5nzulk1kk",
            type: "organization",
            value: "Z Venture Capital",
          },
          lead_investor: null,
          type: "investment",
          value: "Z Venture Capital investment in Series A - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "d6e7b90e-e751-4955-b751-73ac095e94da",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series A - Wrtn Technologies",
          },
          id: "capstone-partners-korea-invested-in-wrtn-technologies-series-a--d6e7b90e--9d110d9d",
          investor: {
            id: "capstone-partners-korea",
            image_id: "ieduoy7bvbkba3i4zdgu",
            type: "organization",
            value: "Capstone Partners",
          },
          lead_investor: true,
          type: "investment",
          value: "Capstone Partners investment in Series A - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "d6e7b90e-e751-4955-b751-73ac095e94da",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series A - Wrtn Technologies",
          },
          id: "hana-securities-invested-in-wrtn-technologies-series-a--d6e7b90e--b5d6642e",
          investor: {
            id: "hana-securities",
            image_id: "vyf8hpxnev4lotzqtqyp",
            type: "organization",
            value: "Hana Securities",
          },
          lead_investor: null,
          type: "investment",
          value: "Hana Securities investment in Series A - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "d6e7b90e-e751-4955-b751-73ac095e94da",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series A - Wrtn Technologies",
          },
          id: "keb-hana-bank-invested-in-wrtn-technologies-series-a--d6e7b90e--cc612d32",
          investor: {
            id: "keb-hana-bank",
            image_id: "qawlrq7shoamomwhcnvs",
            type: "organization",
            value: "KEB Hana Bank",
          },
          lead_investor: null,
          type: "investment",
          value: "KEB Hana Bank investment in Series A - Wrtn Technologies",
        },
        {
          funding_round: {
            id: "d6e7b90e-e751-4955-b751-73ac095e94da",
            image_id: "fg00pyoi8cdykk5rlivo",
            type: "funding_round",
            value: "Series A - Wrtn Technologies",
          },
          id: "kb-securities-invested-in-wrtn-technologies-series-a--d6e7b90e--f312e035",
          investor: {
            id: "kb-securities",
            image_id: "yyu8j0guzd0wrgykrdwx",
            type: "organization",
            value: "KB Securities",
          },
          lead_investor: null,
          type: "investment",
          value: "KB Securities investment in Series A - Wrtn Technologies",
        },
      ],
      acquisitions: [],
      funds_raised: [],
      investments: [],
      apptopia: [],
      current_advisors: [],
      exits: [],
      news: [
        {
          date: "2024-06-30",
          organization: "Wrtn Technologies",
          publisher: "Korea JoongAng Daily",
          thumbnail_url: null,
          title:
            "Tech startup Wrtn Technologies raises $18 million for AI push",
          url: "https://koreajoongangdaily.joins.com/news/2024-06-07/business/industry/Tech-startup-Wrtn-Technologies-raises-18-billion-for-AI-push/2063744",
        },
        {
          date: "2024-06-30",
          organization: "Wrtn Technologies",
          publisher: "Bloomberg.com",
          thumbnail_url: null,
          title:
            "Korean AI Startup Wrtn Raises Funds in Round Led by BRV Capital",
          url: "https://www.bloomberg.com/news/articles/2024-06-07/korean-ai-startup-wrtn-raises-funds-in-round-led-by-brv-capital",
        },
        {
          date: "2024-06-30",
          organization: "Wrtn Technologies",
          publisher: "Tech in Asia",
          thumbnail_url: null,
          title: "Connecting Asia's startup ecosystem",
          url: "https://www.techinasia.com/south-korean-ai-firm-wrtn-raises-18m-expand-middle-east-sea",
        },
        {
          date: "2024-06-24",
          organization: "Wrtn Technologies",
          publisher: "Korea JoongAng Daily",
          thumbnail_url:
            "https://koreajoongangdaily.joins.com/news/2024-06-07/business/industry/Tech-startup-Wrtn-Technologies-raises-18-billion-for-AI-push/2063744",
          title:
            "Tech startup Wrtn Technologies raises $18 million for AI push",
          url: "https://koreajoongangdaily.joins.com/news/2024-06-07/business/industry/Tech-startup-Wrtn-Technologies-raises-18-billion-for-AI-push/2063744",
        },
        {
          date: "2024-06-06",
          organization: "BRV Capital Management",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
        {
          date: "2024-04-17",
          organization: "Wrtn Technologies",
          publisher: "KED Global",
          thumbnail_url: null,
          title: "Wrtn opens free AI search service",
          url: "https://www.kedglobal.com/artificial-intelligence/newsView/ked202403260013",
        },
        {
          date: "2024-03-28",
          organization: "Wrtn Technologies",
          publisher: "KED Global",
          thumbnail_url: null,
          title: "Wrtn opens free AI search service",
          url: "https://www.kedglobal.com/artificial-intelligence/newsView/ked202403260013",
        },
        {
          date: "2024-03-26",
          organization: "Wrtn Technologies",
          publisher: "KED Global",
          thumbnail_url:
            "https://www.kedglobal.com/artificial-intelligence/newsView/ked202403260013",
          title: "Wrtn opens free AI search service",
          url: "https://www.kedglobal.com/artificial-intelligence/newsView/ked202403260013",
        },
        {
          date: "2024-01-11",
          organization: "Wrtn Technologies",
          publisher: "The Korea Times",
          thumbnail_url:
            "https://www.koreatimes.co.kr/www/tech/2024/01/129_365399.html",
          title: "Wrtn seeks to expand into overseas AI market in 2024",
          url: "https://www.koreatimes.co.kr/www/tech/2024/01/129_365399.html",
        },
        {
          date: "2024-01-11",
          organization: "Wrtn Technologies",
          publisher: "The Korea Times",
          thumbnail_url:
            "https://www.koreatimes.co.kr/www/tech/2024/01/129_365399.html",
          title: "Wrtn seeks to expand into overseas AI market in 2024",
          url: "https://www.koreatimes.co.kr/www/tech/2024/01/129_365399.html",
        },
      ],
      aberdeen_it_spend: null,
      headquarters_regions: [
        {
          id: "asia-pacific",
          value: "Asia-Pacific (APAC)",
        },
      ],
      financials_highlights: {
        funding_total: {
          value: 44300000000,
          currency: "KRW",
          value_usd: 33273959,
        },
        num_funding_rounds: 5,
        num_investors: 13,
        num_lead_investors: 4,
      },
      ipqwery: {
        ipqwery_popular_patent_category: "g06",
        ipqwery_popular_trademark_class: "c9",
        ipqwery_num_trademark_registered: 3,
        ipqwery_num_patent_granted: 2,
      },
      overview_highlights: {
        num_org_similarities: 10,
        num_current_positions: 1,
        num_investors: 13,
        num_contacts: 1,
        funding_total: {
          value: 44300000000,
          currency: "KRW",
          value_usd: 33273959,
        },
      },
      people_highlights: {
        num_contacts: 1,
        num_current_positions: 1,
      },
      technology_highlights: {
        builtwith_num_technologies_used: 2,
        semrush_visits_latest_month: 17468,
        semrush_visits_mom_pct: -0.691987586401467,
      },
      founders: [
        {
          id: "seyoung-lee-1380",
          type: "person",
          value: "Seyoung Lee",
        },
      ],
    },
  },
};

// Type Check
const linkedIn: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "b1411b16-d301-4403-a637-ad902d79f53a",
      name: "Linked",
      url: "https://www.crunchbase.com/organization/linked",
      rank_company: 194358,
      locations: [
        {
          value: "Indianapolis",
          location_type: "city",
        },
        {
          value: "Indiana",
          location_type: "region",
        },
        {
          value: "United States",
          location_type: "country",
        },
        {
          value: "North America",
          location_type: "continent",
        },
      ],
      address: "Indianapolis, Indiana, United States, North America",
      about: "Linked is an operator of a consumer networking platform.",
      full_description:
        "Operator of a consumer networking platform. The company links people, skills and opportunities to create crowd commerce business creation system. It matches, tracks and rewards members through an integrated network of products and services.",
      industries: ["Internet of Things"],
      operating_status: "active",
      founded_date: "1996-01-01",
      company_type: "for_profit",
      social_media: [
        {
          name: "linkedin",
          link: "https://www.linkedin.com/company/linked-com/",
        },
      ],
      num_employees: null,
      website: "http://linked.com/",
      ipo_status: "private",
      contact_email: null,
      contact_phone: null,
      funding_info: [
        {
          title: "Internet of Things Companies (Top 10K)",
          org_num: 9709,
          org_num_investors: 13818,
          org_funding_total: {
            value_usd: 63388602691,
            currency: "USD",
            value: 63388602691,
          },
        },
        {
          title: "Indiana Companies (Top 10K)",
          org_num: 9897,
          org_num_investors: 2217,
          org_funding_total: {
            value_usd: 37020300405,
            currency: "USD",
            value: 37020300405,
          },
        },
        {
          title: "Indianapolis Companies",
          org_num: 5079,
          org_num_investors: 1120,
          org_funding_total: {
            value_usd: 16948338161,
            currency: "USD",
            value: 16948338161,
          },
        },
        {
          title: "Great Lakes Internet of Things Companies",
          org_num: 889,
          org_num_investors: 780,
          org_funding_total: {
            value_usd: 1883671983,
            currency: "USD",
            value: 1883671983,
          },
        },
      ],
      similar_companies: [
        {
          name: "Drivense",
          url: "https://www.crunchbase.com/organization/drivense",
        },
        {
          name: "Bletwork",
          url: "https://www.crunchbase.com/organization/bletwork",
        },
        {
          name: "Stevva",
          url: "https://www.crunchbase.com/organization/stevva",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/t03is2snsi39o55kcoig",
      semrush_monthly_visits: 64791,
      semrush_monthly_visits_growth: -0.10294076925207,
      semrush_last_updated: "2024-07-15",
      num_contacts: 84,
      num_employee_profiles: 11,
      total_active_products: 10,
      num_news: 4,
      funding_rounds: {
        last_funding_at: null,
        last_funding_type: null,
        num_funding_rounds: null,
        value: {
          currency: null,
          value: null,
          value_usd: null,
        },
      },
      bombora_last_updated: "2024-10-13",
      num_investors: null,
      legal_name: null,
      num_event_appearances: null,
      num_acquisitions: null,
      num_investments: null,
      num_advisor_positions: null,
      num_exits: null,
      num_investments_lead: null,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: null,
      contacts: [
        {
          name: "Diane Rosen",
          linkedin_id: "diane-rosen-5218a01a",
          levels: ["l_300_director"],
          departments: ["management"],
        },
      ],
      event_appearances: [],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: null,
        stock_link: null,
        stock_symbol: null,
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [],
      semrush_location_list: [
        {
          locations: [
            {
              name: "India",
              permalink: "india",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 67446,
          rank_mom_pct: -0.521371039278998,
          visits_mom_pct: 2.95867993999727,
          visits_pct: 0.448040622926024,
        },
        {
          locations: [
            {
              name: "United States",
              permalink: "united-states",
            },
            {
              name: "North America",
              permalink: "north-america",
            },
          ],
          rank: 361304,
          rank_mom_pct: 0.55693546093484,
          visits_mom_pct: -0.311841174060416,
          visits_pct: 0.285147628528654,
        },
        {
          locations: [
            {
              name: "United Arab Emirates",
              permalink: "united-arab-emirates",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 34640,
          rank_mom_pct: -0.108526134287258,
          visits_mom_pct: 0.0932254196642686,
          visits_pct: 0.0562886820700406,
        },
        {
          locations: [
            {
              name: "Singapore",
              permalink: "singapore",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 70377,
          rank_mom_pct: -0.791137042851674,
          visits_mom_pct: 6.90588235294118,
          visits_pct: 0.031115432698986,
        },
        {
          locations: [
            {
              name: "Germany",
              permalink: "germany",
            },
            {
              name: "Europe",
              permalink: "europe",
            },
          ],
          rank: 405227,
          rank_mom_pct: 0.300968598405681,
          visits_mom_pct: -0.487415809996455,
          visits_pct: 0.0223179145251655,
        },
      ],
      siftery_products: [
        {
          product_num_customers: 439507,
          status: "using",
          title: "HTML5",
        },
        {
          product_num_customers: null,
          status: "not_using",
          title: "HubSpot Forms",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "Cloudflare CDN",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "Matomo (Formerly Piwik)",
        },
        {
          product_num_customers: null,
          status: "not_using",
          title: "Amazon EC2",
        },
        {
          product_num_customers: null,
          status: "not_using",
          title: "Apache Server",
        },
        {
          product_num_customers: null,
          status: "not_using",
          title: "Google Fonts",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "Google Analytics",
        },
        {
          product_num_customers: null,
          status: "not_using",
          title: "HubSpot Marketing Hub",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "jQuery",
        },
      ],
      funding_rounds_list: [],
      overview_timeline: [
        {
          announced_on: "2024-09-29",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "t03is2snsi39o55kcoig",
              name: "Linked",
              permalink: "linked",
              uuid: "b1411b16-d301-4403-a637-ad902d79f53a",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "How LinkedIn Changed My Life",
          uuid: "94fa33d7-f82b-420c-8e2f-3508aeafe179",
        },
        {
          announced_on: "2024-09-10",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "t03is2snsi39o55kcoig",
              name: "Linked",
              permalink: "linked",
              uuid: "b1411b16-d301-4403-a637-ad902d79f53a",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "**Linked.bg Launches to Enhance Professional Networking in Bulgaria**",
          uuid: "530e2cfc-7063-46ab-8a2f-0e10890f0ca9",
        },
        {
          announced_on: "2024-02-08",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "t03is2snsi39o55kcoig",
              name: "Linked",
              permalink: "linked",
              uuid: "b1411b16-d301-4403-a637-ad902d79f53a",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Hidden Path lays off 44",
          uuid: "a5c2cce0-c361-40eb-b82d-3f24fb638e64",
        },
        {
          announced_on: "2024-01-24",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "t03is2snsi39o55kcoig",
              name: "Linked",
              permalink: "linked",
              uuid: "b1411b16-d301-4403-a637-ad902d79f53a",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "'Mother of All Data Breaches' leaks 26 billion records from Linked, X, Snap",
          uuid: "fbbc385d-a0ec-42bc-bfa9-e582820deca2",
        },
      ],
      bombora: [
        {
          category: "hardware",
          score: 97,
          topic: "Graphics Processing Unit (GPU)",
          weeks_surging: 2,
          wow_growth: 0.127906976744186,
        },
        {
          category: "hardware",
          score: 94,
          topic: "Monitors",
          weeks_surging: 2,
          wow_growth: -0.06,
        },
        {
          category: "hardware",
          score: 85,
          topic: "Hardware/Peripherals",
          weeks_surging: 2,
          wow_growth: -0.0760869565217391,
        },
        {
          category: "software_dev",
          score: 85,
          topic: "Version Control",
          weeks_surging: 1,
          wow_growth: null,
        },
        {
          category: "hiring_training",
          score: 83,
          topic: "Job Descriptions",
          weeks_surging: 2,
          wow_growth: -0.0119047619047619,
        },
        {
          category: "security",
          score: 82,
          topic: "User Account Control (UAC)",
          weeks_surging: 2,
          wow_growth: 0.261538461538462,
        },
        {
          category: "technology",
          score: 79,
          topic: "eBay (EBAY)",
          weeks_surging: 2,
          wow_growth: 0.0128205128205128,
        },
        {
          category: "technology",
          score: 77,
          topic: "ArcGIS",
          weeks_surging: 1,
          wow_growth: null,
        },
        {
          category: "hardware",
          score: 76,
          topic: "Single-Board Computer (SBC)",
          weeks_surging: 2,
          wow_growth: -0.0843373493975904,
        },
        {
          category: "sales",
          score: 75,
          topic: "Product Investment",
          weeks_surging: 2,
          wow_growth: -0.0853658536585366,
        },
      ],
      investors: [],
      acquisitions: [],
      funds_raised: [],
      investments: [],
      apptopia: [],
      current_advisors: [],
      exits: [],
      news: [
        {
          date: "2024-09-29",
          organization: "Linked",
          publisher: "Medium",
          thumbnail_url: null,
          title: "How LinkedIn Changed My Life",
          url: "https://medium.com/@simonwparsons/how-linkedin-changed-my-life-40ffcdcc0977?source=topic_portal_recommended_stories------entrepreneurship---3-84----------entrepreneurship----------7b4fa860_cb2e_4524_9007_934b5f2eaaf4-------",
        },
        {
          date: "2024-09-10",
          organization: "Linked",
          publisher: "Japan Web Review",
          thumbnail_url: null,
          title:
            "**Linked.bg Launches to Enhance Professional Networking in Bulgaria**",
          url: "https://japan-pc.jp/linked-bg-launches-to-enhance-professional-networking-in-bulgaria/",
        },
        {
          date: "2024-02-08",
          organization: "Linked",
          publisher: "GamesIndustry.biz",
          thumbnail_url:
            "https://assetsio.reedpopcdn.com/hiddenpath.jpg?width=720&quality=70&format=jpg&dpr=2&auto=webp",
          title: "Hidden Path lays off 44",
          url: "https://www.gamesindustry.biz/hidden-path-lays-off-44",
        },
        {
          date: "2024-01-24",
          organization: "Linked",
          publisher: "Techlusive",
          thumbnail_url:
            "https://st1.techlusive.in/wp-content/uploads/2023/04/data-leak.jpg?impolicy=Medium_Widthonly&w=600",
          title:
            "'Mother of All Data Breaches' leaks 26 billion records from Linked, X, Snap",
          url: "https://www.techlusive.in/news/mother-of-all-data-breaches-reveal-26-billion-records-from-linked-x-snap-1455409/",
        },
      ],
      aberdeen_it_spend: {
        value: 1518225,
        currency: "USD",
        value_usd: 1518225,
      },
      headquarters_regions: [
        {
          id: "great-lakes-north-america",
          value: "Great Lakes",
        },
        {
          id: "midwestern-united-states",
          value: "Midwestern US",
        },
      ],
      financials_highlights: {},
      ipqwery: {},
      overview_highlights: {
        num_contacts: 84,
        num_org_similarities: 3,
      },
      people_highlights: {
        num_contacts: 84,
      },
      technology_highlights: {
        builtwith_num_technologies_used: 7,
        semrush_visits_latest_month: 64791,
        semrush_visits_mom_pct: -0.10294076925207,
        siftery_num_products: 6,
      },
      founders: [],
    },
  },
};

// Type Check
const amazon: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
      name: "Amazon",
      url: "https://www.crunchbase.com/organization/amazon",
      rank_company: 3,
      locations: [
        {
          value: "Seattle",
          location_type: "city",
        },
        {
          value: "Washington",
          location_type: "region",
        },
        {
          value: "United States",
          location_type: "country",
        },
        {
          value: "North America",
          location_type: "continent",
        },
      ],
      address: "Seattle, Washington, United States, North America",
      about:
        "Amazon is a tech firm with a focus on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      full_description:
        "Amazon operates a vast online marketplace where customers can purchase a wide variety of products, including electronics, books, apparel, household goods, and more. The company has a robust logistics and delivery network, allowing efficient shipping and on-time delivery to customers.",
      industries: ["Crowdsourcing", "Delivery", "E-Commerce", "Retail"],
      operating_status: "active",
      founded_date: "1994-07-05",
      company_type: "for_profit",
      social_media: [
        {
          name: "facebook",
          link: "https://www.facebook.com/Amazon",
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/company/amazon",
        },
        {
          name: "twitter",
          link: "https://x.com/amazon",
        },
      ],
      num_employees: "",
      website: "https://amazon.com",
      ipo_status: "public",
      contact_email: null,
      contact_phone: "+1-888-533-5659",
      funding_info: [
        {
          title: "Investors Active in Europe (Top 10K)",
          org_num: 9959,
          org_num_investors: 13482,
          org_funding_total: {
            value_usd: 1723902560695,
            currency: "USD",
            value: 1723902560695,
          },
        },
        {
          title: "Investors Active in Chennai, Tamil Nadu",
          org_num: 730,
          org_num_investors: 681,
          org_funding_total: {
            value_usd: 53821663083,
            currency: "USD",
            value: 53821663083,
          },
        },
        {
          title: "Companies That Exited in 1997",
          org_num: 1444,
          org_num_investors: 280,
          org_funding_total: {
            value_usd: 82447578016,
            currency: "USD",
            value: 82447578016,
          },
        },
        {
          title: "E-Commerce Public Companies With More Than $1B in Revenue",
          org_num: 127,
          org_num_investors: 352,
          org_funding_total: {
            value_usd: 102716015081,
            currency: "USD",
            value: 102716015081,
          },
        },
      ],
      similar_companies: [
        {
          name: "Instamart",
          url: "https://www.crunchbase.com/organization/instamart-ru",
        },
        {
          name: "Bloomscape",
          url: "https://www.crunchbase.com/organization/bloomscape",
        },
        {
          name: "Canada Drives",
          url: "https://www.crunchbase.com/organization/canada-drives",
        },
        {
          name: "Mystery Tackle Box",
          url: "https://www.crunchbase.com/organization/mystery-tackle-box-b8bd",
        },
        {
          name: "Alibaba Group",
          url: "https://www.crunchbase.com/organization/alibaba",
        },
        {
          name: "Ocado Group",
          url: "https://www.crunchbase.com/organization/ocado",
        },
        {
          name: "zulily",
          url: "https://www.crunchbase.com/organization/zulily",
        },
        {
          name: "CommerceHub",
          url: "https://www.crunchbase.com/organization/commercehub",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/mwsza2s38epb8olssp3j",
      semrush_monthly_visits: 3248571229,
      semrush_monthly_visits_growth: 0.0198101146914273,
      semrush_last_updated: "2024-07-15",
      num_contacts: 9797,
      num_employee_profiles: 11,
      total_active_products: 10,
      num_news: 61725,
      funding_rounds: {
        last_funding_at: "2023-01-03",
        last_funding_type: "post_ipo_debt",
        num_funding_rounds: 3,
        value: {
          currency: "USD",
          value: 8108000000,
          value_usd: 8108000000,
        },
      },
      bombora_last_updated: "2024-10-13",
      num_investors: 4,
      legal_name: "Amazon.com, Inc.",
      num_event_appearances: 112,
      num_acquisitions: 102,
      num_investments: 153,
      num_advisor_positions: 33,
      num_exits: 34,
      num_investments_lead: 81,
      num_sub_organizations: 33,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: 21,
      num_funds: null,
      stock_symbol: "NASDAQ:AMZN",
      contacts: [
        {
          name: "Austin Bower",
          linkedin_id: "austin-bower-40988a168",
          levels: ["l_500_exec"],
          departments: ["management"],
        },
      ],
      event_appearances: [
        {
          appearance_type: "sponsor",
          event: "WEB SUMMIT 2024 - Lisbon",
          event_starts_on: "2024-11-11",
          image: "647b0d85c1a44d3796cc7bd9fdc7759b",
          permalink: "web-summit-2024-lisbon-997b",
        },
        {
          appearance_type: "sponsor",
          event: "Paris Peace Forum",
          event_starts_on: "2022-11-11",
          image: "sggsdjkut9ftgspmprwz",
          permalink: "paris-peace-forum",
        },
        {
          appearance_type: "sponsor",
          event: "Reinforcement Learning Summit, Toronto",
          event_starts_on: "2022-11-09",
          image: "fxiknijzrq4ctrrdwipo",
          permalink: "reinforcement-learning-summit-toronto",
        },
        {
          appearance_type: "sponsor",
          event: "Cannes Lions International Festival of Creativity 2021",
          event_starts_on: "2022-06-21",
          image: "yvlwihayq9xitw5rmy2x",
          permalink: "cannes-lions-international-festival-of-creativity-2018",
        },
        {
          appearance_type: "sponsor",
          event: "Product-led Summit Amsterdam",
          event_starts_on: "2022-05-17",
          image: "aqy7wzhpqc514iw7nvwj",
          permalink: "product-led-summit-amsterdam",
        },
        {
          appearance_type: "speaker",
          event: "2022 Master Data Marathon 4.0",
          event_starts_on: "2022-04-06",
          image: "dwtl11ivhjttl5t79qiz",
          permalink: "2022-master-data-marathon",
        },
        {
          appearance_type: "sponsor",
          event: "Deep Learning Summit, Toronto 2020",
          event_starts_on: "2021-10-19",
          image: "l1aimzuvuk9epioykdvn",
          permalink: "deep-learning-summit-toronto-2020",
        },
        {
          appearance_type: "sponsor",
          event: "ICA Summit 2021",
          event_starts_on: "2021-10-13",
          image: "hiwi3xmzhrv64odh376k",
          permalink: "ica-summit-2021",
        },
      ],
      sub_organizations: [
        {
          ownee: "Zoox",
          ownee_permalink: "zoox",
          ownership_type: "subsidiary",
          title: "Amazon owns Zoox",
        },
        {
          ownee: "Woot",
          ownee_permalink: "woot",
          ownership_type: "subsidiary",
          title: "Amazon owns Woot",
        },
        {
          ownee: "Whole Foods Market",
          ownee_permalink: "whole-foods-market",
          ownership_type: "subsidiary",
          title: "Amazon owns Whole Foods Market",
        },
        {
          ownee: "Twitch",
          ownee_permalink: "twitch",
          ownership_type: "subsidiary",
          title: "Amazon owns Twitch",
        },
        {
          ownee: "The Book Depository",
          ownee_permalink: "the-book-depository",
          ownership_type: "subsidiary",
          title: "Amazon owns The Book Depository",
        },
        {
          ownee: "The Alexa Accelerator",
          ownee_permalink: "the-alexa-accelerator",
          ownership_type: "subsidiary",
          title: "Amazon owns The Alexa Accelerator",
        },
        {
          ownee: "IMDB",
          ownee_permalink: "imdb",
          ownership_type: "subsidiary",
          title: "Amazon owns IMDB",
        },
        {
          ownee: "Goodreads",
          ownee_permalink: "goodreads",
          ownership_type: "subsidiary",
          title: "Amazon owns Goodreads",
        },
        {
          ownee: "dpreview",
          ownee_permalink: "dpreview",
          ownership_type: "subsidiary",
          title: "Amazon owns dpreview",
        },
        {
          ownee: "Comixology",
          ownee_permalink: "comixology",
          ownership_type: "subsidiary",
          title: "Amazon owns Comixology",
        },
      ],
      alumni: [],
      diversity_investments: [
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "phaidra-grant--3ecdf66e",
            image_id: "ctl1oezne6koh6idewyx",
            type: "funding_round",
            value: "Grant - Phaidra",
          },
          id: "amazon-invested-in-phaidra-grant--3ecdf66e--95bb35a9",
          organization: {
            id: "phaidra",
            image_id: "ctl1oezne6koh6idewyx",
            type: "organization",
            value: "Phaidra",
          },
          organization_diversity_spotlights: [
            {
              id: "women-founded",
              type: "diversity_spotlight",
              value: "Women Founded",
            },
          ],
          type: "investment",
          value: "Amazon investment in Grant - Phaidra",
        },
        {
          announced_on: "2024-08-09",
          funding_round: {
            id: "myavana-seed--84b514fd",
            image_id: "v12tdvwgssrn1xjyrdma",
            type: "funding_round",
            value: "Seed Round - MyAvana",
          },
          id: "amazon-invested-in-myavana-seed--84b514fd--8ada756e",
          organization: {
            id: "myavana",
            image_id: "v12tdvwgssrn1xjyrdma",
            type: "organization",
            value: "MyAvana",
          },
          organization_diversity_spotlights: [
            {
              id: "women-founded",
              type: "diversity_spotlight",
              value: "Women Founded",
            },
            {
              id: "women-led",
              type: "diversity_spotlight",
              value: "Women Led",
            },
          ],
          type: "investment",
          value: "Amazon investment in Seed Round - MyAvana",
        },
        {
          announced_on: "2024-07-05",
          funding_round: {
            id: "neiman-marcus-corporate-round--587a5d32",
            image_id: "72c367dcc64147588e56a49841ee2b68",
            type: "funding_round",
            value: "Corporate Round - Neiman Marcus Group",
          },
          id: "amazon-invested-in-neiman-marcus-corporate-round--587a5d32--28f161f4",
          organization: {
            id: "neiman-marcus",
            image_id: "72c367dcc64147588e56a49841ee2b68",
            type: "organization",
            value: "Neiman Marcus Group",
          },
          organization_diversity_spotlights: [
            {
              id: "women-led",
              type: "diversity_spotlight",
              value: "Women Led",
            },
          ],
          type: "investment",
          value: "Amazon investment in Corporate Round - Neiman Marcus Group",
        },
        {
          announced_on: "2024-05-21",
          funding_round: {
            id: "scale-2-series-f--65d29e39",
            image_id: "wvgipbxfzsc4ehfzrrit",
            type: "funding_round",
            value: "Series F - Scale AI",
          },
          id: "amazon-invested-in-scale-2-series-f--65d29e39--a1970d98",
          organization: {
            id: "scale-2",
            image_id: "wvgipbxfzsc4ehfzrrit",
            type: "organization",
            value: "Scale AI",
          },
          organization_diversity_spotlights: [
            {
              id: "women-founded",
              type: "diversity_spotlight",
              value: "Women Founded",
            },
          ],
          type: "investment",
          value: "Amazon investment in Series F - Scale AI",
        },
        {
          announced_on: "2023-09-25",
          funding_round: {
            id: "anthropic-corporate-round--b3797b56",
            image_id: "02bb58922b3d4d64b082982f275896c8",
            type: "funding_round",
            value: "Corporate Round - Anthropic",
          },
          id: "amazon-invested-in-anthropic-corporate-round--b3797b56--5014b2f5",
          organization: {
            id: "anthropic",
            image_id: "02bb58922b3d4d64b082982f275896c8",
            type: "organization",
            value: "Anthropic",
          },
          organization_diversity_spotlights: [
            {
              id: "women-founded",
              type: "diversity_spotlight",
              value: "Women Founded",
            },
          ],
          type: "investment",
          value: "Amazon investment in Corporate Round - Anthropic",
        },
        {
          announced_on: "2022-04-22",
          funding_round: {
            id: "agility-robotics-series-b--da34c226",
            image_id: "v1486673545/zp5gqsadbegx96o5esbv.png",
            type: "funding_round",
            value: "Series B - Agility Robotics",
          },
          id: "amazon-invested-in-agility-robotics-series-b--da34c226--1c0c9e0d",
          organization: {
            id: "agility-robotics",
            image_id: "v1486673545/zp5gqsadbegx96o5esbv.png",
            type: "organization",
            value: "Agility Robotics",
          },
          organization_diversity_spotlights: [
            {
              id: "women-led",
              type: "diversity_spotlight",
              value: "Women Led",
            },
          ],
          type: "investment",
          value: "Amazon investment in Series B - Agility Robotics",
        },
        {
          announced_on: "2022-04-21",
          funding_round: {
            id: "modjoul-series-unknown--aa4bd5d6",
            image_id: "v1505815439/hhyy30q9qntvi3hrwivo.png",
            type: "funding_round",
            value: "Venture Round - Modjoul",
          },
          id: "amazon-invested-in-modjoul-series-unknown--aa4bd5d6--6f33416d",
          organization: {
            id: "modjoul",
            image_id: "v1505815439/hhyy30q9qntvi3hrwivo.png",
            type: "organization",
            value: "Modjoul",
          },
          organization_diversity_spotlights: [
            {
              id: "women-founded",
              type: "diversity_spotlight",
              value: "Women Founded",
            },
          ],
          type: "investment",
          value: "Amazon investment in Venture Round - Modjoul",
        },
        {
          announced_on: "2020-11-04",
          funding_round: {
            id: "mammoth-biosciences-series-c--4245cf3f",
            image_id: "v1504952332/ksom0huz0mevn5kjsiax.png",
            type: "funding_round",
            value: "Series C - Mammoth Biosciences",
          },
          id: "amazon-invested-in-mammoth-biosciences-series-c--4245cf3f--7b9fc1ce",
          organization: {
            id: "mammoth-biosciences",
            image_id: "v1504952332/ksom0huz0mevn5kjsiax.png",
            type: "organization",
            value: "Mammoth Biosciences",
          },
          organization_diversity_spotlights: [
            {
              id: "women-founded",
              type: "diversity_spotlight",
              value: "Women Founded",
            },
          ],
          type: "investment",
          value: "Amazon investment in Series C - Mammoth Biosciences",
        },
        {
          announced_on: "2020-09-15",
          funding_round: {
            id: "pachama-seed--3a712242",
            image_id: "iok7dhmzso3kvt06lxwg",
            type: "funding_round",
            value: "Seed Round - Pachama",
          },
          id: "amazon-invested-in-pachama-seed--3a712242--a7c32a39",
          organization: {
            id: "pachama",
            image_id: "iok7dhmzso3kvt06lxwg",
            type: "organization",
            value: "Pachama",
          },
          organization_diversity_spotlights: [
            {
              id: "hispanic-or-latinx-founded",
              type: "diversity_spotlight",
              value: "Hispanic / Latine Founded",
            },
            {
              id: "hispanic-or-latinx-origin-led",
              type: "diversity_spotlight",
              value: "Hispanic / Latine Led",
            },
          ],
          type: "investment",
          value: "Amazon investment in Seed Round - Pachama",
        },
        {
          announced_on: "2017-06-27",
          funding_round: {
            id: "clique-media-3-series-c--e45c3572",
            image_id: "r6tjejrzm2hm4909lgfg",
            type: "funding_round",
            value: "Series C - Clique",
          },
          id: "amazon-invested-in-clique-media-3-series-c--e45c3572--d723996d",
          organization: {
            id: "clique-media-3",
            image_id: "r6tjejrzm2hm4909lgfg",
            type: "organization",
            value: "Clique",
          },
          organization_diversity_spotlights: [
            {
              id: "women-founded",
              type: "diversity_spotlight",
              value: "Women Founded",
            },
            {
              id: "women-led",
              type: "diversity_spotlight",
              value: "Women Led",
            },
          ],
          type: "investment",
          value: "Amazon investment in Series C - Clique",
        },
      ],
      funds: [
        {
          announced_on: "2022-04-21",
          name: "Amazon Industrial Innovation Fund",
          image: "mwsza2s38epb8olssp3j",
        },
      ],
      layoff: [
        {
          key_event_date: "2024-05-16",
          label:
            "Amazon axed more than 100 customer service managers in CEO Andy Jassy’s latest job cuts",
          link: "https://fortune.com/2024/05/15/amazon-customer-service-manager-layoffs/",
          uuid: "7ad9f990-c7b2-4280-ad0f-e8b395986fc2",
        },
        {
          key_event_date: "2024-04-03",
          label:
            "Amazon is cutting hundreds of jobs in its cloud computing unit AWS",
          link: "https://neworleanscitybusiness.com/blog/2024/04/03/amazon-is-cutting-hundreds-of-jobs-in-its-cloud-computing-unit-aws/",
          uuid: "00ac635e-c962-4671-bfce-33424b33e1f2",
        },
        {
          key_event_date: "2024-01-19",
          label: "Amazon lays off about 5% of staff at Buy with Prime unit",
          link: "https://www.straitstimes.com/business/amazon-lays-off-about-5-of-staff-at-buy-with-prime-unit",
          uuid: "3177e176-c34e-4a02-bf9b-fd55681217ce",
        },
        {
          key_event_date: "2023-11-17",
          label:
            'Amazon will lay off "several hundred" Alexa workers to focus more on generative AI projects',
          link: "https://www.neowin.net/news/amazon-will-lay-off-several-hundred-alexa-workers-to-focus-more-on-generative-ai-projects/",
          uuid: "83b175da-9cbe-45b1-966a-fd9784bf2dfe",
        },
        {
          key_event_date: "2023-07-26",
          label: "Amazon Fresh is laying off hundreds of store workers",
          link: "https://www.businessinsider.com/amazon-fresh-is-laying-off-hundreds-of-store-workers-2023-7",
          uuid: "5a0310aa-18fc-4e55-b6c0-5da65c75aacb",
        },
        {
          key_event_date: "2023-04-26",
          label:
            "Amazon closing Halo health division, lays off staff while offering hardware refunds",
          link: "https://tcrn.ch/41XVLbC",
          uuid: "dffaddb0-9af4-4212-8253-d0eef4672dd2",
        },
        {
          key_event_date: "2023-03-20",
          label:
            "Amazon to lay off 9,000 more workers in addition to earlier cuts",
          link: "https://www.cnbc.com/2023/03/20/amazon-layoffs-company-to-cut-off-9000-more-workers.html",
          uuid: "dacd6817-ccfd-46f9-a21b-ad584408d6a3",
        },
        {
          key_event_date: "2023-03-20",
          label:
            "Amazon to lay off 9,000 employees on top of 18,000 in January",
          link: "http://dlvr.it/SlBSDl",
          uuid: "f36a2f38-109d-442f-98e8-4f6da260b7e4",
        },
        {
          key_event_date: "2023-01-20",
          label:
            "Amazon's drone delivery division was reportedly hit hard by layoffs",
          link: "https://www.engadget.com/amazon-prime-air-drone-delivery-lay-offs-192841878.html?_fsig=ONhrWWOB0O7GRWaRywcLww--~A",
          uuid: "29174d4b-a68c-4849-8e50-703b6d2386e5",
        },
        {
          key_event_date: "2023-01-10",
          label: "Amazon to close Gourock plant with loss of 300 jobs",
          link: "https://www.heraldscotland.com/business_hq/23239851.amazon-close-gourock-plant-loss-300-local-jobs/",
          uuid: "7569c779-5497-4ac2-a192-203eabe0efb0",
        },
      ],
      ipo: {
        date: "1997-05-15",
        stock_link: "https://www.google.com/finance?q=NASDAQ:AMZN",
        stock_symbol: "NASDAQ:AMZN",
      },
      funds_total: {
        value: 1000000000,
        currency: "USD",
        value_usd: 1000000000,
      },
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [
        {
          image: "v1398281117/ehz9tps4epe3qiyzoeud.jpg",
          name: "Andrew Jassy",
          permalink: "andrew-jassy",
          title: "Andrew Jassy President, and CEO @ Amazon",
        },
        {
          image: "v1487985168/ytuofcigxo6oaznmlpwn.png",
          name: "Jeff Bezos",
          permalink: "jeff-bezos",
          title: "Jeff Bezos Founder @ Amazon",
        },
        {
          image: "v1461665033/zjgid5kuk5l53u6yqekz.png",
          name: "Brian Olsavsky",
          permalink: "brian-olsavsky",
          title: "Brian Olsavsky CFO @ Amazon",
        },
        {
          image: "ab3d65afa4f84eb9af15b30a3042a47e",
          name: "Douglas J. Herrington",
          permalink: "douglas-j-herrington",
          title: "Douglas J. Herrington CEO, Worldwide Amazon Stores @ Amazon",
        },
        {
          image: "e3f78131430c49188d8f4ae0144feb6d",
          name: "Matt Garman",
          permalink: "matt-garman",
          title: "Matt Garman CEO, Amazon Web Services @ Amazon",
        },
        {
          image: "v1397182974/76f13130c8a0ac1f31db7e506813d2d9.jpg",
          name: "David A. Zapolsky",
          permalink: "david-a-zapolsky",
          title:
            "David A. Zapolsky SVP, Global Public Policy & General Counsel @ Amazon",
        },
        {
          image: "v1397180972/a6e902fbdadbd51c8539fa8058c6ae2f.jpg",
          name: "Dana Friedman",
          permalink: "dana-friedman",
          title: "Dana Friedman CFO VP Finance @ Amazon",
        },
        {
          image: "siskrs1rrpssmhzjamoa",
          name: "Shelley Reynolds",
          permalink: "shelley-reynolds",
          title:
            "Shelley Reynolds VP, Wordwide Controller & Principal Accounting Officer @ Amazon",
        },
        {
          image: "v1405505799/bud8kkfqizjakzwvlg8s.jpg",
          name: "Gabor Szanto",
          permalink: "gabor-szanto",
          title: "Gabor Szanto Audio Engineering Specialist @ Amazon",
        },
        {
          image: "v1397181663/a0e95452009f84c3a94a3b9536a8d7d4.jpg",
          name: "Gregory Kasbarian",
          permalink: "gregory-kasbarian",
          title:
            "Gregory Kasbarian Software Development Manager III - Retail Compatibility - Search @ Amazon",
        },
      ],
      semrush_location_list: [
        {
          locations: [
            {
              name: "United States",
              permalink: "united-states",
            },
            {
              name: "North America",
              permalink: "north-america",
            },
          ],
          rank: 5,
          rank_mom_pct: 0.0,
          visits_mom_pct: 0.0346235366616097,
          visits_pct: 0.798808713761468,
        },
        {
          locations: [
            {
              name: "India",
              permalink: "india",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 70,
          rank_mom_pct: 0.0769230769230769,
          visits_mom_pct: -0.129241186755519,
          visits_pct: 0.0170569770812927,
        },
        {
          locations: [
            {
              name: "Canada",
              permalink: "canada",
            },
            {
              name: "North America",
              permalink: "north-america",
            },
          ],
          rank: 34,
          rank_mom_pct: 0.0967741935483871,
          visits_mom_pct: -0.0626713507187871,
          visits_pct: 0.0112530119929841,
        },
        {
          locations: [
            {
              name: "United Kingdom",
              permalink: "united-kingdom",
            },
            {
              name: "Europe",
              permalink: "europe",
            },
          ],
          rank: 61,
          rank_mom_pct: 0.0,
          visits_mom_pct: 0.0297868674020376,
          visits_pct: 0.00895503344371951,
        },
        {
          locations: [
            {
              name: "Brazil",
              permalink: "brazil",
            },
            {
              name: "South America",
              permalink: "south-america",
            },
          ],
          rank: 84,
          rank_mom_pct: 0.12,
          visits_mom_pct: -0.012006431578728,
          visits_pct: 0.00887411602450044,
        },
      ],
      siftery_products: [
        {
          product_num_customers: 439507,
          status: "using",
          title: "HTML5",
        },
        {
          product_num_customers: 78,
          status: "using",
          title: "ZoomInfo",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "Office 365",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "Twilio",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "Facebook",
        },
        {
          product_num_customers: null,
          status: "not_using",
          title: "DigiCert",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "Google Doubleclick",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "GoDaddy Premium DNS",
        },
        {
          product_num_customers: null,
          status: "using",
          title: "jQuery",
        },
        {
          product_num_customers: null,
          status: "not_using",
          title: "GreenSock Animation Platform",
        },
      ],
      funding_rounds_list: [
        {
          announced_on: "2023-01-03",
          id: "amazon-post-ipo-debt--ef26864e",
          image_id: "mwsza2s38epb8olssp3j",
          num_investors: 2,
          lead_investors: null,
          money_raised: {
            currency: "USD",
            value: "8000000000",
            value_usd: "8000000000",
          },
        },
        {
          announced_on: "2001-07-24",
          id: "amazon-post-ipo-equity--8958c868",
          image_id: "mwsza2s38epb8olssp3j",
          num_investors: 1,
          lead_investors: null,
          money_raised: {
            currency: "USD",
            value: "100000000",
            value_usd: "100000000",
          },
        },
        {
          announced_on: "1996-06-01",
          id: "amazon-series-a--9af93d50",
          image_id: "mwsza2s38epb8olssp3j",
          num_investors: 1,
          lead_investors: [
            {
              image: "ljhuy3jgwhjt4dvsok2o",
              name: "Kleiner Perkins",
              permalink: "kleiner-perkins-caufield-byers",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "8000000",
            value_usd: "8000000",
          },
        },
      ],
      overview_timeline: [
        {
          announced_on: "2024-10-16",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Samsung’s SmartTag 2 item trackers now under $22 a pop at Amazon, or four at $16 ea.",
          uuid: "094385dc-ac1c-403c-ad8e-64601bd61389",
        },
        {
          announced_on: "2024-10-16",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Nuclear stocks rally on Amazon's pacts to support the sector development",
          uuid: "0c56da3e-eec4-4cf3-a8b3-22189ee8a665",
        },
        {
          announced_on: "2024-10-15",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Microsoft tells staff it won’t follow Amazon or Dell on enforcing a return to the office – but there’s a catch",
          uuid: "2394d9c1-6fb2-4d18-a707-a91da5eda1e0",
        },
        {
          announced_on: "2024-10-15",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Amazon Ads Launches New AI Tools for Advertisers – AI Creative Studio and Audio Generator",
          uuid: "3ba2ba71-4be8-418a-8399-369485a429fd",
        },
        {
          announced_on: "2024-10-15",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Amazon's next-gen Kindle Paperwhite is almost here",
          uuid: "629bc6d0-dd2d-40fa-a07d-4079ec223f7c",
        },
        {
          announced_on: "2024-10-15",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Amazon Debuts AI-Powered Tools for Creating Advertisements",
          uuid: "6d686731-0b5d-4ada-adef-0f60f0d7e15c",
        },
        {
          announced_on: "2024-10-15",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Cloudelligent Secures the AWS Service Delivery Designation for Amazon OpenSearch Service",
          uuid: "bcb26e99-eadd-4be4-b13b-ccc1d727af22",
        },
        {
          announced_on: "2024-10-15",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Toy Store Amazon Seller Sees Remarkable 98% Sales Growth with AMZing Marketing Agency's Expertise",
          uuid: "e32762d3-0953-4e37-bf21-747acc4b836c",
        },
        {
          announced_on: "2024-10-15",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Buy a Samsung Galaxy S24 FE and get a $100 Amazon gift card",
          uuid: "fa483777-0379-4fa0-ab3e-77214872e3fe",
        },
        {
          announced_on: "2024-10-14",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "mwsza2s38epb8olssp3j",
              name: "Amazon",
              permalink: "amazon",
              uuid: "05554f65-6aa9-4dd1-6271-8ce2d60f10c4",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Amazon expands recycling facilities for data centre equipment",
          uuid: "1c8ae9f6-3760-4ccb-9393-f95f2ae2943a",
        },
      ],
      bombora: [
        {
          category: "technology",
          score: 100,
          topic: "eSentire",
          weeks_surging: 3,
          wow_growth: 0.0752688172043011,
        },
        {
          category: "business_service",
          score: 100,
          topic: "PunchOut catalog",
          weeks_surging: 6,
          wow_growth: 0.162790697674419,
        },
        {
          category: "web_tech",
          score: 100,
          topic: "The Hut Group",
          weeks_surging: 1,
          wow_growth: null,
        },
        {
          category: "technology",
          score: 99,
          topic: "SherWeb",
          weeks_surging: 3,
          wow_growth: 0.0102040816326531,
        },
        {
          category: "technology",
          score: 98,
          topic: "2nd Watch",
          weeks_surging: 2,
          wow_growth: -0.02,
        },
        {
          category: "technology",
          score: 97,
          topic: "SAP Concur",
          weeks_surging: 3,
          wow_growth: 0.590163934426229,
        },
        {
          category: "it_management",
          score: 97,
          topic: "Service Management",
          weeks_surging: 2,
          wow_growth: -0.03,
        },
        {
          category: "business_finance",
          score: 96,
          topic: "Cash Flow Analysis",
          weeks_surging: 5,
          wow_growth: 0.0786516853932584,
        },
        {
          category: "technology",
          score: 96,
          topic: "Auth0",
          weeks_surging: 6,
          wow_growth: -0.0103092783505155,
        },
        {
          category: "technology",
          score: 95,
          topic: "Qualitest",
          weeks_surging: 1,
          wow_growth: null,
        },
      ],
      investors: [
        {
          funding_round: {
            id: "ef26864e-2742-416a-bc4c-50a3d0a3ef4a",
            image_id: "mwsza2s38epb8olssp3j",
            type: "funding_round",
            value: "Post-IPO Debt - Amazon",
          },
          id: "dbs-bank-ltd-invested-in-amazon-post-ipo-debt--ef26864e--361de730",
          investor: {
            id: "dbs-bank-ltd",
            image_id: "v1398228515/jpn05fbyjrlmdfxckato.jpg",
            type: "organization",
            value: "DBS Bank",
          },
          lead_investor: null,
          type: "investment",
          value: "DBS Bank investment in Post-IPO Debt - Amazon",
        },
        {
          funding_round: {
            id: "ef26864e-2742-416a-bc4c-50a3d0a3ef4a",
            image_id: "mwsza2s38epb8olssp3j",
            type: "funding_round",
            value: "Post-IPO Debt - Amazon",
          },
          id: "mizuho-bank-invested-in-amazon-post-ipo-debt--ef26864e--eb5c4b0a",
          investor: {
            id: "mizuho-bank",
            image_id: "hldb1hgbwnyprh4m0dpf",
            type: "organization",
            value: "Mizuho Bank",
          },
          lead_investor: null,
          type: "investment",
          value: "Mizuho Bank investment in Post-IPO Debt - Amazon",
        },
        {
          funding_round: {
            id: "8958c868-886a-921e-26f0-3c7992839b5e",
            image_id: "mwsza2s38epb8olssp3j",
            type: "funding_round",
            value: "Post-IPO Equity - Amazon",
          },
          id: "aol-invested-in-amazon-post-ipo-equity--8958c868--b3277b98",
          investor: {
            id: "aol",
            image_id: "zakbqbj5wz5aidd6mr23",
            type: "organization",
            value: "AOL",
          },
          lead_investor: false,
          type: "investment",
          value: "AOL investment in Post-IPO Equity - Amazon",
        },
        {
          funding_round: {
            id: "9af93d50-2a01-1ed7-8755-d69165f0d646",
            image_id: "mwsza2s38epb8olssp3j",
            type: "funding_round",
            value: "Series A - Amazon",
          },
          id: "kleiner-perkins-caufield-byers-invested-in-amazon-series-a--9af93d50--f679a2c2",
          investor: {
            id: "kleiner-perkins-caufield-byers",
            image_id: "ljhuy3jgwhjt4dvsok2o",
            type: "organization",
            value: "Kleiner Perkins",
          },
          lead_investor: true,
          type: "investment",
          value: "Kleiner Perkins investment in Series A - Amazon",
        },
      ],
      acquisitions: [
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "b6240df5-a847-4c8f-994e-f628851621d6",
            value: "MX Player",
            image_id: "u3gibpin9t8ymcgwk0kc",
            permalink: "mx-player",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2024-10-07",
          },
          identifier: {
            uuid: "93505331-88ea-458a-bf64-f808e243c88b",
            value: "MX Player acquired by Amazon",
            image_id: "u3gibpin9t8ymcgwk0kc",
            permalink: "amazon-acquires-mx-player--93505331",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "541ac806-d874-4988-a910-076955701d58",
            value: "Covariant",
            image_id: "cw6iicekzfonrw7iuc95",
            permalink: "covariant",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2024-08-31",
          },
          identifier: {
            uuid: "eb25e577-ed03-4076-a813-c50429a59a1b",
            value: "Covariant acquired by Amazon",
            image_id: "cw6iicekzfonrw7iuc95",
            permalink: "amazon-acquires-covariant--eb25e577",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "a8143605-0977-4afe-be65-e30404fe1fef",
            value: "Perceive",
            image_id: "vpigsgq2sjwqjoore16h",
            permalink: "perceive-1fef",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2024-08-16",
          },
          price: {
            value: 80000000,
            currency: "USD",
            value_usd: 80000000,
          },
          identifier: {
            uuid: "b0b67904-c9a9-43b0-8fa6-38e5fa0341a4",
            value: "Perceive acquired by Amazon",
            image_id: "vpigsgq2sjwqjoore16h",
            permalink: "amazon-acquires-perceive-1fef--b0b67904",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "2e3096ee-5188-4d9e-9852-227281592afb",
            value: "Bray Film Studios",
            image_id: "39587af3bddb47b1ad0320db3f166777",
            permalink: "bray-film-studios",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2024-07-22",
          },
          identifier: {
            uuid: "4f34a595-88a8-4d87-b93d-f2a69ab36a9c",
            value: "Bray Film Studios acquired by Amazon",
            image_id: "39587af3bddb47b1ad0320db3f166777",
            permalink: "amazon-acquires-bray-film-studios--4f34a595",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "8d664591-eac0-4131-a225-b4e6f729f8aa",
            value: "Fig",
            image_id: "njvu0trsqbrgj5nhel93",
            permalink: "fig-f8aa",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2023-08-28",
          },
          identifier: {
            uuid: "8820f1f1-e424-4df0-a0b6-0a756dc7372b",
            value: "Fig acquired by Amazon",
            image_id: "njvu0trsqbrgj5nhel93",
            permalink: "amazon-acquires-fig-f8aa--8820f1f1",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "889a3cd1-16e2-4825-89e8-b8900a7d65ed",
            value: "Snackable AI",
            image_id: "zichex39vgkayamkesf7",
            permalink: "snackable",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2023-05-06",
          },
          identifier: {
            uuid: "2394d123-116f-4992-82b1-ef7a47d7d22c",
            value: "Snackable AI acquired by Amazon",
            image_id: "zichex39vgkayamkesf7",
            permalink: "amazon-acquires-snackable--2394d123",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "75e5f57a-6b20-443f-8426-77fcb6361be6",
            value: "Watasale",
            image_id: "vcxbpabkewhkftcighrs",
            permalink: "watasale",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2022-09-30",
          },
          identifier: {
            uuid: "4df1d916-eaa9-4130-be9a-01efd2a7ec49",
            value: "Watasale acquired by Amazon",
            image_id: "vcxbpabkewhkftcighrs",
            permalink: "amazon-acquires-watasale--4df1d916",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "ffe74ad7-43eb-bd06-32ad-19de354a67bd",
            value: "One Medical",
            image_id: "ubzvjjfwz8bjcxgrvzbr",
            permalink: "one-medical-group",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2022-07-21",
          },
          price: {
            value: 3900000000,
            currency: "USD",
            value_usd: 3900000000,
          },
          identifier: {
            uuid: "564fdb97-820c-4c95-9f84-9c96bcf951b7",
            value: "One Medical acquired by Amazon",
            image_id: "ubzvjjfwz8bjcxgrvzbr",
            permalink: "amazon-acquires-one-medical-group--564fdb97",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "8794eddc-389f-c7d0-8eaf-b4992c8588e8",
            value: "GlowRoad",
            image_id: "tacv8haviert2k2qlwd6",
            permalink: "glowroad",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2022-04-22",
          },
          identifier: {
            uuid: "3b52ef77-2c4d-43db-8d23-caaf27599741",
            value: "GlowRoad acquired by Amazon",
            image_id: "tacv8haviert2k2qlwd6",
            permalink: "amazon-acquires-glowroad--3b52ef77",
            entity_def_id: "acquisition",
          },
        },
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "88cc2e13-a7e7-f3a7-c22a-0b717399870e",
            value: "Veeqo",
            image_id: "v1397752462/79ac8afaa8b10a6a3f3566078001ec47.png",
            permalink: "veeqo",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2022-03-07",
          },
          identifier: {
            uuid: "c856ebcb-1883-4897-88cd-dfb07bb6339c",
            value: "Veeqo acquired by Amazon",
            image_id: "v1397752462/79ac8afaa8b10a6a3f3566078001ec47.png",
            permalink: "amazon-acquires-veeqo--c856ebcb",
            entity_def_id: "acquisition",
          },
        },
      ],
      funds_raised: [
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-circu-li-ion-grant--64095647--0a2aea4c",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - Circu Li-ion",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-brainbox-ai-grant--fa714d69--18c72ee1",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - BrainBox AI",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-solcold-grant--7227edcb--3b16c6b0",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - SolCold",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-hipli-grant--476387ae--4a193d4f",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - Hipli",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-re-zip-grant--a9584187--665eeaab",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - Re-Zip",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-cheesecake-energy-grant--2cdbeb8d--682d640d",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - Cheesecake Energy",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-pirta-grant--e00a343f--9412c4b8",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - Pirta",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-phaidra-grant--3ecdf66e--95bb35a9",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - Phaidra",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-raicoon-grant--418689b3--9d59f2c6",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Amazon investment in Grant - raicoon",
        },
        {
          announced_on: "2024-09-24",
          id: "amazon-invested-in-north-sea-farmers-grant--40246858--a40a9829",
          money_raised: 1500000,
          money_raised_usd: 1678665,
          currency: "EUR",
          type: "investment",
          value: "Amazon investment in Grant - North Sea Farmers",
        },
      ],
      investments: [
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "circu-li-ion-grant--64095647",
            image_id: "aeqismg029jvdpccwcxl",
            type: "funding_round",
            value: "Grant - Circu Li-ion",
          },
          id: "amazon-invested-in-circu-li-ion-grant--64095647--0a2aea4c",
          organization: {
            id: "circu-li-ion",
            image_id: "aeqismg029jvdpccwcxl",
            type: "organization",
            value: "Circu Li-ion",
          },
          type: "investment",
          value: "Amazon investment in Grant - Circu Li-ion",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "brainbox-ai-grant--fa714d69",
            image_id: "frwyftesgfhlb9cgpfjp",
            type: "funding_round",
            value: "Grant - BrainBox AI",
          },
          id: "amazon-invested-in-brainbox-ai-grant--fa714d69--18c72ee1",
          organization: {
            id: "brainbox-ai",
            image_id: "frwyftesgfhlb9cgpfjp",
            type: "organization",
            value: "BrainBox AI",
          },
          type: "investment",
          value: "Amazon investment in Grant - BrainBox AI",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "solcold-grant--7227edcb",
            image_id: "juztiktjjdef76sbfq4c",
            type: "funding_round",
            value: "Grant - SolCold",
          },
          id: "amazon-invested-in-solcold-grant--7227edcb--3b16c6b0",
          organization: {
            id: "solcold",
            image_id: "juztiktjjdef76sbfq4c",
            type: "organization",
            value: "SolCold",
          },
          type: "investment",
          value: "Amazon investment in Grant - SolCold",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "hipli-grant--476387ae",
            image_id: "juky8qoinbki48wz3myy",
            type: "funding_round",
            value: "Grant - Hipli",
          },
          id: "amazon-invested-in-hipli-grant--476387ae--4a193d4f",
          organization: {
            id: "hipli",
            image_id: "juky8qoinbki48wz3myy",
            type: "organization",
            value: "Hipli",
          },
          type: "investment",
          value: "Amazon investment in Grant - Hipli",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "re-zip-grant--a9584187",
            image_id: "86c9709aabbb446589f220e841c3e6a2",
            type: "funding_round",
            value: "Grant - Re-Zip",
          },
          id: "amazon-invested-in-re-zip-grant--a9584187--665eeaab",
          organization: {
            id: "re-zip",
            image_id: "86c9709aabbb446589f220e841c3e6a2",
            type: "organization",
            value: "Re-Zip",
          },
          type: "investment",
          value: "Amazon investment in Grant - Re-Zip",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "cheesecake-energy-grant--2cdbeb8d",
            image_id: "dp67akjvoimlqwp9okwp",
            type: "funding_round",
            value: "Grant - Cheesecake Energy",
          },
          id: "amazon-invested-in-cheesecake-energy-grant--2cdbeb8d--682d640d",
          organization: {
            id: "cheesecake-energy",
            image_id: "dp67akjvoimlqwp9okwp",
            type: "organization",
            value: "Cheesecake Energy",
          },
          type: "investment",
          value: "Amazon investment in Grant - Cheesecake Energy",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "pirta-grant--e00a343f",
            image_id: "3028da30858c4d4e98e2c27e92f38367",
            type: "funding_round",
            value: "Grant - Pirta",
          },
          id: "amazon-invested-in-pirta-grant--e00a343f--9412c4b8",
          organization: {
            id: "pirta",
            image_id: "3028da30858c4d4e98e2c27e92f38367",
            type: "organization",
            value: "Pirta",
          },
          type: "investment",
          value: "Amazon investment in Grant - Pirta",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "phaidra-grant--3ecdf66e",
            image_id: "ctl1oezne6koh6idewyx",
            type: "funding_round",
            value: "Grant - Phaidra",
          },
          id: "amazon-invested-in-phaidra-grant--3ecdf66e--95bb35a9",
          organization: {
            id: "phaidra",
            image_id: "ctl1oezne6koh6idewyx",
            type: "organization",
            value: "Phaidra",
          },
          type: "investment",
          value: "Amazon investment in Grant - Phaidra",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "raicoon-grant--418689b3",
            image_id: "yqpixzd2vifz3dnb6bta",
            type: "funding_round",
            value: "Grant - raicoon",
          },
          id: "amazon-invested-in-raicoon-grant--418689b3--9d59f2c6",
          organization: {
            id: "raicoon",
            image_id: "yqpixzd2vifz3dnb6bta",
            type: "organization",
            value: "raicoon",
          },
          type: "investment",
          value: "Amazon investment in Grant - raicoon",
        },
        {
          announced_on: "2024-09-24",
          funding_round: {
            id: "north-sea-farmers-grant--40246858",
            image_id: "ffb61f6dddf14589946f91a1cfa60ea6",
            type: "funding_round",
            value: "Grant - North Sea Farmers",
          },
          id: "amazon-invested-in-north-sea-farmers-grant--40246858--a40a9829",
          organization: {
            id: "north-sea-farmers",
            image_id: "ffb61f6dddf14589946f91a1cfa60ea6",
            type: "organization",
            value: "North Sea Farmers",
          },
          type: "investment",
          value: "Amazon investment in Grant - North Sea Farmers",
        },
      ],
      apptopia: [
        {
          identifier: {
            uuid: "4ab8574b-4ebd-4f3a-afb5-8557b1959acb",
            value: "Amazon",
            image_id: "apptopia/app/09920e6e-896e-477e-b0b3-1b5e1b1c7122",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play", "itunes_connect"],
          monthly_downloads: 633092,
        },
        {
          identifier: {
            uuid: "e58b103f-24d0-424a-982f-e63d7cd89694",
            value: "Amazon",
            image_id: "apptopia/app/49e29d02-31ce-4e82-8502-d0749f0f2974",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
          monthly_downloads: 183330,
        },
        {
          identifier: {
            uuid: "f811fc8b-ba2d-4cdd-b3d7-ab59cc48f443",
            value: "Amazon FR",
            image_id: "apptopia/app/6a92415a-c592-4936-b267-795659fb7185",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play", "itunes_connect"],
          monthly_downloads: 135182,
        },
        {
          identifier: {
            uuid: "9ec9af19-dca1-4716-b27f-86a91ce0dcd7",
            value: "Amazon BuyVIP",
            image_id: "apptopia/app/7ff812f4-341f-4fac-a0df-201a257c4cdf",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
          monthly_downloads: 569,
        },
        {
          identifier: {
            uuid: "53902c45-127e-4591-aa3f-2bcb33a04f23",
            value: "Amazon Windowshop",
            image_id: "apptopia/app/aa301816-6c65-4736-9bbc-b1aa8117ecd1",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
        },
        {
          identifier: {
            uuid: "d38e1396-9a4a-485c-a906-731275eb5a5d",
            value: "Amazon DE",
            image_id: "apptopia/app/d2666fb5-e73a-4eea-a6ef-e202fe10258e",
            entity_def_id: "apptopia_app",
          },
          stores: ["google_play"],
        },
      ],
      current_advisors: [
        {
          image: "v1398281117/ehz9tps4epe3qiyzoeud.jpg",
          job_type: "board_member",
          name: "Andrew Jassy",
          permalink: "andrew-jassy",
        },
        {
          image: "v1487985168/ytuofcigxo6oaznmlpwn.png",
          job_type: "board_member",
          name: "Jeff Bezos",
          permalink: "jeff-bezos",
        },
        {
          image: "v1445077375/szkyghsdb3zkmr1hs9ps.jpg",
          job_type: "board_member",
          name: "Jamie Gorelick",
          permalink: "jamie-s-gorelick",
        },
        {
          image: "v1397183321/a19e06b837cb657c5b174a0ec6dd26ac.jpg",
          job_type: "board_member",
          name: "Jon Rubinstein",
          permalink: "jon-rubinstein",
        },
        {
          image: "v1492015535/wxdmjgmk8giwdo2nfute.png",
          job_type: "board_member",
          name: "Keith Alexander",
          permalink: "keith-alexander",
        },
        {
          image: "o4hjto6ayrcsufvqxlqo",
          job_type: "board_member",
          name: "Judith McGrath",
          permalink: "judith-mcgrath-71a4",
        },
        {
          image: "v1451544585/t6vmsezw2oqmtghxmnbg.png",
          job_type: "board_member",
          name: "Indra Nooyi",
          permalink: "indra-k-nooyi",
        },
        {
          image: "v1496708017/uw4k5zri4bgnzh6a7aqs.jpg",
          job_type: "board_member",
          name: "Daniel P. Huttenlocher",
          permalink: "daniel-p-huttenlocher",
        },
      ],
      exits: [
        {
          description:
            "IONQ develops general-purpose quantum information processors to solve the world’s complex problems.",
          image: "ioz8adoqarm3dcoovo2w",
          link: "ionq-inc",
          value: "IonQ",
        },
        {
          description:
            "Deliveroo is an online food delivery service that allows users to order restaurant meals using the web and mobile.",
          image: "acqngligw3ahy0ykgtjk",
          link: "deliveroo",
          value: "Deliveroo",
        },
        {
          description:
            "Aurora is building self-driving technology to operate multiple vehicle types, from freight-hauling trucks to ride-hailing passenger ones.",
          image: "xmla3hyjazyc3pxkbcxu",
          link: "aurora-6292",
          value: "Aurora",
        },
        {
          description:
            "Heyday offers a digital marketplace space built for sellers to accelerate consumer product brands.",
          image: "t4cr9yak1ch56lmhbgwo",
          link: "heyday-1635",
          value: "Heyday",
        },
        {
          description:
            "Pismo is a technology company providing an all-in-one processing platform for banking, payments, and financial markets infrastructure.",
          image: "xnauwr187agleen3zvvp",
          link: "pismo",
          value: "Pismo",
        },
        {
          description:
            "Cheddar is a live video news network focused on covering products, technologies, and services.",
          image: "vcmjyuin8qaigzcm5qia",
          link: "cheddar-tv",
          value: "Cheddar",
        },
        {
          description:
            "Shuttl is an app-based shuttle service that makes users' daily commute safe, reliable, and affordable for everyone.",
          image: "hmylnnni3vmq7kob89kv",
          link: "shuttl",
          value: "Shuttl",
        },
        {
          description:
            "Acquia specializes in providing cloud-based digital experience management solutions.",
          image: "rbjvr1i7q5w5f430iavw",
          link: "acquia",
          value: "Acquia",
        },
        {
          description:
            "North builds a technology that is human centric where people and technology can go hand in hand.",
          image: "wjkouythy9almjnqoqau",
          link: "north-8daa",
          value: "North",
        },
        {
          description:
            "QwikCilver is your single-stop provider for all kinds of stored value card based solutions.",
          image: "v1441270416/d8hlmxbgyr1c213lbiof.png",
          link: "qwikcilver-solutions",
          value: "QwikCilver Solutions",
        },
      ],
      news: [
        {
          date: "2024-10-16",
          organization: "Amazon",
          publisher: "9to5Toys",
          thumbnail_url: null,
          title:
            "Samsung’s SmartTag 2 item trackers now under $22 a pop at Amazon, or four at $16 ea.",
          url: "https://9to5toys.com/2024/10/16/samsung-smarttag-2-item-tracker-deals/",
        },
        {
          date: "2024-10-16",
          organization: "Amazon",
          publisher: "Investing.com",
          thumbnail_url: null,
          title:
            "Nuclear stocks rally on Amazon's pacts to support the sector development",
          url: "https://www.investing.com/news/stock-market-news/nuclear-stocks-rally-on-amazons-pacts-to-support-the-sector-development-3666114",
        },
        {
          date: "2024-10-15",
          organization: "Amazon",
          publisher: "IT PRO",
          thumbnail_url: null,
          title:
            "Microsoft tells staff it won’t follow Amazon or Dell on enforcing a return to the office – but there’s a catch",
          url: "https://www.itpro.com/business/careers-and-training/microsoft-tells-staff-it-wont-follow-amazon-or-dells-lead-on-enforcing-a-return-to-the-office-but-theres-a-catch",
        },
        {
          date: "2024-10-15",
          organization: "Amazon",
          publisher: "Morningstar",
          thumbnail_url: null,
          title:
            "Amazon Ads Launches New AI Tools for Advertisers – AI Creative Studio and Audio Generator",
          url: "https://www.morningstar.com/news/business-wire/20241015351111/amazon-ads-launches-new-ai-tools-for-advertisers-ai-creative-studio-and-audio-generator",
        },
        {
          date: "2024-10-15",
          organization: "Amazon",
          publisher: "Android Police",
          thumbnail_url: null,
          title: "Amazon's next-gen Kindle Paperwhite is almost here",
          url: "https://www.androidpolice.com/amazon-next-gen-kindle-paperwhite-almost-here/",
        },
        {
          date: "2024-10-15",
          organization: "Amazon",
          publisher: "PYMNTS.com",
          thumbnail_url: null,
          title: "Amazon Debuts AI-Powered Tools for Creating Advertisements",
          url: "https://www.pymnts.com/amazon/2024/amazon-debuts-ai-powered-tools-for-creating-advertisements/",
        },
        {
          date: "2024-10-15",
          organization: "Amazon",
          publisher: "PRNewswire",
          thumbnail_url: null,
          title:
            "Cloudelligent Secures the AWS Service Delivery Designation for Amazon OpenSearch Service",
          url: "https://www.prnewswire.com/news-releases/cloudelligent-secures-the-aws-service-delivery-designation-for-amazon-opensearch-service-302275392.html",
        },
        {
          date: "2024-10-15",
          organization: "Amazon",
          publisher: "PRLog",
          thumbnail_url: null,
          title:
            "Toy Store Amazon Seller Sees Remarkable 98% Sales Growth with AMZing Marketing Agency's Expertise",
          url: "https://www.prlog.org/13043127-toy-store-amazon-seller-sees-remarkable-98-sales-growth-with-amzing-marketing-agencys-expertise.html",
        },
        {
          date: "2024-10-15",
          organization: "Amazon",
          publisher: "ZD Net",
          thumbnail_url: null,
          title: "Buy a Samsung Galaxy S24 FE and get a $100 Amazon gift card",
          url: "https://www.zdnet.com/article/samsung-galaxy-s-24-fe-deal-10-15-24/",
        },
        {
          date: "2024-10-14",
          organization: "Amazon",
          publisher: "RTE.ie",
          thumbnail_url: null,
          title:
            "Amazon expands recycling facilities for data centre equipment",
          url: "https://www.rte.ie/news/business/2024/1014/1475354-amazon-expands-recycling-services-for-data-centre-gear/",
        },
      ],
      aberdeen_it_spend: {
        value: 33912315000,
        currency: "USD",
        value_usd: 33912315000,
      },
      headquarters_regions: [
        {
          id: "greater-seattle-area",
          value: "Greater Seattle Area",
        },
        {
          id: "west-coast-united-states",
          value: "West Coast",
        },
        {
          id: "western-united-states",
          value: "Western US",
        },
      ],
      financials_highlights: {
        num_investments: 153,
        num_investors: 4,
        num_lead_investors: 1,
        listed_stock_symbol: "NASDAQ:AMZN",
        num_exits: 34,
        num_lead_investments: 81,
        num_funds: 1,
        funding_total: {
          value: 8108000000,
          currency: "USD",
          value_usd: 8108000000,
        },
        num_funding_rounds: 3,
      },
      ipqwery: {
        ipqwery_popular_patent_category: "g06",
        ipqwery_popular_trademark_class: "c9",
        ipqwery_num_trademark_registered: 3266,
        ipqwery_num_patent_granted: 21040,
      },
      overview_highlights: {
        num_org_similarities: 8,
        num_current_positions: 1333,
        num_investments: 153,
        num_investors: 4,
        listed_stock_symbol: "NASDAQ:AMZN",
        num_contacts: 9797,
        funding_total: {
          value: 8108000000,
          currency: "USD",
          value_usd: 8108000000,
        },
      },
      people_highlights: {
        num_contacts: 9797,
        num_current_advisor_positions: 33,
        num_current_positions: 1333,
      },
      technology_highlights: {
        semrush_visits_latest_month: 3248571229,
        semrush_visits_mom_pct: 0.0198101146914273,
        siftery_num_products: 135,
        apptopia_total_downloads: 952173,
        builtwith_num_technologies_used: 9,
      },
      founders: [
        {
          id: "jeff-bezos",
          type: "person",
          value: "Jeff Bezos",
        },
        {
          id: "vinit-bharara",
          type: "person",
          value: "Vinit Bharara",
        },
      ],
    },
  },
};

// Type Check
const karrotMaket: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
      name: "Karrot Market",
      url: "https://www.crunchbase.com/organization/daangn-market",
      rank_company: null,
      locations: null,
      address: "",
      about:
        "Karrot is a hyperlocal community app which offers a secondhand marketplace.",
      full_description:
        "Karrot is a hyperlocal community app which offers a secondhand marketplace. Karrot supports an eco-friendly lifestyle and local economy by promoting buying and selling secondhand goods locally. Since its launch in 2015, Karrot has become South Korea's largest second-hand marketplace and second-biggest e-commerce company. Karrot is currently available in select cities in four countries outside the home country, including the United Kingdom, Canada, the United States and Japan. As of March 2021, Karrot runs one of the largest and fastest growing consumer-to-consumer (C2C) mobile marketplace, receiving 15 million monthly unique visitors.",
      industries: [
        "Communities",
        "E-Commerce",
        "Local Advertising",
        "Marketplace",
        "Secondhand Goods",
        "Social Network",
      ],
      operating_status: "active",
      founded_date: "2015-07-15",
      company_type: "for_profit",
      social_media: [
        {
          name: "facebook",
          link: "https://www.facebook.com/karrotmarket",
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/company/daangn",
        },
      ],
      num_employees: null,
      website: null,
      ipo_status: null,
      contact_email: "market@daangn.com",
      contact_phone: null,
      funding_info: [
        {
          title: "Marketplace Companies With Less Than $50M in Revenue",
          org_num: 6037,
          org_num_investors: 12795,
          org_funding_total: {
            value_usd: 64889564064,
            currency: "USD",
            value: 64889564064,
          },
        },
        {
          title: "Asia-Pacific (APAC) Marketplace Companies",
          org_num: 2520,
          org_num_investors: 3475,
          org_funding_total: {
            value_usd: 61377538331,
            currency: "USD",
            value: 61377538331,
          },
        },
        {
          title:
            "South Korea Companies With Fewer Than 1000 Employees (Top 10K)",
          org_num: 9876,
          org_num_investors: 14649,
          org_funding_total: {
            value_usd: 63772394647,
            currency: "USD",
            value: 63772394647,
          },
        },
        {
          title: "Communities Companies With More Than 50 Employees",
          org_num: 8908,
          org_num_investors: 2853,
          org_funding_total: {
            value_usd: 32540294129,
            currency: "USD",
            value: 32540294129,
          },
        },
      ],
      similar_companies: [
        {
          name: "Zhuanzhuan",
          url: "https://www.crunchbase.com/organization/zhuan-zhuan",
        },
        {
          name: "POPxo",
          url: "https://www.crunchbase.com/organization/popxo",
        },
        {
          name: "Refurbed",
          url: "https://www.crunchbase.com/organization/refurbed",
        },
        {
          name: "Ralali",
          url: "https://www.crunchbase.com/organization/ralali",
        },
        {
          name: "Bungaejangter",
          url: "https://www.crunchbase.com/organization/quicket",
        },
        {
          name: "Tradesy",
          url: "https://www.crunchbase.com/organization/tradesy",
        },
        {
          name: "Bokadirekt",
          url: "https://www.crunchbase.com/organization/bokadirekt",
        },
        {
          name: "Danggeun Market",
          url: "https://www.crunchbase.com/organization/danggeun-market-inc",
        },
        {
          name: "Warehow",
          url: "https://www.crunchbase.com/organization/warehow",
        },
        {
          name: "Wadi",
          url: "https://www.crunchbase.com/organization/wadi",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/fjncqsyvetlmshmstgew",
      semrush_monthly_visits: 161663,
      semrush_monthly_visits_growth: -0.615385713436032,
      semrush_last_updated: "2024-07-15",
      num_contacts: null,
      num_employee_profiles: 11,
      total_active_products: 0,
      num_news: 5,
      funding_rounds: {
        last_funding_at: "2021-08-17",
        last_funding_type: "series_d",
        num_funding_rounds: 5,
        value: {
          currency: "USD",
          value: 234968852,
          value_usd: 234968852,
        },
      },
      bombora_last_updated: null,
      num_investors: 9,
      legal_name: "Daangn Inc",
      num_event_appearances: null,
      num_acquisitions: null,
      num_investments: null,
      num_advisor_positions: null,
      num_exits: null,
      num_investments_lead: null,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: null,
      contacts: [],
      event_appearances: [],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: null,
        stock_link: null,
        stock_symbol: null,
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [
        {
          image: "augxqprrzy35i41clzvz",
          name: "Changhun Jeong",
          permalink: "changhun-jeong",
          title: "Changhun Jeong Co-Founder @ Karrot Market",
        },
        {
          image: "uoeifyj5oaxpgfbtboxx",
          name: "Gary Kim",
          permalink: "gary-kim-30c4",
          title:
            "Gary Kim Co-founder, Co-CEO & Product Manager @ Karrot Market",
        },
      ],
      semrush_location_list: [
        {
          locations: [
            {
              name: "South Korea",
              permalink: "south-korea",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 13775,
          rank_mom_pct: 1.50636826783115,
          visits_mom_pct: -0.697979741451676,
          visits_pct: 0.500745377730217,
        },
        {
          locations: [
            {
              name: "Canada",
              permalink: "canada",
            },
            {
              name: "North America",
              permalink: "north-america",
            },
          ],
          rank: 21462,
          rank_mom_pct: 0.878347628216349,
          visits_mom_pct: -0.499527240407708,
          visits_pct: 0.327415673345169,
        },
        {
          locations: [
            {
              name: "Egypt",
              permalink: "egypt",
            },
            {
              name: "Africa",
              permalink: "africa",
            },
          ],
          rank: 33652,
          rank_mom_pct: null,
          visits_mom_pct: null,
          visits_pct: 0.0532960541373103,
        },
        {
          locations: [
            {
              name: "United States",
              permalink: "united-states",
            },
            {
              name: "North America",
              permalink: "north-america",
            },
          ],
          rank: 507682,
          rank_mom_pct: -0.220427160254963,
          visits_mom_pct: 0.620813397129187,
          visits_pct: 0.0419081669893544,
        },
        {
          locations: [
            {
              name: "Japan",
              permalink: "japan",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 206658,
          rank_mom_pct: 1.1618528553346,
          visits_mom_pct: -0.693860474845727,
          visits_pct: 0.0362111305617241,
        },
      ],
      siftery_products: [],
      funding_rounds_list: [
        {
          announced_on: "2021-08-17",
          id: "daangn-market-series-d--a88b3ad2",
          image_id: "fjncqsyvetlmshmstgew",
          num_investors: 9,
          lead_investors: [
            {
              image: "raes4tfum3otefbnrto4",
              name: "DST Global",
              permalink: "digital-sky-technologies-fo",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "162000000",
            value_usd: "162000000",
          },
        },
        {
          announced_on: "2020-06-02",
          id: "daangn-market-series-c--4f8c0b66",
          image_id: "fjncqsyvetlmshmstgew",
          num_investors: 2,
          lead_investors: [
            {
              image: "otjuvg73lfubagrb6lzr",
              name: "Goodwater Capital",
              permalink: "goodwater-capital",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "33000000",
            value_usd: "33000000",
          },
        },
        {
          announced_on: "2019-09-09",
          id: "daangn-market-series-c--76670ce4",
          image_id: "fjncqsyvetlmshmstgew",
          num_investors: 6,
          lead_investors: null,
          money_raised: {
            currency: "KRW",
            value: "40000000000",
            value_usd: "33560176",
          },
        },
        {
          announced_on: "2018-05-30",
          id: "daangn-market-series-b--a02f6fb3",
          image_id: "fjncqsyvetlmshmstgew",
          num_investors: 4,
          lead_investors: [
            {
              image: "y2q4hfb9ao95g3jvimkq",
              name: "SBVA",
              permalink: "softbank-ventures-korea",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "5700000000",
            value_usd: "5297250",
          },
        },
        {
          announced_on: "2016-12-01",
          id: "daangn-market-series-a--fdba9de5",
          image_id: "fjncqsyvetlmshmstgew",
          num_investors: 3,
          lead_investors: [
            {
              image: "cttoyhokz4ui1zlo8kmd",
              name: "Kakao Ventures",
              permalink: "kakao-ventures",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "1300000000",
            value_usd: "1111426",
          },
        },
      ],
      overview_timeline: [
        {
          announced_on: "2024-07-03",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Korea’s No. 1 flea market app Karrot expands services across Canada",
          uuid: "ac3e70cb-f2ff-4adc-998e-1c8ddcfff629",
        },
        {
          announced_on: "2021-09-23",
          id: "naamezip-seed--3e068539",
          image_id: null,
          lead_investors: [
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
            {
              image: "qzd4bgedn8yga0hucaoz",
              name: "Naamezip",
              permalink: "naamezip",
              uuid: "41de5023-dc8b-4317-8f07-f5460fb07b62",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "1000000000",
            value_usd: "851209",
          },
          title: "Seed Round - Naamezip",
          uuid: "3e068539-f030-4d58-b84d-ad1ad8c665d0",
        },
        {
          announced_on: "2021-08-17",
          id: "daangn-market-series-d--a88b3ad2",
          image_id: null,
          lead_investors: [
            {
              image: "v1443830759/jfobexbjq87xmd9vkuwd.jpg",
              name: "Altos Ventures",
              permalink: "altos-ventures",
              uuid: "2663b77f-1047-b0ed-71b8-5a3d2f3ac719",
            },
            {
              image: "vi6ibwr98nqstrjnc3dc",
              name: "Aspex Management",
              permalink: "aspex-management",
              uuid: "d2f062ce-cc40-488e-af72-72fa4c693537",
            },
            {
              image: "ieduoy7bvbkba3i4zdgu",
              name: "Capstone Partners",
              permalink: "capstone-partners-korea",
              uuid: "1ba766ba-03f9-7410-0072-62b8ef4921b5",
            },
            {
              image: "raes4tfum3otefbnrto4",
              name: "DST Global",
              permalink: "digital-sky-technologies-fo",
              uuid: "9bc45524-5c04-54c1-ec99-5afb33cd3fc4",
            },
            {
              image: "otjuvg73lfubagrb6lzr",
              name: "Goodwater Capital",
              permalink: "goodwater-capital",
              uuid: "f6f889a7-af59-2363-8984-addadc4da1b2",
            },
            {
              image: "cttoyhokz4ui1zlo8kmd",
              name: "Kakao Ventures",
              permalink: "kakao-ventures",
              uuid: "cc634d86-242e-4e01-aa36-a2f51162c396",
            },
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
            {
              image: "misuvtau0sedlemswmou",
              name: "Reverent Partners",
              permalink: "reverent-partners-34b5",
              uuid: "a0d02f89-c244-481b-9063-719e980234b5",
            },
            {
              image: "y2q4hfb9ao95g3jvimkq",
              name: "SBVA",
              permalink: "softbank-ventures-korea",
              uuid: "4710cdd6-d892-39ad-c10a-fe217e5cb7ca",
            },
            {
              image: "v1397178563/87f61524f72c07a9ef8a3caffc3777ba.png",
              name: "Strong Ventures",
              permalink: "strong-ventures",
              uuid: "d2d1c260-c256-b956-5730-4144c19ab090",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "162000000",
            value_usd: "162000000",
          },
          title: "Series D - Karrot Market",
          uuid: "a88b3ad2-d385-49bb-a973-8709e7f22122",
        },
        {
          announced_on: "2021-08-17",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "South Korean online secondhand marketplace Danggeun Market raises $162M at a $2.7B valuation",
          uuid: "aa083493-72d3-4552-a6cb-328a8e12b102",
        },
        {
          announced_on: "2021-02-03",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Korean startup Danggeun Market’s app Karrot is the fastest growing app for second hand goods",
          uuid: "3d94d663-aed3-4edd-a298-a13336db6245",
        },
        {
          announced_on: "2020-12-22",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Tech Worker Turns Hobby Into a Startup Nearing Unicorn Status",
          uuid: "4344a591-bf24-4645-856c-1ba7d5127fe2",
        },
        {
          announced_on: "2020-06-02",
          id: "daangn-market-series-c--4f8c0b66",
          image_id: null,
          lead_investors: [
            {
              image: "v1443830759/jfobexbjq87xmd9vkuwd.jpg",
              name: "Altos Ventures",
              permalink: "altos-ventures",
              uuid: "2663b77f-1047-b0ed-71b8-5a3d2f3ac719",
            },
            {
              image: "otjuvg73lfubagrb6lzr",
              name: "Goodwater Capital",
              permalink: "goodwater-capital",
              uuid: "f6f889a7-af59-2363-8984-addadc4da1b2",
            },
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
          ],
          money_raised: {
            currency: "USD",
            value: "33000000",
            value_usd: "33000000",
          },
          title: "Series C - Karrot Market",
          uuid: "4f8c0b66-e214-42a4-b5e2-9d1814c08286",
        },
        {
          announced_on: "2020-06-01",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Danggeun Market, the South Korean secondhand marketplace app, raises $33 million Series C",
          uuid: "ccd90192-2449-47c9-8be8-28772ea3bf54",
        },
        {
          announced_on: "2019-09-09",
          id: "daangn-market-series-c--76670ce4",
          image_id: null,
          lead_investors: [
            {
              image: "v1443830759/jfobexbjq87xmd9vkuwd.jpg",
              name: "Altos Ventures",
              permalink: "altos-ventures",
              uuid: "2663b77f-1047-b0ed-71b8-5a3d2f3ac719",
            },
            {
              image: "ieduoy7bvbkba3i4zdgu",
              name: "Capstone Partners",
              permalink: "capstone-partners-korea",
              uuid: "1ba766ba-03f9-7410-0072-62b8ef4921b5",
            },
            {
              image: "otjuvg73lfubagrb6lzr",
              name: "Goodwater Capital",
              permalink: "goodwater-capital",
              uuid: "f6f889a7-af59-2363-8984-addadc4da1b2",
            },
            {
              image: "cttoyhokz4ui1zlo8kmd",
              name: "Kakao Ventures",
              permalink: "kakao-ventures",
              uuid: "cc634d86-242e-4e01-aa36-a2f51162c396",
            },
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
            {
              image: "y2q4hfb9ao95g3jvimkq",
              name: "SBVA",
              permalink: "softbank-ventures-korea",
              uuid: "4710cdd6-d892-39ad-c10a-fe217e5cb7ca",
            },
            {
              image: "v1397178563/87f61524f72c07a9ef8a3caffc3777ba.png",
              name: "Strong Ventures",
              permalink: "strong-ventures",
              uuid: "d2d1c260-c256-b956-5730-4144c19ab090",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "40000000000",
            value_usd: "33560176",
          },
          title: "Series C - Karrot Market",
          uuid: "76670ce4-dfc4-4944-9bc2-2e2fca32a4e2",
        },
        {
          announced_on: "2018-05-30",
          id: "daangn-market-series-b--a02f6fb3",
          image_id: null,
          lead_investors: [
            {
              image: "ieduoy7bvbkba3i4zdgu",
              name: "Capstone Partners",
              permalink: "capstone-partners-korea",
              uuid: "1ba766ba-03f9-7410-0072-62b8ef4921b5",
            },
            {
              image: "cttoyhokz4ui1zlo8kmd",
              name: "Kakao Ventures",
              permalink: "kakao-ventures",
              uuid: "cc634d86-242e-4e01-aa36-a2f51162c396",
            },
            {
              image: "fjncqsyvetlmshmstgew",
              name: "Karrot Market",
              permalink: "daangn-market",
              uuid: "d9e179d8-8242-4edb-91c0-39f3f19194f3",
            },
            {
              image: "y2q4hfb9ao95g3jvimkq",
              name: "SBVA",
              permalink: "softbank-ventures-korea",
              uuid: "4710cdd6-d892-39ad-c10a-fe217e5cb7ca",
            },
            {
              image: "v1397178563/87f61524f72c07a9ef8a3caffc3777ba.png",
              name: "Strong Ventures",
              permalink: "strong-ventures",
              uuid: "d2d1c260-c256-b956-5730-4144c19ab090",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "5700000000",
            value_usd: "5297250",
          },
          title: "Series B - Karrot Market",
          uuid: "a02f6fb3-edef-43b8-8d8c-d4e9040cfb22",
        },
      ],
      bombora: [],
      investors: [
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "kakao-ventures-invested-in-daangn-market-series-d--a88b3ad2--02d1ef0f",
          investor: {
            id: "kakao-ventures",
            image_id: "cttoyhokz4ui1zlo8kmd",
            type: "organization",
            value: "Kakao Ventures",
          },
          lead_investor: null,
          type: "investment",
          value: "Kakao Ventures investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "strong-ventures-invested-in-daangn-market-series-d--a88b3ad2--3ee638a1",
          investor: {
            id: "strong-ventures",
            image_id: "v1397178563/87f61524f72c07a9ef8a3caffc3777ba.png",
            type: "organization",
            value: "Strong Ventures",
          },
          lead_investor: null,
          type: "investment",
          value: "Strong Ventures investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "altos-ventures-invested-in-daangn-market-series-d--a88b3ad2--656b9558",
          investor: {
            id: "altos-ventures",
            image_id: "v1443830759/jfobexbjq87xmd9vkuwd.jpg",
            type: "organization",
            value: "Altos Ventures",
          },
          lead_investor: null,
          type: "investment",
          value: "Altos Ventures investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "digital-sky-technologies-fo-invested-in-daangn-market-series-d--a88b3ad2--7415416f",
          investor: {
            id: "digital-sky-technologies-fo",
            image_id: "raes4tfum3otefbnrto4",
            type: "organization",
            value: "DST Global",
          },
          lead_investor: true,
          type: "investment",
          value: "DST Global investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "aspex-management-invested-in-daangn-market-series-d--a88b3ad2--84171f44",
          investor: {
            id: "aspex-management",
            image_id: "vi6ibwr98nqstrjnc3dc",
            type: "organization",
            value: "Aspex Management",
          },
          lead_investor: null,
          type: "investment",
          value: "Aspex Management investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "softbank-ventures-korea-invested-in-daangn-market-series-d--a88b3ad2--86527aba",
          investor: {
            id: "softbank-ventures-korea",
            image_id: "y2q4hfb9ao95g3jvimkq",
            type: "organization",
            value: "SBVA",
          },
          lead_investor: null,
          type: "investment",
          value: "SBVA investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "capstone-partners-korea-invested-in-daangn-market-series-d--a88b3ad2--96dbeae4",
          investor: {
            id: "capstone-partners-korea",
            image_id: "ieduoy7bvbkba3i4zdgu",
            type: "organization",
            value: "Capstone Partners",
          },
          lead_investor: null,
          type: "investment",
          value: "Capstone Partners investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "goodwater-capital-invested-in-daangn-market-series-d--a88b3ad2--c3c827ff",
          investor: {
            id: "goodwater-capital",
            image_id: "otjuvg73lfubagrb6lzr",
            type: "organization",
            value: "Goodwater Capital",
          },
          lead_investor: null,
          type: "investment",
          value: "Goodwater Capital investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "a88b3ad2-d385-49bb-a973-8709e7f22122",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series D - Karrot Market",
          },
          id: "reverent-partners-34b5-invested-in-daangn-market-series-d--a88b3ad2--cd7796e7",
          investor: {
            id: "reverent-partners-34b5",
            image_id: "misuvtau0sedlemswmou",
            type: "organization",
            value: "Reverent Partners",
          },
          lead_investor: null,
          type: "investment",
          value: "Reverent Partners investment in Series D - Karrot Market",
        },
        {
          funding_round: {
            id: "4f8c0b66-e214-42a4-b5e2-9d1814c08286",
            image_id: "fjncqsyvetlmshmstgew",
            type: "funding_round",
            value: "Series C - Karrot Market",
          },
          id: "altos-ventures-invested-in-daangn-market-series-c--4f8c0b66--81c2007f",
          investor: {
            id: "altos-ventures",
            image_id: "v1443830759/jfobexbjq87xmd9vkuwd.jpg",
            type: "organization",
            value: "Altos Ventures",
          },
          lead_investor: null,
          type: "investment",
          value: "Altos Ventures investment in Series C - Karrot Market",
        },
      ],
      acquisitions: [],
      funds_raised: [
        {
          announced_on: "2021-09-23",
          id: "daangn-market-invested-in-naamezip-seed--3e068539--cbc9ae60",
          money_raised: 1000000000,
          money_raised_usd: 851209,
          currency: "KRW",
          type: "investment",
          value: "Karrot Market investment in Seed Round - Naamezip",
        },
      ],
      investments: [
        {
          announced_on: "2021-09-23",
          funding_round: {
            id: "naamezip-seed--3e068539",
            image_id: "qzd4bgedn8yga0hucaoz",
            type: "funding_round",
            value: "Seed Round - Naamezip",
          },
          id: "daangn-market-invested-in-naamezip-seed--3e068539--cbc9ae60",
          organization: {
            id: "naamezip",
            image_id: "qzd4bgedn8yga0hucaoz",
            type: "organization",
            value: "Naamezip",
          },
          type: "investment",
          value: "Karrot Market investment in Seed Round - Naamezip",
        },
      ],
      apptopia: [],
      current_advisors: [],
      exits: [],
      news: [
        {
          date: "2024-07-03",
          organization: "Karrot Market",
          publisher: "KED Global",
          thumbnail_url:
            "https://www.kedglobal.com/korean-startups/newsView/ked202407040005",
          title:
            "Korea’s No. 1 flea market app Karrot expands services across Canada",
          url: "https://www.kedglobal.com/korean-startups/newsView/ked202407040005",
        },
        {
          date: "2021-09-23",
          organization: "Karrot Market",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
        {
          date: "2021-08-17",
          organization: "Altos Ventures",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
        {
          date: "2021-08-17",
          organization: "Karrot Market",
          publisher: "TechCrunch",
          thumbnail_url:
            "https://techcrunch.com/wp-content/uploads/2021/08/Image-2-PR-Release-Data-Infographic_2.jpg?w=1390&crop=1",
          title:
            "South Korean online secondhand marketplace Danggeun Market raises $162M at a $2.7B valuation",
          url: "https://techcrunch.com/2021/08/17/south-korean-online-secondhand-marketplace-danggeun-market-raises-162m-at-a-2-7b-valuation/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAJ5mG5myjKrhktyV19aRpfOLlp6Lhktctl5ivYGtlQov5oMIk9nfT_8sIj6qtVOYz0j2aD4zV2pxJV4XlG4pZ6yhPy_UopKyhykWeS7oEOcLBvWuskf3JALoeqM7N6G52COfOvqOzCw50d0MneuhMz4q5wHXoR1V2dAJvCL5CR2E",
        },
        {
          date: "2021-02-03",
          organization: "Karrot Market",
          publisher: "KoreaTechDesk",
          thumbnail_url: null,
          title:
            "Korean startup Danggeun Market’s app Karrot is the fastest growing app for second hand goods",
          url: "https://www.koreatechdesk.com/korean-startup-danggeun-markets-app-karrot-for-second-hand-goods/",
        },
        {
          date: "2020-12-22",
          organization: "Karrot Market",
          publisher: "Bloomberg.com",
          thumbnail_url:
            "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i153JbmB8QpY/v0/150x-1.jpg",
          title:
            "Tech Worker Turns Hobby Into a Startup Nearing Unicorn Status",
          url: "https://www.bloomberg.com/news/articles/2020-12-22/tech-worker-turns-hobby-into-a-startup-nearing-unicorn-status",
        },
        {
          date: "2020-06-02",
          organization: "Altos Ventures",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
        {
          date: "2020-06-01",
          organization: "Karrot Market",
          publisher: "TechCrunch",
          thumbnail_url:
            "https://techcrunch.com/wp-content/uploads/2020/06/IMG_8986.jpg?w=533",
          title:
            "Danggeun Market, the South Korean secondhand marketplace app, raises $33 million Series C",
          url: "https://techcrunch.com/2020/06/01/danggeun-market-the-south-korean-secondhand-marketplace-app-raises-33-million-series-c/",
        },
        {
          date: "2019-09-09",
          organization: "Altos Ventures",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
        {
          date: "2018-05-30",
          organization: "Capstone Partners",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
      ],
      aberdeen_it_spend: null,
      headquarters_regions: [
        {
          id: "asia-pacific",
          value: "Asia-Pacific (APAC)",
        },
      ],
      financials_highlights: null,
      ipqwery: {},
      overview_highlights: null,
      people_highlights: {
        num_current_positions: 2,
      },
      technology_highlights: {
        builtwith_num_technologies_used: 68,
        semrush_visits_latest_month: 161663,
        semrush_visits_mom_pct: -0.615385713436032,
      },
      founders: [
        {
          id: "changhun-jeong",
          type: "person",
          value: "Changhun Jeong",
        },
        {
          id: "gary-kim-30c4",
          type: "person",
          value: "Gary Kim",
        },
      ],
    },
  },
};

// Type Check
const moyo: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "ef6022b5-0787-4d16-a6d5-0dc0e5c4d87b",
      name: "Moyo",
      url: "https://www.crunchbase.com/organization/moyo-d87b",
      rank_company: 27426,
      locations: [
        {
          value: "Seoul",
          location_type: "city",
        },
        {
          value: "Seoul-t'ukpyolsi",
          location_type: "region",
        },
        {
          value: "South Korea",
          location_type: "country",
        },
        {
          value: "Asia",
          location_type: "continent",
        },
      ],
      address: "Seoul, Seoul-t'ukpyolsi, South Korea, Asia",
      about:
        "Moyo is a phone plan comparison platform that recommends all communication products.",
      full_description: null,
      industries: ["Information Technology", "Mobile Payments"],
      operating_status: "active",
      founded_date: "2021-01-01",
      company_type: "for_profit",
      social_media: [
        {
          name: "linkedin",
          link: "https://www.linkedin.com/company/%EB%AA%A8%EC%9A%94%EF%BD%9C%EB%AA%A8%EB%91%90%EC%9D%98%EC%9A%94%EA%B8%88%EC%A0%9C/",
        },
      ],
      num_employees: "11-50",
      website: "https://www.moyoplan.com/",
      ipo_status: "private",
      contact_email: null,
      contact_phone: null,
      funding_info: [
        {
          title: "Seoul Companies",
          org_num: 8680,
          org_num_investors: 9959,
          org_funding_total: {
            value_usd: 128006589781,
            currency: "USD",
            value: 128006589781,
          },
        },
        {
          title: "South Korea Companies With More Than 10 Employees",
          org_num: 8586,
          org_num_investors: 11962,
          org_funding_total: {
            value_usd: 165942312411,
            currency: "USD",
            value: 165942312411,
          },
        },
        {
          title: "Asia-Pacific (APAC) Startups Founded in 2021",
          org_num: 3555,
          org_num_investors: 12585,
          org_funding_total: {
            value_usd: 22111944285,
            currency: "USD",
            value: 22111944285,
          },
        },
        {
          title:
            "South Korea Companies With Fewer Than 1000 Employees (Top 10K)",
          org_num: 9876,
          org_num_investors: 14649,
          org_funding_total: {
            value_usd: 63772394647,
            currency: "USD",
            value: 63772394647,
          },
        },
      ],
      similar_companies: [
        {
          name: "Idomoo",
          url: "https://www.crunchbase.com/organization/idomoo",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/byjwfnpq5cy0k4dx6uhb",
      semrush_monthly_visits: 1014160,
      semrush_monthly_visits_growth: -0.183890249751343,
      semrush_last_updated: "2024-07-15",
      num_contacts: null,
      num_employee_profiles: 11,
      total_active_products: 0,
      num_news: null,
      funding_rounds: {
        last_funding_at: "2023-02-16",
        last_funding_type: "seed",
        num_funding_rounds: 2,
        value: {
          currency: "KRW",
          value: 4000000000,
          value_usd: 3161106,
        },
      },
      bombora_last_updated: null,
      num_investors: 2,
      legal_name: "Moyo Co., Ltd.",
      num_event_appearances: null,
      num_acquisitions: null,
      num_investments: null,
      num_advisor_positions: null,
      num_exits: null,
      num_investments_lead: null,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: null,
      contacts: [],
      event_appearances: [],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: null,
        stock_link: null,
        stock_symbol: null,
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [],
      semrush_location_list: [
        {
          locations: [
            {
              name: "South Korea",
              permalink: "south-korea",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 1430,
          rank_mom_pct: 0.212892281594572,
          visits_mom_pct: -0.183673040044665,
          visits_pct: 0.994787804685651,
        },
        {
          locations: [
            {
              name: "United States",
              permalink: "united-states",
            },
            {
              name: "North America",
              permalink: "north-america",
            },
          ],
          rank: 903540,
          rank_mom_pct: -0.0092632797799971,
          visits_mom_pct: -0.0146110872367856,
          visits_pct: 0.00226098446004575,
        },
        {
          locations: [
            {
              name: "Japan",
              permalink: "japan",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 396623,
          rank_mom_pct: -0.0635590719242202,
          visits_mom_pct: 0.497420020639835,
          visits_pct: 0.00143074071152481,
        },
        {
          locations: [
            {
              name: "Australia",
              permalink: "australia",
            },
            {
              name: "Oceania",
              permalink: "oceania",
            },
          ],
          rank: 271267,
          rank_mom_pct: -0.529475942767046,
          visits_mom_pct: 2.97989949748744,
          visits_pct: 0.000780941863216849,
        },
        {
          locations: [
            {
              name: "Germany",
              permalink: "germany",
            },
            {
              name: "Europe",
              permalink: "europe",
            },
          ],
          rank: 907327,
          rank_mom_pct: -0.0285962975770767,
          visits_mom_pct: 0.0378787878787879,
          visits_pct: 0.000270174331466435,
        },
      ],
      siftery_products: [],
      funding_rounds_list: [
        {
          announced_on: "2023-02-16",
          id: "moyo-d87b-seed--34f806f8",
          image_id: "byjwfnpq5cy0k4dx6uhb",
          num_investors: 2,
          lead_investors: [
            {
              image: "lferemuefcg4yue7de9g",
              name: "Bass Investment",
              permalink: "bass-investment",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "3000000000",
            value_usd: "2326033",
          },
        },
        {
          announced_on: "2022-02-14",
          id: "moyo-d87b-seed--3dffcdeb",
          image_id: "byjwfnpq5cy0k4dx6uhb",
          num_investors: 2,
          lead_investors: null,
          money_raised: {
            currency: "KRW",
            value: "1000000000",
            value_usd: "835073",
          },
        },
      ],
      overview_timeline: [
        {
          announced_on: "2023-02-16",
          id: "moyo-d87b-seed--34f806f8",
          image_id: null,
          lead_investors: [
            {
              image: "lferemuefcg4yue7de9g",
              name: "Bass Investment",
              permalink: "bass-investment",
              uuid: "4992e606-e918-46d9-bd0f-bd94e008883e",
            },
            {
              image: "cttoyhokz4ui1zlo8kmd",
              name: "Kakao Ventures",
              permalink: "kakao-ventures",
              uuid: "cc634d86-242e-4e01-aa36-a2f51162c396",
            },
            {
              image: "byjwfnpq5cy0k4dx6uhb",
              name: "Moyo",
              permalink: "moyo-d87b",
              uuid: "ef6022b5-0787-4d16-a6d5-0dc0e5c4d87b",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "3000000000",
            value_usd: "2326033",
          },
          title: "Seed Round - Moyo",
          uuid: "34f806f8-5ff5-41ed-a340-54b523842f0c",
        },
        {
          announced_on: "2022-02-14",
          id: "moyo-d87b-seed--3dffcdeb",
          image_id: null,
          lead_investors: [
            {
              image: "lferemuefcg4yue7de9g",
              name: "Bass Investment",
              permalink: "bass-investment",
              uuid: "4992e606-e918-46d9-bd0f-bd94e008883e",
            },
            {
              image: "cttoyhokz4ui1zlo8kmd",
              name: "Kakao Ventures",
              permalink: "kakao-ventures",
              uuid: "cc634d86-242e-4e01-aa36-a2f51162c396",
            },
            {
              image: "byjwfnpq5cy0k4dx6uhb",
              name: "Moyo",
              permalink: "moyo-d87b",
              uuid: "ef6022b5-0787-4d16-a6d5-0dc0e5c4d87b",
            },
          ],
          money_raised: {
            currency: "KRW",
            value: "1000000000",
            value_usd: "835073",
          },
          title: "Seed Round - Moyo",
          uuid: "3dffcdeb-c928-487c-a44d-181fa17008e8",
        },
      ],
      bombora: [],
      investors: [
        {
          funding_round: {
            id: "34f806f8-5ff5-41ed-a340-54b523842f0c",
            image_id: "byjwfnpq5cy0k4dx6uhb",
            type: "funding_round",
            value: "Seed Round - Moyo",
          },
          id: "kakao-ventures-invested-in-moyo-d87b-seed--34f806f8--275ee5e5",
          investor: {
            id: "kakao-ventures",
            image_id: "cttoyhokz4ui1zlo8kmd",
            type: "organization",
            value: "Kakao Ventures",
          },
          lead_investor: null,
          type: "investment",
          value: "Kakao Ventures investment in Seed Round - Moyo",
        },
        {
          funding_round: {
            id: "34f806f8-5ff5-41ed-a340-54b523842f0c",
            image_id: "byjwfnpq5cy0k4dx6uhb",
            type: "funding_round",
            value: "Seed Round - Moyo",
          },
          id: "bass-investment-invested-in-moyo-d87b-seed--34f806f8--478bf8d3",
          investor: {
            id: "bass-investment",
            image_id: "lferemuefcg4yue7de9g",
            type: "organization",
            value: "Bass Investment",
          },
          lead_investor: true,
          type: "investment",
          value: "Bass Investment investment in Seed Round - Moyo",
        },
        {
          funding_round: {
            id: "3dffcdeb-c928-487c-a44d-181fa17008e8",
            image_id: "byjwfnpq5cy0k4dx6uhb",
            type: "funding_round",
            value: "Seed Round - Moyo",
          },
          id: "bass-investment-invested-in-moyo-d87b-seed--3dffcdeb--0e52da4c",
          investor: {
            id: "bass-investment",
            image_id: "lferemuefcg4yue7de9g",
            type: "organization",
            value: "Bass Investment",
          },
          lead_investor: null,
          type: "investment",
          value: "Bass Investment investment in Seed Round - Moyo",
        },
        {
          funding_round: {
            id: "3dffcdeb-c928-487c-a44d-181fa17008e8",
            image_id: "byjwfnpq5cy0k4dx6uhb",
            type: "funding_round",
            value: "Seed Round - Moyo",
          },
          id: "kakao-ventures-invested-in-moyo-d87b-seed--3dffcdeb--2048d755",
          investor: {
            id: "kakao-ventures",
            image_id: "cttoyhokz4ui1zlo8kmd",
            type: "organization",
            value: "Kakao Ventures",
          },
          lead_investor: null,
          type: "investment",
          value: "Kakao Ventures investment in Seed Round - Moyo",
        },
      ],
      acquisitions: [],
      funds_raised: [],
      investments: [],
      apptopia: [],
      current_advisors: [],
      exits: [],
      news: [
        {
          date: "2023-02-16",
          organization: "Bass Investment",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
        {
          date: "2022-02-14",
          organization: "Bass Investment",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
      ],
      aberdeen_it_spend: null,
      headquarters_regions: [
        {
          id: "asia-pacific",
          value: "Asia-Pacific (APAC)",
        },
      ],
      financials_highlights: {
        funding_total: {
          value: 4000000000,
          currency: "KRW",
          value_usd: 3161106,
        },
        num_funding_rounds: 2,
        num_investors: 2,
        num_lead_investors: 1,
      },
      ipqwery: {},
      overview_highlights: {
        funding_total: {
          value: 4000000000,
          currency: "KRW",
          value_usd: 3161106,
        },
        num_investors: 2,
        num_org_similarities: 1,
      },
      people_highlights: {},
      technology_highlights: {
        builtwith_num_technologies_used: 17,
        semrush_visits_latest_month: 1014160,
        semrush_visits_mom_pct: -0.183890249751343,
      },
      founders: [],
    },
  },
};

// Type Check
const bamin: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "94a20201-b1f3-4a01-b2b6-1ae118fbc776",
      name: "Baemin Riders",
      url: "https://www.crunchbase.com/organization/baemin-riders",
      rank_company: 2843234,
      locations: [
        {
          value: "Songpadong",
          location_type: "city",
        },
        {
          value: "Seoul-t'ukpyolsi",
          location_type: "region",
        },
        {
          value: "South Korea",
          location_type: "country",
        },
        {
          value: "Asia",
          location_type: "continent",
        },
      ],
      address: "Songpadong, Seoul-t'ukpyolsi, South Korea, Asia",
      about: "Baemin Riders provides food delivery services.",
      full_description: null,
      industries: ["Food Delivery", "Home Services"],
      operating_status: "active",
      founded_date: null,
      company_type: "for_profit",
      social_media: [],
      num_employees: null,
      website: "http://www.baeminriders.kr/",
      ipo_status: "private",
      contact_email: "help@woowahan.com",
      contact_phone: "417-87-00193",
      funding_info: [
        {
          title: "Home Services Companies With Less Than $50M in Revenue",
          org_num: 6476,
          org_num_investors: 1261,
          org_funding_total: {
            value_usd: 3855992773,
            currency: "USD",
            value: 3855992773,
          },
        },
        {
          title: "Food Delivery Companies With Less Than $1B in Revenue",
          org_num: 4122,
          org_num_investors: 3619,
          org_funding_total: {
            value_usd: 60256823196,
            currency: "USD",
            value: 60256823196,
          },
        },
        {
          title: "Asia Food Delivery Companies",
          org_num: 1523,
          org_num_investors: 1936,
          org_funding_total: {
            value_usd: 61839377497,
            currency: "USD",
            value: 61839377497,
          },
        },
        {
          title: "Seoul-t'ukpyolsi Companies With Less Than $500M in Revenue",
          org_num: 3721,
          org_num_investors: 5426,
          org_funding_total: {
            value_usd: 30019074419,
            currency: "USD",
            value: 30019074419,
          },
        },
      ],
      similar_companies: [
        {
          name: "Foodhive",
          url: "https://www.crunchbase.com/organization/food-hive",
        },
        {
          name: "Obenzo",
          url: "https://www.crunchbase.com/organization/obenzo",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/8c8d378607704a76985c",
      semrush_monthly_visits: 61805,
      semrush_monthly_visits_growth: 17.2369430510475,
      semrush_last_updated: "2024-07-15",
      num_contacts: null,
      num_employee_profiles: 11,
      total_active_products: 0,
      num_news: null,
      funding_rounds: {
        last_funding_at: null,
        last_funding_type: null,
        num_funding_rounds: null,
        value: {
          currency: null,
          value: null,
          value_usd: null,
        },
      },
      bombora_last_updated: null,
      num_investors: null,
      legal_name: null,
      num_event_appearances: null,
      num_acquisitions: null,
      num_investments: null,
      num_advisor_positions: null,
      num_exits: null,
      num_investments_lead: null,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: null,
      contacts: [],
      event_appearances: [],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: null,
        stock_link: null,
        stock_symbol: null,
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [],
      semrush_location_list: [
        {
          locations: [
            {
              name: "South Korea",
              permalink: "south-korea",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 16676,
          rank_mom_pct: -0.820959620360529,
          visits_mom_pct: 17.2369430510475,
          visits_pct: 1.0,
        },
      ],
      siftery_products: [],
      funding_rounds_list: [],
      overview_timeline: [],
      bombora: [],
      investors: [],
      acquisitions: [],
      funds_raised: [],
      investments: [],
      apptopia: [],
      current_advisors: [],
      exits: [],
      news: [],
      aberdeen_it_spend: null,
      headquarters_regions: [
        {
          id: "asia-pacific",
          value: "Asia-Pacific (APAC)",
        },
      ],
      financials_highlights: {},
      ipqwery: {},
      overview_highlights: {
        num_org_similarities: 2,
      },
      people_highlights: {},
      technology_highlights: {
        builtwith_num_technologies_used: 1,
        semrush_visits_latest_month: 61805,
        semrush_visits_mom_pct: 17.2369430510475,
      },
      founders: [],
    },
  },
};

// Type Check
const naver: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "94a20201-b1f3-4a01-b2b6-1ae118fbc776",
      name: "Baemin Riders",
      url: "https://www.crunchbase.com/organization/baemin-riders",
      rank_company: 2843234,
      locations: [
        {
          value: "Songpadong",
          location_type: "city",
        },
        {
          value: "Seoul-t'ukpyolsi",
          location_type: "region",
        },
        {
          value: "South Korea",
          location_type: "country",
        },
        {
          value: "Asia",
          location_type: "continent",
        },
      ],
      address: "Songpadong, Seoul-t'ukpyolsi, South Korea, Asia",
      about: "Baemin Riders provides food delivery services.",
      full_description: null,
      industries: ["Food Delivery", "Home Services"],
      operating_status: "active",
      founded_date: null,
      company_type: "for_profit",
      social_media: [],
      num_employees: null,
      website: "http://www.baeminriders.kr/",
      ipo_status: "private",
      contact_email: "help@woowahan.com",
      contact_phone: "417-87-00193",
      funding_info: [
        {
          title: "Home Services Companies With Less Than $50M in Revenue",
          org_num: 6476,
          org_num_investors: 1261,
          org_funding_total: {
            value_usd: 3855992773,
            currency: "USD",
            value: 3855992773,
          },
        },
        {
          title: "Food Delivery Companies With Less Than $1B in Revenue",
          org_num: 4122,
          org_num_investors: 3619,
          org_funding_total: {
            value_usd: 60256823196,
            currency: "USD",
            value: 60256823196,
          },
        },
        {
          title: "Asia Food Delivery Companies",
          org_num: 1523,
          org_num_investors: 1936,
          org_funding_total: {
            value_usd: 61839377497,
            currency: "USD",
            value: 61839377497,
          },
        },
        {
          title: "Seoul-t'ukpyolsi Companies With Less Than $500M in Revenue",
          org_num: 3721,
          org_num_investors: 5426,
          org_funding_total: {
            value_usd: 30019074419,
            currency: "USD",
            value: 30019074419,
          },
        },
      ],
      similar_companies: [
        {
          name: "Foodhive",
          url: "https://www.crunchbase.com/organization/food-hive",
        },
        {
          name: "Obenzo",
          url: "https://www.crunchbase.com/organization/obenzo",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/8c8d378607704a76985c",
      semrush_monthly_visits: 61805,
      semrush_monthly_visits_growth: 17.2369430510475,
      semrush_last_updated: "2024-07-15",
      num_contacts: null,
      num_employee_profiles: 11,
      total_active_products: 0,
      num_news: null,
      funding_rounds: {
        last_funding_at: null,
        last_funding_type: null,
        num_funding_rounds: null,
        value: {
          currency: null,
          value: null,
          value_usd: null,
        },
      },
      bombora_last_updated: null,
      num_investors: null,
      legal_name: null,
      num_event_appearances: null,
      num_acquisitions: null,
      num_investments: null,
      num_advisor_positions: null,
      num_exits: null,
      num_investments_lead: null,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: null,
      contacts: [],
      event_appearances: [],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: null,
        stock_link: null,
        stock_symbol: null,
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [],
      semrush_location_list: [
        {
          locations: [
            {
              name: "South Korea",
              permalink: "south-korea",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 16676,
          rank_mom_pct: -0.820959620360529,
          visits_mom_pct: 17.2369430510475,
          visits_pct: 1.0,
        },
      ],
      siftery_products: [],
      funding_rounds_list: [],
      overview_timeline: [],
      bombora: [],
      investors: [],
      acquisitions: [],
      funds_raised: [],
      investments: [],
      apptopia: [],
      current_advisors: [],
      exits: [],
      news: [],
      aberdeen_it_spend: null,
      headquarters_regions: [
        {
          id: "asia-pacific",
          value: "Asia-Pacific (APAC)",
        },
      ],
      financials_highlights: {},
      ipqwery: {},
      overview_highlights: {
        num_org_similarities: 2,
      },
      people_highlights: {},
      technology_highlights: {
        builtwith_num_technologies_used: 1,
        semrush_visits_latest_month: 61805,
        semrush_visits_mom_pct: 17.2369430510475,
      },
      founders: [],
    },
  },
};

// Type Check
const naverWebtoon: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
      name: "Naver Webtoon",
      url: "https://www.crunchbase.com/organization/naver-webtoon",
      rank_company: null,
      locations: null,
      address: "",
      about:
        "Naver Webtoon specializes in content research and development, design, business support, and technology services.",
      full_description: null,
      industries: [
        "Content",
        "Information Technology",
        "Internet",
        "Media and Entertainment",
      ],
      operating_status: "active",
      founded_date: "2017-01-01",
      company_type: "for_profit",
      social_media: [
        {
          name: "linkedin",
          link: "https://www.linkedin.com/company/naver-webtoon-corp/",
        },
      ],
      num_employees: null,
      website: null,
      ipo_status: null,
      contact_email: null,
      contact_phone: "+82 1833-6138",
      funding_info: [
        {
          title: "South Korea Companies With More Than 10 Employees",
          org_num: 8586,
          org_num_investors: 11962,
          org_funding_total: {
            value_usd: 165942312411,
            currency: "USD",
            value: 165942312411,
          },
        },
        {
          title: "Kyonggi-do Information Technology Companies",
          org_num: 690,
          org_num_investors: 451,
          org_funding_total: {
            value_usd: 1953129979,
            currency: "USD",
            value: 1953129979,
          },
        },
        {
          title:
            "South Korea Companies With Fewer Than 1000 Employees (Top 10K)",
          org_num: 9876,
          org_num_investors: 14649,
          org_funding_total: {
            value_usd: 63772394647,
            currency: "USD",
            value: 63772394647,
          },
        },
        {
          title: "Internet Companies With More Than 50 Employees (Top 10K)",
          org_num: 9733,
          org_num_investors: 19134,
          org_funding_total: {
            value_usd: 534035295142,
            currency: "USD",
            value: 534035295142,
          },
        },
      ],
      similar_companies: [
        {
          name: "Infoesearch",
          url: "https://www.crunchbase.com/organization/infoesearch",
        },
        {
          name: "Step Conference",
          url: "https://www.crunchbase.com/organization/step-conference",
        },
        {
          name: "CELLECT mobile entertainment",
          url: "https://www.crunchbase.com/organization/cellect-mobile-entertainment",
        },
        {
          name: "ViviON",
          url: "https://www.crunchbase.com/organization/vivion-7355",
        },
        {
          name: "Zealz",
          url: "https://www.crunchbase.com/organization/zealz",
        },
        {
          name: "epics Japan",
          url: "https://www.crunchbase.com/organization/epics-japan",
        },
        {
          name: "EightBeat",
          url: "https://www.crunchbase.com/organization/eightbeat",
        },
        {
          name: "BoomerSurf",
          url: "https://www.crunchbase.com/organization/boomersurf",
        },
        {
          name: "MWTV",
          url: "https://www.crunchbase.com/organization/mwtv-1af3",
        },
        {
          name: "TSB Media Venture",
          url: "https://www.crunchbase.com/organization/tsb-media-venture",
        },
      ],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/kejuyrh3zyr7mu2dydhu",
      semrush_monthly_visits: 65882,
      semrush_monthly_visits_growth: -0.0340874103830985,
      semrush_last_updated: "2024-07-15",
      num_contacts: null,
      num_employee_profiles: 11,
      total_active_products: 0,
      num_news: 12,
      funding_rounds: {
        last_funding_at: null,
        last_funding_type: null,
        num_funding_rounds: null,
        value: {
          currency: null,
          value: null,
          value_usd: null,
        },
      },
      bombora_last_updated: null,
      num_investors: null,
      legal_name: "Naver Webtoon Limited",
      num_event_appearances: null,
      num_acquisitions: 1,
      num_investments: null,
      num_advisor_positions: null,
      num_exits: null,
      num_investments_lead: 1,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: null,
      contacts: [
        {
          name: "Mark Arbitrario",
          linkedin_id: "markarbitrario",
          levels: ["l_500_exec"],
          departments: ["management"],
        },
      ],
      event_appearances: [],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: null,
        stock_link: null,
        stock_symbol: null,
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [],
      semrush_location_list: [
        {
          locations: [
            {
              name: "South Korea",
              permalink: "south-korea",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 18930,
          rank_mom_pct: 0.008792965627498,
          visits_mom_pct: -0.0643003656470169,
          visits_pct: 0.796272122886373,
        },
        {
          locations: [
            {
              name: "Saudi Arabia",
              permalink: "saudi-arabia",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 34802,
          rank_mom_pct: null,
          visits_mom_pct: null,
          visits_pct: 0.0826325855317082,
        },
        {
          locations: [
            {
              name: "France",
              permalink: "france",
            },
            {
              name: "Europe",
              permalink: "europe",
            },
          ],
          rank: 161958,
          rank_mom_pct: -0.485811707484332,
          visits_mom_pct: 1.98943894389439,
          visits_pct: 0.0687441182720622,
        },
        {
          locations: [
            {
              name: "Japan",
              permalink: "japan",
            },
            {
              name: "Asia",
              permalink: "asia",
            },
          ],
          rank: 478814,
          rank_mom_pct: 0.223671264244441,
          visits_mom_pct: -0.511387163561077,
          visits_pct: 0.01074648614189,
        },
        {
          locations: [
            {
              name: "United States",
              permalink: "united-states",
            },
            {
              name: "North America",
              permalink: "north-america",
            },
          ],
          rank: 2151518,
          rank_mom_pct: 0.827874534858036,
          visits_mom_pct: -0.628397115917915,
          visits_pct: 0.0101696973376643,
        },
      ],
      siftery_products: [],
      funding_rounds_list: [],
      overview_timeline: [
        {
          announced_on: "2024-06-18",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Naver Webtoon aims for $2.67b valuation via Nasdaq listing",
          uuid: "6897ef7f-c3c4-4065-94a6-ecb98ba2ae3b",
        },
        {
          announced_on: "2024-06-04",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Naver Webtoon Prepares for Landmark Nasdaq Listing Amid Financial Challenges and Growth Potential",
          uuid: "c0b5c481-56bc-42d5-b64d-282163c7431c",
        },
        {
          announced_on: "2024-06-02",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Naver Webtoon eyes $4b Nasdaq listing",
          uuid: "e300f96c-5281-4aef-82dd-c4e5670e11a8",
        },
        {
          announced_on: "2023-12-15",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Naver Webtoon to enhance global biz with new exec for US IPO",
          uuid: "c836de2c-8e38-459d-84ef-712791e789fe",
        },
        {
          announced_on: "2023-11-07",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Naver Webtoon: “150 Pirate Sites Shut Down” After Cloudflare DMCA Subpoena",
          uuid: "355b283c-e17c-418a-a309-a6c9842013c1",
        },
        {
          announced_on: "2023-09-07",
          id: "passionate-powerhouse-seed--0e2c97ba",
          image_id: null,
          lead_investors: [
            {
              image: "eag9dpyhetjm4urlundp",
              name: "KB Investment",
              permalink: "kbinvest",
              uuid: "c102bf98-021f-414d-864e-0acea25360c3",
            },
            {
              image: "hu2rssfg2upf1tohdu9r",
              name: "Laguna Investment",
              permalink: "laguna-investment",
              uuid: "34e1e2dc-47d5-4dca-8383-8364f09772a4",
            },
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
            {
              image: "ujy55lsrwvhm0sizzcln",
              name: "Passionate Powerhouse",
              permalink: "passionate-powerhouse",
              uuid: "fe697cc0-ea9f-405f-ae1c-c2707cd558b1",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Seed Round - Passionate Powerhouse",
          uuid: "0e2c97ba-2205-45ca-8482-b3fe4d70cedf",
        },
        {
          announced_on: "2023-07-13",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Naver Webtoon starts fortunetelling, personality test services",
          uuid: "add9f3d6-4b8f-4946-8547-2d23cc05dcf4",
        },
        {
          announced_on: "2023-07-04",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Naver Webtoon promotes K-ramen in Bangkok via pop-up store",
          uuid: "252e4281-e965-49fa-b384-cb96e2b56ba1",
        },
        {
          announced_on: "2023-06-27",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "S.Korea's Naver Webtoon to expand IP-based operations",
          uuid: "14d74f58-9f33-4aaa-bb1d-e26c091e0683",
        },
        {
          announced_on: "2023-05-23",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "kejuyrh3zyr7mu2dydhu",
              name: "Naver Webtoon",
              permalink: "naver-webtoon",
              uuid: "a52a559f-8df9-4ff2-8a61-1f4efbf51bfa",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Naver Webtoon's Toon Filter creates 20 mn AI-converted images",
          uuid: "a3b15d51-52fa-43c2-977c-c51cc9b63c15",
        },
      ],
      bombora: [],
      investors: [],
      acquisitions: [
        {
          acquiree_identifier: {
            role: "acquiree",
            uuid: "9cb865d2-8e84-44e9-9cbf-7fa2a3432d83",
            value: "V.DO",
            image_id: "t50ioiovgzrktrfmgfg2",
            permalink: "v-do",
            entity_def_id: "organization",
          },
          announced_on: {
            value: "2020-01-14",
          },
          identifier: {
            uuid: "01ccf806-de4e-433e-a498-1246b54e4ef4",
            value: "V.DO acquired by Naver Webtoon",
            image_id: "t50ioiovgzrktrfmgfg2",
            permalink: "naver-webtoon-acquires-v-do--01ccf806",
            entity_def_id: "acquisition",
          },
        },
      ],
      funds_raised: [
        {
          announced_on: "2023-09-07",
          id: "naver-webtoon-invested-in-passionate-powerhouse-seed--0e2c97ba--3f3c8820",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value:
            "Naver Webtoon investment in Seed Round - Passionate Powerhouse",
        },
        {
          announced_on: "2023-01-03",
          id: "naver-webtoon-invested-in-the-grim-entertainment-seed--71f97f1a--4e3173de",
          money_raised: 14000000000,
          money_raised_usd: 10942587,
          currency: "KRW",
          type: "investment",
          value:
            "Naver Webtoon investment in Seed Round - The Grim Entertainment",
        },
        {
          announced_on: "2022-07-13",
          id: "naver-webtoon-invested-in-line-next-series-a--d380806a--5f16fd11",
          money_raised: 13000000000,
          money_raised_usd: 9960541,
          currency: "KRW",
          type: "investment",
          value: "Naver Webtoon investment in Series A - Line Next",
        },
        {
          announced_on: "2022-01-01",
          id: "naver-webtoon-invested-in-cinamon-seed--ffc59149--b65a192f",
          money_raised: 10000000000,
          money_raised_usd: 8411278,
          currency: "KRW",
          type: "investment",
          value: "Naver Webtoon investment in Seed Round - Cinamon",
        },
        {
          announced_on: "2021-12-22",
          id: "naver-webtoon-invested-in-by4m-series-b--174b87d4--5ee200c7",
          money_raised: 13800000000,
          money_raised_usd: 11616602,
          currency: "KRW",
          type: "investment",
          value: "Naver Webtoon investment in Series B - BY4M",
        },
        {
          announced_on: "2021-11-30",
          id: "naver-webtoon-invested-in-naver-z-series-b--731a4183--754f2ae3",
          money_raised: 223500000000,
          money_raised_usd: 188933645,
          currency: "KRW",
          type: "investment",
          value: "Naver Webtoon investment in Series B - NAVER Z",
        },
        {
          announced_on: "2018-09-21",
          id: "naver-webtoon-invested-in-super-awesome-corporate-round--00d8ffdc--6507d279",
          money_raised: null,
          money_raised_usd: null,
          currency: null,
          type: "investment",
          value: "Naver Webtoon investment in Corporate Round - Super Awesome",
        },
      ],
      investments: [
        {
          announced_on: "2023-09-07",
          funding_round: {
            id: "passionate-powerhouse-seed--0e2c97ba",
            image_id: "ujy55lsrwvhm0sizzcln",
            type: "funding_round",
            value: "Seed Round - Passionate Powerhouse",
          },
          id: "naver-webtoon-invested-in-passionate-powerhouse-seed--0e2c97ba--3f3c8820",
          organization: {
            id: "passionate-powerhouse",
            image_id: "ujy55lsrwvhm0sizzcln",
            type: "organization",
            value: "Passionate Powerhouse",
          },
          type: "investment",
          value:
            "Naver Webtoon investment in Seed Round - Passionate Powerhouse",
        },
        {
          announced_on: "2023-01-03",
          funding_round: {
            id: "the-grim-entertainment-seed--71f97f1a",
            image_id: null,
            type: "funding_round",
            value: "Seed Round - The Grim Entertainment",
          },
          id: "naver-webtoon-invested-in-the-grim-entertainment-seed--71f97f1a--4e3173de",
          organization: {
            id: "the-grim-entertainment",
            image_id: null,
            type: "organization",
            value: "The Grim Entertainment",
          },
          type: "investment",
          value:
            "Naver Webtoon investment in Seed Round - The Grim Entertainment",
        },
        {
          announced_on: "2022-07-13",
          funding_round: {
            id: "line-next-series-a--d380806a",
            image_id: "rhvzbitv34zeztrgd7q4",
            type: "funding_round",
            value: "Series A - Line Next",
          },
          id: "naver-webtoon-invested-in-line-next-series-a--d380806a--5f16fd11",
          organization: {
            id: "line-next",
            image_id: "rhvzbitv34zeztrgd7q4",
            type: "organization",
            value: "Line Next",
          },
          type: "investment",
          value: "Naver Webtoon investment in Series A - Line Next",
        },
        {
          announced_on: "2022-01-01",
          funding_round: {
            id: "cinamon-seed--ffc59149",
            image_id: "qpxlzjbks0ohgtnvpchs",
            type: "funding_round",
            value: "Seed Round - Cinamon",
          },
          id: "naver-webtoon-invested-in-cinamon-seed--ffc59149--b65a192f",
          organization: {
            id: "cinamon",
            image_id: "qpxlzjbks0ohgtnvpchs",
            type: "organization",
            value: "Cinamon",
          },
          type: "investment",
          value: "Naver Webtoon investment in Seed Round - Cinamon",
        },
        {
          announced_on: "2021-12-22",
          funding_round: {
            id: "by4m-series-b--174b87d4",
            image_id: "uxy0fyb9bizc51hbwl8k",
            type: "funding_round",
            value: "Series B - BY4M",
          },
          id: "naver-webtoon-invested-in-by4m-series-b--174b87d4--5ee200c7",
          organization: {
            id: "by4m",
            image_id: "uxy0fyb9bizc51hbwl8k",
            type: "organization",
            value: "BY4M",
          },
          type: "investment",
          value: "Naver Webtoon investment in Series B - BY4M",
        },
        {
          announced_on: "2021-11-30",
          funding_round: {
            id: "naver-z-series-b--731a4183",
            image_id: "gmahattr29k1tzxntqjo",
            type: "funding_round",
            value: "Series B - NAVER Z",
          },
          id: "naver-webtoon-invested-in-naver-z-series-b--731a4183--754f2ae3",
          organization: {
            id: "naver-z",
            image_id: "gmahattr29k1tzxntqjo",
            type: "organization",
            value: "NAVER Z",
          },
          type: "investment",
          value: "Naver Webtoon investment in Series B - NAVER Z",
        },
        {
          announced_on: "2018-09-21",
          funding_round: {
            id: "super-awesome-corporate-round--00d8ffdc",
            image_id: "e5f86d4c3ba77cf737ff",
            type: "funding_round",
            value: "Corporate Round - Super Awesome",
          },
          id: "naver-webtoon-invested-in-super-awesome-corporate-round--00d8ffdc--6507d279",
          organization: {
            id: "super-awesome",
            image_id: "e5f86d4c3ba77cf737ff",
            type: "organization",
            value: "Super Awesome",
          },
          type: "investment",
          value: "Naver Webtoon investment in Corporate Round - Super Awesome",
        },
      ],
      apptopia: [],
      current_advisors: [],
      exits: [],
      news: [
        {
          date: "2024-06-18",
          organization: "Naver Webtoon",
          publisher: "Korea Herald",
          thumbnail_url: null,
          title: "Naver Webtoon aims for $2.67b valuation via Nasdaq listing",
          url: "http://www.koreaherald.com/view.php?ud=20240618050485",
        },
        {
          date: "2024-06-04",
          organization: "Naver Webtoon",
          publisher: "KoreaTechDesk",
          thumbnail_url:
            "https://www.koreatechdesk.com/wp-content/uploads/2023/10/Group-823.png",
          title:
            "Naver Webtoon Prepares for Landmark Nasdaq Listing Amid Financial Challenges and Growth Potential",
          url: "https://www.koreatechdesk.com/naver-webtoon-prepares-for-landmark-nasdaq-listing-amid-financial-challenges-and-growth-potential/",
        },
        {
          date: "2024-06-02",
          organization: "Naver Webtoon",
          publisher: "Korea Herald",
          thumbnail_url:
            "http://res.heraldm.com/content/image/2024/06/02/20240602050103_0.jpg",
          title: "Naver Webtoon eyes $4b Nasdaq listing",
          url: "http://www.koreaherald.com/view.php?ud=20240602050117",
        },
        {
          date: "2023-12-15",
          organization: "Naver Webtoon",
          publisher: "KED Global",
          thumbnail_url:
            "https://www.kedglobal.com/data/ked/image/2023/12/15/ked202312150008.540x.0.jpg",
          title: "Naver Webtoon to enhance global biz with new exec for US IPO",
          url: "https://www.kedglobal.com/webtoons/newsView/ked202312150008",
        },
        {
          date: "2023-11-07",
          organization: "Naver Webtoon",
          publisher: "torrentfreak.com",
          thumbnail_url: "https://torrentfreak.com/images/naver-280.png",
          title:
            "Naver Webtoon: “150 Pirate Sites Shut Down” After Cloudflare DMCA Subpoena",
          url: "https://torrentfreak.com/naver-webtoon-150-pirate-sites-shut-down-after-cloudflare-dmca-subpoena-231106/",
        },
        {
          date: "2023-09-07",
          organization: "KB Investment",
          publisher: null,
          thumbnail_url: null,
          title: null,
          url: null,
        },
        {
          date: "2023-07-13",
          organization: "Naver Webtoon",
          publisher: "Korea Economic Daily",
          thumbnail_url:
            "https://www.kedglobal.com/data/ked/image/2023/07/13/ked202307130008.556x.0.jpg",
          title:
            "Naver Webtoon starts fortunetelling, personality test services",
          url: "https://www.kedglobal.com/webtoons/newsView/ked202307130002",
        },
        {
          date: "2023-07-04",
          organization: "Naver Webtoon",
          publisher: "Korea Economic Daily",
          thumbnail_url:
            "https://www.kedglobal.com/data/ked/image/2023/07/04/ked202307040015.647x.0.jpg",
          title: "Naver Webtoon promotes K-ramen in Bangkok via pop-up store",
          url: "https://www.kedglobal.com/webtoons/newsView/ked202307040012",
        },
        {
          date: "2023-06-27",
          organization: "Naver Webtoon",
          publisher: "Korea Economic Daily",
          thumbnail_url:
            "https://www.kedglobal.com/data/ked/image/2023/06/27/ked202306270015.647x.0.jpg",
          title: "S.Korea's Naver Webtoon to expand IP-based operations",
          url: "https://www.kedglobal.com/webtoons/newsView/ked202306270010",
        },
        {
          date: "2023-05-23",
          organization: "Naver Webtoon",
          publisher: "Korea Economic Daily",
          thumbnail_url:
            "https://www.kedglobal.com/data/ked/image/2023/05/23/ked202305230003.700x.0.png",
          title:
            "Naver Webtoon's Toon Filter creates 20 mn AI-converted images",
          url: "https://www.kedglobal.com/webtoons/newsView/ked202305230003",
        },
      ],
      aberdeen_it_spend: null,
      headquarters_regions: [
        {
          id: "asia-pacific",
          value: "Asia-Pacific (APAC)",
        },
      ],
      financials_highlights: null,
      ipqwery: {},
      overview_highlights: null,
      people_highlights: {
        num_contacts: 22,
      },
      technology_highlights: {
        builtwith_num_technologies_used: 15,
        semrush_visits_latest_month: 65882,
        semrush_visits_mom_pct: -0.0340874103830985,
      },
      founders: [],
    },
  },
};

// Type Check
const tesla: ICrunchbase.CrunchbaseResponse = {
  description: "OK",
  status: 200,
  data: {
    organizationExists: true,
    organization: {
      id: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
      name: "Tesla",
      url: "https://www.crunchbase.com/organization/tesla",
      rank_company: 2925785,
      locations: [
        {
          value: "Ciudad De Panamá",
          location_type: "city",
        },
        {
          value: "Panama",
          location_type: "region",
        },
        {
          value: "Panama",
          location_type: "country",
        },
        {
          value: "North America",
          location_type: "continent",
        },
      ],
      address: "Ciudad De Panamá, Panama, Panama, North America",
      about:
        "Tesla is a financial leasing taxi, we provide the best vehicles to our customers, giving them the opportunity to achieve their dreams",
      full_description:
        'They are a small, growing business where Their customers are the main concern. They are a financial leasing taxi, They provide the best vehicles to Their customers, giving them the opportunity to achieve their dreams, a steady job where be your own boss, handle revenue to newspapers and making this work a way of life that make you think " while most earn work " , have a means of transportation that will not only give a lucrative benefit is the ability to have a lifestyle like everybody wants. They differ from the rest because They are not a taxi company, Their financial leasing main objective Their customers achieve finish as soon as possible with financing and so make way for new leads that will be willing to do the same to achieve the success.',
      industries: ["Automotive", "Financial Services"],
      operating_status: "closed",
      founded_date: "2003-07-01",
      company_type: "for_profit",
      social_media: [],
      num_employees: null,
      website: "http://tesla-pa.com/",
      ipo_status: "private",
      contact_email: "info@tesla-pa.com",
      contact_phone: "(679) 942-78",
      funding_info: [
        {
          title: "Closed Central America Companies",
          org_num: 138,
          org_num_investors: 42,
          org_funding_total: {
            value_usd: 62117104,
            currency: "USD",
            value: 62117104,
          },
        },
        {
          title: "Closed Financial Services Companies",
          org_num: 6386,
          org_num_investors: 2924,
          org_funding_total: {
            value_usd: 24204399820,
            currency: "USD",
            value: 24204399820,
          },
        },
        {
          title: "Closed Automotive Companies",
          org_num: 2112,
          org_num_investors: 1065,
          org_funding_total: {
            value_usd: 7131638798,
            currency: "USD",
            value: 7131638798,
          },
        },
        {
          title: "Closed Latin America Companies",
          org_num: 4752,
          org_num_investors: 1324,
          org_funding_total: {
            value_usd: 2285080067,
            currency: "USD",
            value: 2285080067,
          },
        },
      ],
      similar_companies: [],
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1441018399/x4jtohcctziw0ovyitfu.png",
      semrush_monthly_visits: null,
      semrush_monthly_visits_growth: null,
      semrush_last_updated: null,
      num_contacts: null,
      num_employee_profiles: 11,
      total_active_products: 0,
      num_news: 6310,
      funding_rounds: {
        last_funding_at: null,
        last_funding_type: null,
        num_funding_rounds: null,
        value: {
          currency: null,
          value: null,
          value_usd: null,
        },
      },
      bombora_last_updated: null,
      num_investors: null,
      legal_name: "Tesla Company Inc",
      num_event_appearances: null,
      num_acquisitions: null,
      num_investments: null,
      num_advisor_positions: null,
      num_exits: null,
      num_investments_lead: null,
      num_sub_organizations: null,
      num_alumni: null,
      num_founder_alumni: null,
      num_diversity_spotlight_investments: null,
      num_funds: null,
      stock_symbol: null,
      contacts: [],
      event_appearances: [],
      sub_organizations: [],
      alumni: [],
      diversity_investments: [],
      funds: [],
      layoff: [],
      ipo: {
        date: null,
        stock_link: null,
        stock_symbol: null,
      },
      funds_total: null,
      acquired_by: {
        acquirer: null,
        acquirer_permalink: null,
        acquisition_price: null,
        date: null,
        transaction_name: null,
      },
      investor_type: null,
      investment_stage: null,
      current_employees: [],
      semrush_location_list: [],
      siftery_products: [],
      funding_rounds_list: [],
      overview_timeline: [
        {
          announced_on: "2024-03-08",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Tesla fails to keep up with China’s fast-growing EV sector amid escalating price war, posts declining February sales",
          uuid: "53aaf26f-b16b-415c-849f-86197eee1182",
        },
        {
          announced_on: "2024-03-08",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "Tesla’s electric semi-truck takes on diesel big rig",
          uuid: "5b45956a-a898-44c7-a71a-b93631b4c811",
        },
        {
          announced_on: "2024-03-07",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Tesla’s Model Y Now Offered With No Rear Seats For Commercial Use",
          uuid: "ccbfce71-7901-4f42-ab1d-7bd6496e5e5d",
        },
        {
          announced_on: "2020-10-05",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title: "History of Tesla: Timeline and Facts",
          uuid: "cd847bfc-0b14-485e-b979-3faa152ada07",
        },
        {
          announced_on: "2020-05-18",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Panasonic sees strong demand from Tesla, in talks to expand Nevada battery plant",
          uuid: "7a4ea40f-a9ce-4b5f-af25-3a7d9b7f8364",
        },
        {
          announced_on: "2020-05-18",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Factory workers wary as Detroit's 'Big 3' begins to motor back up",
          uuid: "8e8c0a03-99cb-4fe6-aebf-e11ae53c3efc",
        },
        {
          announced_on: "2020-05-17",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Elon Musk and Ivanka Trump 'red pill' reference slammed by The Matrix director",
          uuid: "33b0f5df-a901-4daa-9e32-b025ba8cb08f",
        },
        {
          announced_on: "2020-05-17",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "How Elon Musk was inspired to found Tesla, SpaceX after being fired from PayPal",
          uuid: "421f9844-e61b-477d-9d74-926696850037",
        },
        {
          announced_on: "2020-05-17",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Autoworkers Are Returning as Carmakers Gradually Crank Up Factories",
          uuid: "60914b38-005d-41a4-9d11-e6226a6df377",
        },
        {
          announced_on: "2020-05-17",
          id: null,
          image_id: null,
          lead_investors: [
            {
              image: "v1441018399/x4jtohcctziw0ovyitfu.png",
              name: "Tesla",
              permalink: "tesla",
              uuid: "c9682996-4ae0-d7cb-9d4e-78975c258ee5",
            },
          ],
          money_raised: {
            currency: null,
            value: null,
            value_usd: null,
          },
          title:
            "Tesla Receives County Approval To Restart Fremont Production A Week After Musk's Threats",
          uuid: "a6ab0d5d-1595-4183-8f67-1d8972a424ba",
        },
      ],
      bombora: [],
      investors: [],
      acquisitions: [],
      funds_raised: [],
      investments: [],
      apptopia: [
        {
          identifier: {
            uuid: "84582876-cbe9-4cf6-8ca6-df788253472c",
            value: "BABOCHKA",
            image_id: "apptopia/app/c29b9290-ccb5-49eb-b0a1-6a6ec549318e",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
        },
        {
          identifier: {
            uuid: "ad4d8876-84a5-409f-a5ec-f51d4f188c61",
            value: "Прогнозы РГГМУ",
            image_id: "apptopia/app/a3d3da2a-2a88-48c2-8367-c9163110b7b8",
            entity_def_id: "apptopia_app",
          },
          stores: ["itunes_connect"],
        },
      ],
      current_advisors: [],
      exits: [],
      news: [
        {
          date: "2024-03-08",
          organization: "Tesla",
          publisher: "South China Morning Post",
          thumbnail_url:
            "https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2024/03/08/a9bcfff8-5a8e-4e0b-a4d7-e28c1dbb6c36_154f92e4.jpg?itok=BkEjkO1w&v=1709897777",
          title:
            "Tesla fails to keep up with China’s fast-growing EV sector amid escalating price war, posts declining February sales",
          url: "https://www.scmp.com/business/china-business/article/3254727/tesla-fails-keep-chinas-fast-growing-ev-sector-amid-escalating-price-war-posts-declining-february",
        },
        {
          date: "2024-03-08",
          organization: "Tesla",
          publisher: "Fox News - Tech",
          thumbnail_url:
            "https://static.foxnews.com/foxnews.com/content/uploads/2024/03/1-Tesla%E2%80%99s-electric-Semi-Truck-is-rewriting-the-rules-of-the-road.jpg",
          title: "Tesla’s electric semi-truck takes on diesel big rig",
          url: "https://www.foxnews.com/tech/teslas-electric-semi-truck-takes-on-a-diesel-big-rig",
        },
        {
          date: "2024-03-07",
          organization: "Tesla",
          publisher: "Redmond Pie",
          thumbnail_url:
            "https://cdn.redmondpie.com/wp-content/uploads/2023/07/model-y.jpg",
          title:
            "Tesla’s Model Y Now Offered With No Rear Seats For Commercial Use",
          url: "https://www.redmondpie.com/teslas-model-y-now-offered-with-no-rear-seats-for-commercial-use/",
        },
        {
          date: "2020-10-05",
          organization: "Tesla",
          publisher: "TheStreet",
          thumbnail_url:
            "https://www.thestreet.com/.image/t_share/MTY3NTM5MzU3NzQ5NjgzNTkx/tesla-analysts-raise-targets-after-blowout-quarter-what-wall-street-is-saying.jpg",
          title: "History of Tesla: Timeline and Facts",
          url: "https://www.thestreet.com/technology/history-of-tesla-15088992",
        },
        {
          date: "2020-05-18",
          organization: "Tesla",
          publisher: "Reuters",
          thumbnail_url:
            "https://s4.reutersmedia.net/resources/r/?m=02&d=20200518&t=2&i=1519005561&r=LYNXMPEG4H0HU",
          title:
            "Panasonic sees strong demand from Tesla, in talks to expand Nevada battery plant",
          url: "https://www.reuters.com/article/us-panasonic-results-idUSKBN22U0MF",
        },
        {
          date: "2020-05-18",
          organization: "Tesla",
          publisher: "Japan Today",
          thumbnail_url:
            "https://japantoday-asset.scdn3.secure.raxcdn.com/img/store/4f/63/e0240a5a1e250a345cb1e335a6d5a04ad516/4f63e0240a5a1e250a345cb1e335a6d5a04ad516/_w1700.jpg",
          title:
            "Factory workers wary as Detroit's 'Big 3' begins to motor back up",
          url: "https://japantoday.com/category/business/factory-workers-wary-as-detroit%27s-%27big-3%27-begins-to-motor-back-up?comment-order=latest",
        },
        {
          date: "2020-05-17",
          organization: "Tesla",
          publisher: "CNet",
          thumbnail_url:
            "https://cnet1.cbsistatic.com/img/vPe_uHzBelbNP60ng0OKyEPlUxQ=/1092x0/2020/05/17/b265fad3-4766-4f11-8f78-98b15d2bcb2f/gettyimages-930522554.jpg",
          title:
            "Elon Musk and Ivanka Trump 'red pill' reference slammed by The Matrix director",
          url: "https://www.cnet.com/news/elon-musk-and-ivanka-trump-red-pill-reference-slammed-by-the-matrix-director/",
        },
        {
          date: "2020-05-17",
          organization: "Tesla",
          publisher: "Fox Business",
          thumbnail_url:
            "http://media.foxbusiness.com/BrightCove/854081161001/202005/968/854081161001_6156309881001_6156305156001-vs.jpg",
          title:
            "How Elon Musk was inspired to found Tesla, SpaceX after being fired from PayPal",
          url: "https://www.foxbusiness.com/money/elon-musk-fired-paypay-founded-tesla-spacex",
        },
        {
          date: "2020-05-17",
          organization: "Tesla",
          publisher: "New York Times (NYT)",
          thumbnail_url:
            "https://static01.nyt.com/images/2020/05/18/business/17JPvirus-autos-print/17virus-auto1-facebookJumbo.jpg",
          title:
            "Autoworkers Are Returning as Carmakers Gradually Crank Up Factories",
          url: "https://www.nytimes.com/2020/05/17/business/coronavirus-auto-manufacturing-restart.html",
        },
        {
          date: "2020-05-17",
          organization: "Tesla",
          publisher: "Yahoo Finance",
          thumbnail_url:
            "https://s.yimg.com/ny/api/res/1.2/.Hf4yf4w3JvJatFMwFxI8w--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NjAwO2g9NDAw/https://media.zenfs.com/en/Benzinga/8e7e445a390caecb5b596c4ce9b380d2",
          title:
            "Tesla Receives County Approval To Restart Fremont Production A Week After Musk's Threats",
          url: "https://finance.yahoo.com/news/tesla-finally-receives-county-approval-043720953.html",
        },
      ],
      aberdeen_it_spend: null,
      headquarters_regions: [
        {
          id: "central-america",
          value: "Central America",
        },
        {
          id: "latin-america",
          value: "Latin America",
        },
      ],
      financials_highlights: {},
      ipqwery: {},
      overview_highlights: {},
      people_highlights: {},
      technology_highlights: {
        builtwith_num_technologies_used: 1,
      },
      founders: [],
    },
  },
};
