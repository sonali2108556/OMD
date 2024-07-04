import Manufacturer from "../model/manufacturer.js";

function generateRandomId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

const indianPharmaceuticalCompanies = [
  {
    manufacturerId: generateRandomId(),
    name: "Sun Pharmaceutical Industries Ltd.",
    country: "India",
    address: {
      street: "Acme Plaza",
      city: "Andheri (East)",
      state: "Mumbai",
      postalCode: "400059",
    },
    contact: {
      email: "info@sunpharma.com",
      phone: "+91 22 4324 4324",
    },
    website: "https://www.sunpharma.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Cipla Ltd.",
    country: "India",
    address: {
      street: "Peninsula Business Park",
      city: "Lower Parel",
      state: "Mumbai",
      postalCode: "400013",
    },
    contact: {
      email: "contact@cipla.com",
      phone: "+91 22 2482 8548",
    },
    website: "https://www.cipla.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Dr. Reddy's Laboratories Ltd.",
    country: "India",
    address: {
      street: "8-2-337, Road No. 3",
      city: "Banjara Hills",
      state: "Hyderabad",
      postalCode: "500034",
    },
    contact: {
      email: "info@drreddys.com",
      phone: "+91 40 4900 2900",
    },
    website: "https://www.drreddys.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Aurobindo Pharma Ltd.",
    country: "India",
    address: {
      street: "WaterMark Building",
      city: "Road No. 36",
      state: "Jubilee Hills",
      postalCode: "Hyderabad",
    },
    contact: {
      email: "info@aurobindo.com",
      phone: "+91 40 6672 5000",
    },
    website: "https://www.aurobindo.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Lupin Limited",
    country: "India",
    address: {
      street: "Kalpataru Inspire, Off Western Express Highway",
      city: "Santacruz (East)",
      state: "Mumbai",
      postalCode: "400055",
    },
    contact: {
      email: "corpcomm@lupin.com",
      phone: "+91 22 6640 2222",
    },
    website: "https://www.lupin.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Torrent Pharmaceuticals Ltd.",
    country: "India",
    address: {
      street: "Torrent House",
      city: "Off Ashram Road",
      state: "Ahmedabad",
      postalCode: "380009",
    },
    contact: {
      email: "info@torrentpharma.com",
      phone: "+91 79 2658 6222",
    },
    website: "https://www.torrentpharma.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Cadila Healthcare Ltd.",
    country: "India",
    address: {
      street: "Cadila Corporate Campus",
      city: "Sarkhej-Dholka Road",
      state: "Ahmedabad",
      postalCode: "382210",
    },
    contact: {
      email: "info@cadilapharma.co.in",
      phone: "+91 2718 225001",
    },
    website: "https://www.zyduscadila.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Biocon Limited",
    country: "India",
    address: {
      street: "20th KM, Hosur Road",
      city: "Electronic City",
      state: "Bengaluru",
      postalCode: "560100",
    },
    contact: {
      email: "contact.us@biocon.com",
      phone: "+91 80 2808 2808",
    },
    website: "https://www.biocon.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Glenmark Pharmaceuticals Ltd.",
    country: "India",
    address: {
      street: "B/2, Mahalaxmi Chambers",
      city: "Off. Bhulabhai Desai Road",
      state: "Mumbai",
      postalCode: "400026",
    },
    contact: {
      email: "investors@glenmarkpharma.com",
      phone: "+91 22 4018 9999",
    },
    website: "https://www.glenmarkpharma.com/",
  },
  {
    manufacturerId: generateRandomId(),
    name: "Alembic Pharmaceuticals Ltd.",
    country: "India",
    address: {
      street: "Alembic Road",
      city: "Vadodara",
      state: "Gujarat",
      postalCode: "390003",
    },
    contact: {
      email: "investorrelations@alembic.co.in",
      phone: "+91 265 2280550",
    },
    website: "https://www.alembicpharmaceuticals.com/",
  },
];

export const manufacturerDataEntry = async () => {
  try {
    const response = await Manufacturer.deleteMany({});
    console.log(response);

    await Manufacturer.insertMany(indianPharmaceuticalCompanies);
    console.log("Manufacturers inserted successfully");
  } catch (err) {
    console.error("Error inserting manufacturers:", err);
  }
};
