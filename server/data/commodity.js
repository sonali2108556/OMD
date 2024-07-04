import Commodity from "../model/commodity.js";
import Manufacturer from "../model/manufacturer.js";

export const commodityDataEntry = async () => {
  // Connect to MongoDB

  const manufacturerList = await Manufacturer.find({});

  const medicineNames = [
    {
      name: "Crocin Advance 500mg Tablet",
      code: "crocin-advance-500mg-tablet",
      price: 382,
      discount: 30,
      unit: "N",
      sellingUnit: "strip",
      benefits: [
        {
          title: "In Pain relief",
          summary:
            "Crocin Tablet is a common painkiller for treating aches and pains. It is widely used and rarely causes any side effects if taken properly. To get the most benefits, take it as prescribed. Do not take more or for longer than needed as that can be dangerous.",
        },
        {
          title: "In Treatment of Fever",
          summary:
            "Crocin Tablet is also used to reduce a high temperature (fever). It works by blocking the release of certain chemical messengers that cause fever. It may be prescribed alone or in combination with other medicines. Take it as prescribed by the doctor.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "2 tablets/day with an interval of 10 hours",
      quantity: 10,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer:
        "Crocin Advance 500mg Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold.Crocin Advance 500mg Tablet may be prescribed alone or in combination with another medicine. You should take it regularly as advised by your doctor. It is usually best taken with food otherwise it may upset your stomach. Do not take more or use it for longer than recommended.",
      photos: [
        "https://cdn01.pharmeasy.in/dam/products_otc/H45820/crocin-650-tablet-15-nos-3-1689759566.jpg",
        "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/9928cf97b5ed4dcfa8544213d887635b.jpg",
      ],
      content: {
        details:
          "Crocin Advance 500mg Tablet is widely prescribed and considered safe but is not suitable for everybody. Before taking it, let your doctor know if you have liver or kidney problems or are using blood-thinning medicines. It may affect the dose or suitability of this medicine. Let your doctor know about all the other medicines you are taking because they may affect, or be affected by, this medicine.",
        composition: ["Paracetamol (Acetaminophen) 650mg", "Caffeine 65mg"],
      },
      category: "Antipyretics",
      type: "Capsule",
      sideEffects: ["Skin rash", "Irritation or blisters", "Allergic reactions"],
      usedFor: "Headaches, Toothaches, Muscle pain, Back pain, Cold and flu symptoms, Menstrual cramps",
      rating: 4.5,
      purchasedBy: Math.floor(Math.random() * 1234 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "Dolo 650 Tablet",
      code: "dolo-650-tablet",
      price: 450,
      discount: 20,
      unit: "N",
      sellingUnit: "strip",
      benefits: [
        {
          title: "In Pain relief",
          summary:
            "Dolo 650 Tablet is a common painkiller for treating aches and pains. It is widely used and rarely causes any side effects if taken properly. To get the most benefits, take it as prescribed. Do not take more or for longer than needed as that can be dangerous.",
        },
        {
          title: "In Treatment of Fever",
          summary:
            "Dolo 650 Tablet is also used to reduce a high temperature (fever). It works by blocking the release of certain chemical messengers that cause fever. It may be prescribed alone or in combination with other medicines. Take it as prescribed by the doctor.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "1 tablet every 4-6 hours, not exceeding 4 tablets/day",
      quantity: 10,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer:
        "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, toothaches, sore throats, period (menstrual) pains, arthritis, muscle aches, and the common cold. Dolo 650 Tablet has been one of the most widely prescribed paracetamol-based medications during the COVID-19 pandemic. It should be taken regularly as per the doctor’s advice. Take it with food to avoid an upset stomach. It may be taken alone or in combination with other medications. However, no more than four doses of Dolo 650 Tablet can be taken in 24 hours with a gap of at least 4 hours between two doses. Please do not take it for longer than recommended.",
      photos: [
        "https://m.media-amazon.com/images/I/91bz6RZlHZL._AC_UF1000,1000_QL80_.jpg",
        "https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/Paracetamol+Dolo-650+Uses-+Side+Effects-+Composition+and+Price-1920w.jpg",
      ],
      content: {
        details:
          "Though Dolo 650 Tablet is essentially safe, it may not suit everyone. Before taking this medicine, let the doctor know if you have any liver or kidney problems, are allergic to it, or are taking other medications as this might affect the dose or suitability of the medicine. In general, take the lowest dose that works for the shortest possible time. It is also the first choice of painkillers during pregnancy or breastfeeding.",
        composition: ["Paracetamol (Acetaminophen) 650mg"],
      },
      category: "Antipyretics",
      type: "Tablet",
      sideEffects: ["Nausea", "Allergic reactions", "Skin rash"],
      usedFor: "Headaches, Muscle pain, Fever",
      rating: 4.4,
      purchasedBy: Math.floor(Math.random() * 1234 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "Zyrtec",
      code: "zyrtec",
      price: 300,
      discount: 10,
      unit: "N",
      sellingUnit: "strip",
      benefits: [
        {
          title: "In Allergy relief",
          summary:
            "Zyrtec Tablet provides relief from symptoms such as blocked or runny nose, sneezing, and itchy or watery eyes. It can also give relief from allergic reactions after insect bites and symptoms of hives and eczema such as rash, swelling, itching, and irritation. This will improve the appearance of the skin. It rarely has any serious side effects and you may only need to take it on days you have symptoms. For individuals taking it to prevent getting symptoms one should use it regularly to get the most benefit.",
        },
        {
          title: "In Treatment of Hay Fever",
          summary: "Zyrtec helps in managing hay fever symptoms. Take it as prescribed by your doctor.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "1 tablet daily",
      quantity: 10,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer:
        "Zyrtec Tablet belongs to a group of medicines called antihistamines. It is used to treat various allergic conditions such as hay fever, conjunctivitis and some skin reactions, and reactions to bites and stings. It relieves watery eyes, runny nose, sneezing, and itching. Zyrtec Tablet can be taken with or without food. The dose required for you may vary depending on what you are taking it for. This medicine is usually taken in the evening but follow the advice of your doctor on how to take it. You may need this medicine only on days you have symptoms, but if you are taking it to prevent symptoms you should take it regularly. If you miss doses or stop taking it earlier than advised, your symptoms may come back.",
      photos: [
        "https://www.netmeds.com/images/product-v1/600x600/324917/zyrtec_10mg_tablet_10s_39880_0_1.jpg",
        "https://www.netmeds.com/images/product-v1/600x600/1129770/zyrtec_10mg_tablet_15s_722807_0_0.jpg",
      ],
      content: {
        details:
          "Before taking it, tell your doctor if you have any kidney problems or epilepsy. Your dose may need to be modified or this medicine may not be suitable. Some other medicines can interact with this medicine so let your healthcare team know what else you are taking. You should also talk to your doctor before using this medicine if you are pregnant or breastfeeding, although it is not thought to be harmful.",
        composition: ["Cetirizine 10mg"],
      },
      category: "Antihistamines",
      type: "Tablet",
      sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
      usedFor: "Allergic rhinitis, Hay fever, Urticaria",
      rating: 4.5,
      purchasedBy: Math.floor(Math.random() * 1234 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "Hexizine-10",
      code: "hexizine-10",
      price: 250,
      discount: 18,
      unit: "N",
      sellingUnit: "strip",
      benefits: [
        {
          title: "In Allergy relief",
          summary:
            "Hexizine 10 Tablet is effective in treating skin conditions with inflammation and itching such as eczema, dermatitis and psoriasis. It works by reducing the actions of chemicals in the body that cause inflammation of the skin. When used correctly it is a safe and effective treatment. It reduces the redness, rash, pain or itchiness caused by your skin’s reaction to an irritant. It thus improves your self-esteem and confidence as your appearance changes.",
        },
        {
          title: "In Treatment of Anxiety",
          summary:
            "Hexizine 10 Tablet reduces the symptoms of excessive anxiety and worry that are triggered only at the time of stressful conditions that last for a shorter duration. These could be job interviews, exams, stage performances, etc. It can effectively manage feelings of restlessness, tiredness, difficulty concentrating and feeling irritable. Hexizine 10 Tablet will therefore help you go about your daily activities more easily and be more productive. Keep taking this medicine even if you feel well. Stopping suddenly can cause serious problems.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "1-2 tablets daily as prescribed by the doctor",
      quantity: 10,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer:
        "Hexizine 10 Tablet is used to treat anxiety and helps to get relaxed before or after surgery. It is also used to treat symptoms of skin allergy like itching, swelling, and rashes in conditions such as eczema, dermatitis, and psoriasis. Hexizine 10 Tablet should be taken with or without food. Take it exactly as your doctor has prescribed. The dose and how often you take it depends on what you are taking it for. Your doctor will decide how much you need to improve your symptoms.  Take it for as long as it is prescribed for you. In case, you have missed any doses, take the next dose as soon as you remember it. However, you should never take a double dose.",
      photos: [
        "https://5.imimg.com/data5/SELLER/Default/2023/2/NA/ML/DR/7810472/hydroxyzine-hcl-10-mg-tablets.jpeg",
        "https://5.imimg.com/data5/SELLER/Default/2023/9/340052450/FU/SU/TQ/187789820/hydroxyzine-tablet.jpeg",
      ],
      content: {
        details:
          "Hexizine-10 is known for its effectiveness in managing skin-related allergies and conditions. It helps reduce itching and rashes quickly. Before taking this medicine, let your doctor know if you have heart problems or have high blood pressure, have liver or kidney problems. Inform your doctor if you are pregnant, or breastfeeding. Your doctor should also know about all other medicines you are taking as many of these may make this medicine less effective or change the way it works. Generally, it is advised to avoid alcohol while on treatment.",
        composition: ["Hydroxyzine Hydrochloride 25mg"],
      },
      category: "Antihistamines",
      type: "Tablet",
      sideEffects: ["Drowsiness", "Dry mouth", "Headache"],
      usedFor: "Skin allergies, Anxiety, Stress-related skin conditions",
      rating: 4.7,
      purchasedBy: Math.floor(Math.random() * 1234 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "Cetaphil",
      code: "cetaphil",
      price: 750,
      discount: 15,
      unit: "ml",
      sellingUnit: "pack",
      benefits: [
        {
          title: "Hydrates and Nourishes",
          summary:
            "Cetaphil provides intense hydration and nourishment for all skin types, including sensitive skin.",
        },
        {
          title: "Long-lasting Moisture",
          summary: "This lotion locks in moisture to protect skin from dryness for up to 24 hours.",
        },
        {
          title: "Non-Greasy Formula",
          summary:
            "Its lightweight, non-greasy formula ensures that it is easily absorbed, leaving the skin feeling soft and smooth.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "Apply daily as needed",
      quantity: 500, // in ml
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer:
        "Cetaphil is designed to provide long-lasting hydration and nourishment. Suitable for all skin types. Cetaphil Moisturising Cream Dry to Normal, Sensitive Skin is a potent blend of emollients and humectants that can help provide intense moisture. It can aid in binding water to the skin and keep it hydrated. The cream can help manage dry and sensitive skin and protect it from arid skin conditions. It has a non-greasy texture, and its soothing composition is beneficial for nourishing your skin.",
      photos: [
        "https://m.media-amazon.com/images/I/61pipsj+PQL.jpg",
        "https://cdn01.pharmeasy.in/dam/products_otc/F28771/cetaphil-moisturizing-lotion-for-sensitive-or-dry-skin-250-ml-and-moisturising-cream-80g-combo-8-1671743744.jpg",
      ],
      content: {
        details:
          "Cetaphil is formulated with a unique combination of humectants and emollients to provide long-lasting hydration.",
        composition: ["Glycerin", "Dimethicone", "Macadamia Nut Oil", "Vitamin E", "Panthenol"],
      },
      category: "Skin Care",
      type: "Lotion",
      sideEffects: ["Rare allergic reactions", "Mild irritation"],
      usedFor: "Dry skin, Sensitive skin, Daily moisturizing",
      rating: 4.8,
      purchasedBy: Math.floor(Math.random() * 1234 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "Falcigo SP",
      code: "falcigo-sp",
      price: 450,
      discount: 20,
      unit: "N",
      sellingUnit: "bottle",
      benefits: [
        {
          title: "Treats Malaria",
          summary:
            "This medicine is effective in treating malaria caused by Plasmodium falciparum and Plasmodium vivax.",
        },
        {
          title: "Prevents Relapse",
          summary: "It helps prevent relapses of malaria caused by Plasmodium vivax strains.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "As prescribed by the doctor",
      quantity: 30,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer:
        "Falcigo-SP Kit is a prescription medicine. It is to be taken with food and take it at a fixed time regularly. Take the medicine in the dose and duration advised by your doctor. Do not consume more than the recommended dose, as this may have harmful effects on your body. A missed dose should be taken as soon as you remember. The course of the treatment should be completed for better efficacy.",
      photos: [
        "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/acsezpfw9qhvry5gk1cb.jpg",
        "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/ufzg17r7zm8shrxp76pk.jpg",
      ],
      content: {
        details:
          "This anti-malarial medication is recommended by healthcare professionals for its efficacy and safety profile.",
        composition: ["Artemether 80mg", "Lumefantrine 480mg"],
      },
      category: "Anti-Malarials",
      type: "Tablet",
      sideEffects: ["Nausea", "Vomiting", "Dizziness"],
      usedFor: "Malaria treatment and prevention",
      rating: 4.8,
      purchasedBy: Math.floor(Math.random() * 5000 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "Covaxin",
      code: "covaxin",
      price: 600,
      discount: 25,
      unit: "N",
      sellingUnit: "bottle",
      benefits: [
        {
          title: "Treats COVID-19",
          summary: "Covaxin Vaccine is used for preventing COVID-19. Moreover, getting vaccinated may also protect you from getting seriously infected, even if you get a COVID-19 infection. Vaccination helps to protect you as well as your loved ones from getting the deadly COVID-19 infection. Make sure you complete the doses of Covaxin Vaccine to get maximum benefit.",
        },
        {
          title: "Reduces Severity",
          summary: "It helps reduce the severity of symptoms and the duration of illness in COVID-19 patients.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "As prescribed by the doctor",
      quantity: 20,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer: "Prevention of SARS-CoV-2 infection is paramount to ending the Coronavirus Disease 2019 (COVID-19) pandemic. Covaxin Vaccine is amongst India’s first indigenous (local) vaccines that received emergency use authorization (conditional approval) for prevention of COVID-19 in individuals 18 years of age and older. Covaxin Vaccine has been developed by Bharat Biotech along with the Indian Council of Medical Research (ICMR) and National Institute of Virology (NIV) in Pune. The clinical trials enrolled approximately 26,175 people, making it the largest clinical trial in India.",
      photos: [
        "https://www.bharatbiotech.com/images/covaxin/bharat-biotech-covaxin-packshot.jpg",
        "https://www.bharatbiotech.com/images/Bharat-biotech-covaxin-phase3-trial01.jpg",
      ],
      content: {
        details: "Before receiving the vaccine, tell your doctor or vaccine provider about all your medical conditions. Let them also know about all the medications you are taking. It is advisable not to take the vaccine if you have any allergies, have a fever, have a bleeding disorder or are on a blood thinner, or are on a medicine that affects your immune system.",
        composition: ["Remdesivir 100mg", "Dexamethasone 8mg"],
      },
      category: "COVID-19 Treatments",
      type: "Injection",
      sideEffects: ["Nausea", "Headache", "Fatigue"],
      usedFor: "Treatment of COVID-19 infection",
      rating: 4.7,
      purchasedBy: Math.floor(Math.random() * 7000 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "CoughEx",
      code: "coughex",
      price: 250,
      discount: 15,
      unit: "N",
      sellingUnit: "bottle",
      benefits: [
        {
          title: "Relieves Cough",
          summary: "CoughEx is an effective cough suppressant that provides relief from dry and irritating cough.",
        },
        {
          title: "Soothes Throat",
          summary: "It contains ingredients that help soothe the throat and reduce throat irritation.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "1-2 teaspoons every 4-6 hours, as needed",
      quantity: 30,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer: "CoughEx should not be used for persistent or chronic cough such as asthma, smoking, or emphysema.",
      photos: [
        "https://cdn01.pharmeasy.in/dam/products/243883/coughex-syp-box-front-1-1612263958.jpg",
        "https://4.imimg.com/data4/HJ/EY/MY-27013613/m-coughex-syrup.jpg",
      ],
      content: {
        details: "CoughEx is a trusted remedy for cough and throat irritation, providing fast and effective relief.",
        composition: ["Dextromethorphan Hydrobromide 10mg", "Guaifenesin 100mg"],
      },
      category: "Cough & Cold Remedies",
      type: "Syrup",
      sideEffects: ["Drowsiness", "Nausea", "Dizziness"],
      usedFor: "Relief from dry and irritating cough, throat irritation",
      rating: 4.3,
      purchasedBy: Math.floor(Math.random() * 5000 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "ColdEase",
      code: "coldease",
      price: 180,
      discount: 10,
      unit: "N",
      sellingUnit: "pack",
      benefits: [
        {
          title: "Relieves Cold Symptoms",
          summary:
            "ColdEase helps alleviate symptoms of the common cold such as nasal congestion, runny nose, and sneezing.",
        },
        {
          title: "Reduces Fever",
          summary: "It contains ingredients that help reduce fever associated with colds and flu.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "1-2 tablets every 4-6 hours, as needed",
      quantity: 40,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer:
        "ColdEase should not be used for persistent or chronic cough, such as that occurs with smoking, asthma, or emphysema.",
      photos: ["https://rene.co.ug/wp-content/uploads/2019/01/coldease-processed-2160x2376.jpg"],
      content: {
        details:
          "ColdEase provides effective relief from the symptoms of the common cold, helping you feel better faster.",
        composition: ["Paracetamol 500mg", "Phenylephrine Hydrochloride 5mg"],
      },
      category: "Cough & Cold Remedies",
      type: "Tablet",
      sideEffects: ["Drowsiness", "Dry mouth", "Nausea"],
      usedFor: "Relief from cold symptoms, fever reduction",
      rating: 4.2,
      purchasedBy: Math.floor(Math.random() * 6000 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "GastroRelief",
      code: "gastrorelief",
      price: 150,
      discount: 10,
      unit: "N",
      sellingUnit: "pack",
      benefits: [
        {
          title: "Relieves Stomach Pain",
          summary:
            "GastroRelief provides fast and effective relief from stomach pain, including indigestion and acidity.",
        },
        {
          title: "Soothes Digestive System",
          summary: "It contains ingredients that help soothe the digestive system and reduce discomfort.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "1-2 tablets after meals, as needed",
      quantity: 20,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer: "GastroRelief should not be used for persistent or chronic stomach pain without consulting a doctor.",
      photos: [
        "https://www.bigpharmacy.com.my/site_media/img/Gastrorelief_antacid_tablets_12s_x_2_20200411165233.jpg",
        "https://cdn.shopify.com/s/files/1/1290/8299/products/GastroRelief2-500x500_41d166b7-36fa-4c37-bed9-36db158400aa.png?v=1571317234",
      ],
      content: {
        details:
          "GastroRelief is a trusted remedy for stomach pain, providing quick relief and promoting digestive health.",
        composition: ["Famotidine 20mg", "Simethicone 40mg"],
      },
      category: "Digestive Health",
      type: "Tablet",
      sideEffects: ["Dizziness", "Headache", "Nausea"],
      usedFor: "Relief from stomach pain, indigestion, acidity",
      rating: 4.4,
      purchasedBy: Math.floor(Math.random() * 4000 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "StomachEase",
      code: "stomachease",
      price: 120,
      discount: 5,
      unit: "N",
      sellingUnit: "bottle",
      benefits: [
        {
          title: "Soothes Stomach",
          summary:
            "StomachEase is a gentle and effective remedy for stomach pain and discomfort, providing quick relief.",
        },
        {
          title: "Promotes Digestion",
          summary: "It contains ingredients that help promote healthy digestion and reduce symptoms of indigestion.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "1-2 teaspoons after meals, as needed",
      quantity: 30,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer: "StomachEase should not be used for persistent or chronic stomach pain without consulting a doctor.",
      photos: [
        "https://yogiproducts.com/wp-content/webpc-passthru.php?src=https://yogiproducts.com/wp-content/uploads/2009/03/YT-US-StomachEase-CAR-C24-202475-3DFront_withGlow-300DPI-PNG.png&nocache=1",
      ],
      content: {
        details:
          "StomachEase provides gentle relief from stomach pain and discomfort, supporting overall digestive health.",
        composition: ["Peppermint Oil 0.2ml", "Dill Oil 0.1ml", "Fennel Oil 0.1ml"],
      },
      category: "Digestive Health",
      type: "Liquid",
      sideEffects: ["Nausea", "Abdominal discomfort", "Allergic reactions"],
      usedFor: "Relief from stomach pain, indigestion, gas",
      rating: 4.3,
      purchasedBy: Math.floor(Math.random() * 5000 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "Olesoft Max",
      code: "olesoft-max",
      price: 180,
      discount: 12,
      unit: "N",
      sellingUnit: "jar",
      benefits: [
        {
          title: "Promotes Skin Healing",
          summary: "Olesoft Max contains ingredients that promote skin healing and repair damaged skin.",
        },
        {
          title: "Moisturizes and Nourishes",
          summary: "It helps moisturize and nourish the skin, keeping it soft, smooth, and healthy.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "Apply a thin layer to clean, dry skin, as needed",
      quantity: 40,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer: "Olesoft Max Lotion works by providing a soothing effect. It also helps in relieving the cracked or chapped lips and skin and helps in protecting from drying effects of wind and cold weather. It also reduces the appearance of fine dry lines. Olesoft Max is for external use only. Avoid contact with eyes and mucous membranes.",
      photos: [
        "https://www.netmeds.com/images/product-v1/600x600/853735/olesoft_max_lotion_200ml_76245_0_1.jpg",
        "https://www.cureka.com/wp-content/uploads/2022/07/Layer_186-3-600x600.jpg",
      ],
      content: {
        details:
          "Olesoft Max provides intensive care for dry, damaged, or irritated skin, restoring its health and vitality.",
        composition: ["Aloe Vera Extract 10%", "Vitamin E 5%", "Jojoba Oil 3%"],
      },
      category: "Skin Care",
      type: "Ointment",
      sideEffects: ["Skin irritation", "Stinging sensation", "Allergic reactions"],
      usedFor: "Dry skin, cracked skin, minor cuts, burns",
      rating: 4.4,
      purchasedBy: Math.floor(Math.random() * 4000 + 10000),
      active: true,
      approved: true,
    },
    {
      name: "Moov",
      code: "moov-50",
      price: 200,
      discount: 15,
      unit: "N",
      sellingUnit: "tube",
      benefits: [
        {
          title: "Provides Localized Relief",
          summary: "Moov provides targeted relief from localized pain and inflammation.",
        },
        {
          title: "Soothes Muscles and Joints",
          summary: "It contains ingredients that help soothe sore muscles and joints, reducing discomfort.",
        },
      ],
      manufacturer: manufacturerList[Math.floor(Math.random() * manufacturerList.length)].id,
      dosage: "Apply a small amount to the affected area, as needed",
      quantity: 25,
      expiryDate: getRandomDate(new Date(), new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000)),
      mfdDate: getRandomDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000), new Date()),
      batchNo: generateRandomString(6).toUpperCase(),
      disclaimer: "Moov presents their range of 100% ayurvedic pain relief creams which provide instant relief to the affected area when applied. Made with a soothing blend of Turpentine Oil, Nilgiri Oil, Wintergreen Oil and Mint Extract swiftly penetrates the targeted area of pain giving you a soothing effect and instant relief. Moov Pain Relief Cream is one of India's most popular ointments for fast pain relief amongst homemakers. It is an analgesic (or pain-relieving) ointment made using 100% ayurvedic ingredients. Also available in a Spray format that allows easy application. ",
      photos: [
        "https://rukminim2.flixcart.com/image/850/1000/kz7bcsw0/body-pain-relief/e/c/k/-original-imagb9zruczazcxg.jpeg?q=20&crop=false",
        "https://assets.truemeds.in/Images/ProductImage/TM-COOM1-003154/MOOV-CREAM-15-GM_1.webp",
      ],
      content: {
        details:
          "Moov pain relief cream is made using 100% Ayurvedic ingredients that contribute to the pain-relieving process, helping you get rid of pain quickly. It contains 4 active herbal ingredients that work wonders to give your muscles relief from pain. Besides, MOOV is an excellent ointment to get rid of chronic neck aches and lower back pains.",
        composition: ["Methyl Salicylate 10%", "Menthol 5%", "Camphor 3%"],
      },
      category: "Pain Relief",
      type: "Ointment",
      sideEffects: ["Skin irritation", "Redness", "Allergic reactions"],
      usedFor: "Localized pain relief, sore muscles, joint pain",
      rating: 4.2,
      purchasedBy: Math.floor(Math.random() * 3000 + 10000),
      active: true,
      approved: true,
    },
  ];

  try {
    const response = await Commodity.deleteMany({});
    console.log(response);

    await Commodity.insertMany(medicineNames);
    console.log("Commodities inserted successfully");
  } catch (err) {
    console.error("Error inserting commodities:", err);
  }
};
// Function to generate a random code
function generateCode(name, batch) {
  const code = `${name}-${batch}`;
  return code.toLowerCase();
}

// Function to generate a random float between min and max
function getRandomFloat(min, max, dp = 2) {
  return (Math.random() * (max - min) + min).toFixed(dp);
}

// Function to generate a random date between min and max
function getRandomDate(min, max) {
  return new Date(min.getTime() + Math.random() * (max.getTime() - min.getTime()));
}

// Function to generate a random string of specified length
function generateRandomString(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
