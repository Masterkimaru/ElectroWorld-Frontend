export interface RepairPrice {
  screenRepair?: number;
  batteryReplacement?: number;
  backGlassRepair?: number;
  softwareRepair?: number;
  keyboardRepair?: number;
  motherboardRepair?: number;
  speakerRepair?: number;
  cameraRepair?: number;
}

export interface DeviceModel {
  model: string;
  prices: RepairPrice;
}

export interface DeviceBrand {
  brand: string;
  models: DeviceModel[];
}

export const repairPricesData: Record<string, DeviceBrand[]> = {
  phone: [
    {
      brand: "Apple",
      models: [
        { model: "iPhone 6/6s", prices: { screenRepair: 3000, batteryReplacement: 2000, backGlassRepair: 2500, softwareRepair: 1500 }},
        { model: "iPhone 6 Plus/6s Plus", prices: { screenRepair: 3500, batteryReplacement: 2500, backGlassRepair: 2500, softwareRepair: 1500 }},
        { model: "iPhone 7", prices: { screenRepair: 3000, batteryReplacement: 2000, backGlassRepair: 3500, softwareRepair: 1500 }},
        { model: "iPhone 7 Plus", prices: { screenRepair: 3500, batteryReplacement: 2500, backGlassRepair: 3500, softwareRepair: 1500 }},
        { model: "iPhone 8", prices: { screenRepair: 3500, batteryReplacement: 2000, backGlassRepair: 3500, softwareRepair: 2000 }},
        { model: "iPhone 8 Plus", prices: { screenRepair: 4000, batteryReplacement: 2500, backGlassRepair: 4000, softwareRepair: 2000 }},
        { model: "iPhone X", prices: { screenRepair: 5800, batteryReplacement: 3500, backGlassRepair: 4000, softwareRepair: 2500 }},
        { model: "iPhone XS", prices: { screenRepair: 6000, batteryReplacement: 3600, backGlassRepair: 4000, softwareRepair: 2500 }},
        { model: "iPhone XR", prices: { screenRepair: 5000, batteryReplacement: 3500, backGlassRepair: 4500, softwareRepair: 2500 }},
        { model: "iPhone XS Max", prices: { screenRepair: 7000, batteryReplacement: 4000, backGlassRepair: 3000, softwareRepair: 3000 }},
        { model: "iPhone 11", prices: { screenRepair: 5500, batteryReplacement: 4000, backGlassRepair: 4500, softwareRepair: 3000 }},
        { model: "iPhone 11 Pro", prices: { screenRepair: 8000, batteryReplacement: 4500, backGlassRepair: 4500, softwareRepair: 3500 }},
        { model: "iPhone 11 Pro Max", prices: { screenRepair: 9000, batteryReplacement: 5000, backGlassRepair: 5000, softwareRepair: 3500 }},
        { model: "iPhone 12 Mini", prices: { screenRepair: 10000, batteryReplacement: 3500, backGlassRepair: 5000, softwareRepair: 4000 }},
        { model: "iPhone 12", prices: { screenRepair: 10000, batteryReplacement: 5000, backGlassRepair: 5500, softwareRepair: 4000 }},
        { model: "iPhone 12 Pro", prices: { screenRepair: 11000, batteryReplacement: 5000, backGlassRepair: 6000, softwareRepair: 4500 }},
        { model: "iPhone 12 Pro Max", prices: { screenRepair: 14000, batteryReplacement: 6500, backGlassRepair: 6000, softwareRepair: 4500 }},
        { model: "iPhone 13", prices: { screenRepair: 15000, batteryReplacement: 6500, backGlassRepair: 6500, softwareRepair: 5000 }},
        { model: "iPhone 13 Pro", prices: { screenRepair: 20000, batteryReplacement: 7000, backGlassRepair: 7000, softwareRepair: 5000 }},
        { model: "iPhone 13 Pro Max", prices: { screenRepair: 23000, batteryReplacement: 8000, backGlassRepair: 7000, softwareRepair: 5500 }},
        { model: "iPhone 14", prices: { screenRepair: 15000, batteryReplacement: 7000, backGlassRepair: 8000, softwareRepair: 5500 }},
        { model: "iPhone 14 Pro", prices: { screenRepair: 25000, batteryReplacement: 7500, backGlassRepair: 9000, softwareRepair: 6000 }},
        { model: "iPhone 14 Pro Max", prices: { screenRepair: 30000, batteryReplacement: 9000, backGlassRepair: 9000, softwareRepair: 6000 }},
        { model: "iPhone 15", prices: { screenRepair: 26000, batteryReplacement: 7500, backGlassRepair: 9000, softwareRepair: 6500 }},
        { model: "iPhone 15 Pro", prices: { screenRepair: 32000, batteryReplacement: 8000, backGlassRepair: 9000, softwareRepair: 6500 }},
        { model: "iPhone 15 Pro Max", prices: { screenRepair: 40000, batteryReplacement: 9000, backGlassRepair: 9000, softwareRepair: 7000 }},
      ]
    },
    {
      brand: "Samsung",
      models: [
        { model: "Galaxy S24 Ultra", prices: { screenRepair: 45000, batteryReplacement: 7000, backGlassRepair: 4000, softwareRepair: 3000 }},
        { model: "Galaxy S24 Plus", prices: { screenRepair: 40000, batteryReplacement: 7000, backGlassRepair: 3500, softwareRepair: 3000 }},
        { model: "Galaxy S24", prices: { screenRepair: 30000, batteryReplacement: 6500, backGlassRepair: 3500, softwareRepair: 2500 }},
        { model: "Galaxy S23 Ultra", prices: { screenRepair: 40000, batteryReplacement: 5500, backGlassRepair: 4000, softwareRepair: 2500 }},
        { model: "Galaxy S23 Plus", prices: { screenRepair: 35000, batteryReplacement: 5500, backGlassRepair: 3500, softwareRepair: 2500 }},
        { model: "Galaxy S23", prices: { screenRepair: 25000, batteryReplacement: 5000, backGlassRepair: 3000, softwareRepair: 2000 }},
        { model: "Galaxy S22 Ultra", prices: { screenRepair: 35000, batteryReplacement: 4000, backGlassRepair: 3000, softwareRepair: 2000 }},
        { model: "Galaxy S22 Plus", prices: { screenRepair: 30000, batteryReplacement: 4000, backGlassRepair: 3500, softwareRepair: 2000 }},
        { model: "Galaxy S22", prices: { screenRepair: 25000, batteryReplacement: 3500, backGlassRepair: 3500, softwareRepair: 1800 }},
        { model: "Galaxy S21 Ultra", prices: { screenRepair: 30000, batteryReplacement: 4000, backGlassRepair: 3000, softwareRepair: 1800 }},
        { model: "Galaxy S21 Plus", prices: { screenRepair: 25000, batteryReplacement: 4000, backGlassRepair: 3000, softwareRepair: 1500 }},
        { model: "Galaxy S21", prices: { screenRepair: 22000, batteryReplacement: 3500, backGlassRepair: 4000, softwareRepair: 1500 }},
        { model: "Galaxy S21 FE", prices: { screenRepair: 15000, batteryReplacement: 3000, backGlassRepair: 3500, softwareRepair: 1500 }},
        { model: "Galaxy Note 20 Ultra", prices: { screenRepair: 30000, batteryReplacement: 4000, backGlassRepair: 4000, softwareRepair: 2000 }},
        { model: "Galaxy Note 20", prices: { screenRepair: 23000, batteryReplacement: 3500, backGlassRepair: 3500, softwareRepair: 2000 }},
        { model: "Galaxy A54", prices: { screenRepair: 13000, batteryReplacement: 3000, backGlassRepair: 1800, softwareRepair: 1200 }},
        { model: "Galaxy A34", prices: { screenRepair: 12000, batteryReplacement: 2500, backGlassRepair: 1700, softwareRepair: 1200 }},
        { model: "Galaxy A24", prices: { screenRepair: 10000, batteryReplacement: 3000, backGlassRepair: 1800, softwareRepair: 1000 }},
      ]
    }
  ],
  laptop: [
    {
      brand: "Apple",
      models: [
        { model: "MacBook Air M1", prices: { screenRepair: 25000, batteryReplacement: 15000, keyboardRepair: 12000, motherboardRepair: 45000, softwareRepair: 5000 }},
        { model: "MacBook Air M2", prices: { screenRepair: 30000, batteryReplacement: 18000, keyboardRepair: 15000, motherboardRepair: 50000, softwareRepair: 5000 }},
        { model: "MacBook Pro 13\"", prices: { screenRepair: 28000, batteryReplacement: 16000, keyboardRepair: 14000, motherboardRepair: 48000, softwareRepair: 5500 }},
        { model: "MacBook Pro 14\"", prices: { screenRepair: 35000, batteryReplacement: 20000, keyboardRepair: 16000, motherboardRepair: 55000, softwareRepair: 6000 }},
        { model: "MacBook Pro 16\"", prices: { screenRepair: 45000, batteryReplacement: 25000, keyboardRepair: 18000, motherboardRepair: 65000, softwareRepair: 6000 }},
        { model: "iMac 21.5\"", prices: { screenRepair: 20000, motherboardRepair: 40000, speakerRepair: 8000, softwareRepair: 4000 }},
        { model: "iMac 27\"", prices: { screenRepair: 30000, motherboardRepair: 50000, speakerRepair: 10000, softwareRepair: 4500 }},
      ]
    },
    {
      brand: "Dell",
      models: [
        { model: "XPS 13", prices: { screenRepair: 18000, batteryReplacement: 12000, keyboardRepair: 8000, motherboardRepair: 35000, softwareRepair: 3000 }},
        { model: "XPS 15", prices: { screenRepair: 22000, batteryReplacement: 15000, keyboardRepair: 10000, motherboardRepair: 40000, softwareRepair: 3500 }},
        { model: "Inspiron 15", prices: { screenRepair: 15000, batteryReplacement: 10000, keyboardRepair: 6000, motherboardRepair: 25000, softwareRepair: 2500 }},
        { model: "Latitude 14", prices: { screenRepair: 16000, batteryReplacement: 11000, keyboardRepair: 7000, motherboardRepair: 28000, softwareRepair: 3000 }},
        { model: "Alienware m15", prices: { screenRepair: 25000, batteryReplacement: 18000, keyboardRepair: 12000, motherboardRepair: 45000, softwareRepair: 4000 }},
      ]
    },
    {
      brand: "HP",
      models: [
        { model: "Pavilion 15", prices: { screenRepair: 14000, batteryReplacement: 9000, keyboardRepair: 5500, motherboardRepair: 22000, softwareRepair: 2500 }},
        { model: "Envy 13", prices: { screenRepair: 16000, batteryReplacement: 11000, keyboardRepair: 7000, motherboardRepair: 26000, softwareRepair: 3000 }},
        { model: "EliteBook 14", prices: { screenRepair: 18000, batteryReplacement: 12000, keyboardRepair: 8000, motherboardRepair: 30000, softwareRepair: 3500 }},
        { model: "Spectre x360", prices: { screenRepair: 20000, batteryReplacement: 14000, keyboardRepair: 9000, motherboardRepair: 35000, softwareRepair: 3500 }},
        { model: "Omen 15", prices: { screenRepair: 19000, batteryReplacement: 13000, keyboardRepair: 8500, motherboardRepair: 32000, softwareRepair: 3000 }},
      ]
    },
    {
      brand: "Lenovo",
      models: [
        { model: "ThinkPad X1 Carbon", prices: { screenRepair: 20000, batteryReplacement: 13000, keyboardRepair: 8500, motherboardRepair: 35000, softwareRepair: 3500 }},
        { model: "ThinkPad T14", prices: { screenRepair: 17000, batteryReplacement: 11000, keyboardRepair: 7500, motherboardRepair: 28000, softwareRepair: 3000 }},
        { model: "IdeaPad 3", prices: { screenRepair: 12000, batteryReplacement: 8000, keyboardRepair: 5000, motherboardRepair: 18000, softwareRepair: 2000 }},
        { model: "Legion 5", prices: { screenRepair: 18000, batteryReplacement: 12000, keyboardRepair: 8000, motherboardRepair: 30000, softwareRepair: 3000 }},
        { model: "Yoga 7i", prices: { screenRepair: 19000, batteryReplacement: 12500, keyboardRepair: 8500, motherboardRepair: 32000, softwareRepair: 3500 }},
      ]
    }
  ],
  tablet: [
    {
      brand: "Apple",
      models: [
        { model: "iPad (9th Gen)", prices: { screenRepair: 12000, batteryReplacement: 8000, backGlassRepair: 6000, softwareRepair: 3000 }},
        { model: "iPad (10th Gen)", prices: { screenRepair: 15000, batteryReplacement: 9000, backGlassRepair: 7000, softwareRepair: 3500 }},
        { model: "iPad Air (4th Gen)", prices: { screenRepair: 18000, batteryReplacement: 11000, backGlassRepair: 8000, softwareRepair: 4000 }},
        { model: "iPad Air (5th Gen)", prices: { screenRepair: 20000, batteryReplacement: 12000, backGlassRepair: 9000, softwareRepair: 4000 }},
        { model: "iPad Pro 11\" (3rd Gen)", prices: { screenRepair: 25000, batteryReplacement: 15000, backGlassRepair: 10000, softwareRepair: 5000 }},
        { model: "iPad Pro 11\" (4th Gen)", prices: { screenRepair: 28000, batteryReplacement: 16000, backGlassRepair: 11000, softwareRepair: 5000 }},
        { model: "iPad Pro 12.9\" (5th Gen)", prices: { screenRepair: 35000, batteryReplacement: 20000, backGlassRepair: 12000, softwareRepair: 6000 }},
        { model: "iPad Pro 12.9\" (6th Gen)", prices: { screenRepair: 40000, batteryReplacement: 22000, backGlassRepair: 14000, softwareRepair: 6000 }},
        { model: "iPad Mini (6th Gen)", prices: { screenRepair: 16000, batteryReplacement: 10000, backGlassRepair: 7500, softwareRepair: 3500 }},
      ]
    },
    {
      brand: "Samsung",
      models: [
        { model: "Galaxy Tab A8", prices: { screenRepair: 8000, batteryReplacement: 6000, backGlassRepair: 4000, softwareRepair: 2000 }},
        { model: "Galaxy Tab A9+", prices: { screenRepair: 10000, batteryReplacement: 7000, backGlassRepair: 4500, softwareRepair: 2500 }},
        { model: "Galaxy Tab S6 Lite", prices: { screenRepair: 12000, batteryReplacement: 8000, backGlassRepair: 5000, softwareRepair: 2500 }},
        { model: "Galaxy Tab S7", prices: { screenRepair: 15000, batteryReplacement: 9000, backGlassRepair: 6000, softwareRepair: 3000 }},
        { model: "Galaxy Tab S8", prices: { screenRepair: 18000, batteryReplacement: 11000, backGlassRepair: 7000, softwareRepair: 3500 }},
        { model: "Galaxy Tab S8+", prices: { screenRepair: 22000, batteryReplacement: 13000, backGlassRepair: 8000, softwareRepair: 4000 }},
        { model: "Galaxy Tab S8 Ultra", prices: { screenRepair: 28000, batteryReplacement: 16000, backGlassRepair: 10000, softwareRepair: 4500 }},
        { model: "Galaxy Tab S9", prices: { screenRepair: 20000, batteryReplacement: 12000, backGlassRepair: 7500, softwareRepair: 3500 }},
        { model: "Galaxy Tab S9+", prices: { screenRepair: 25000, batteryReplacement: 14000, backGlassRepair: 9000, softwareRepair: 4000 }},
        { model: "Galaxy Tab S9 Ultra", prices: { screenRepair: 32000, batteryReplacement: 18000, backGlassRepair: 11000, softwareRepair: 5000 }},
      ]
    },
    {
      brand: "Microsoft",
      models: [
        { model: "Surface Go 3", prices: { screenRepair: 14000, batteryReplacement: 9000, keyboardRepair: 6000, softwareRepair: 3000 }},
        { model: "Surface Pro 8", prices: { screenRepair: 20000, batteryReplacement: 12000, keyboardRepair: 8000, softwareRepair: 4000 }},
        { model: "Surface Pro 9", prices: { screenRepair: 22000, batteryReplacement: 13000, keyboardRepair: 8500, softwareRepair: 4500 }},
        { model: "Surface Laptop 4", prices: { screenRepair: 18000, batteryReplacement: 11000, keyboardRepair: 7500, softwareRepair: 3500 }},
        { model: "Surface Laptop 5", prices: { screenRepair: 20000, batteryReplacement: 12000, keyboardRepair: 8000, softwareRepair: 4000 }},
      ]
    }
  ]
};

export function getRepairTypes(deviceType: string): string[] {
  const commonRepairs = ['softwareRepair'];
  
  switch (deviceType) {
    case 'phone':
      return [...commonRepairs, 'screenRepair', 'batteryReplacement', 'backGlassRepair', 'cameraRepair', 'speakerRepair'];
    case 'laptop':
      return [...commonRepairs, 'screenRepair', 'batteryReplacement', 'keyboardRepair', 'motherboardRepair', 'speakerRepair'];
    case 'tablet':
      return [...commonRepairs, 'screenRepair', 'batteryReplacement', 'backGlassRepair', 'cameraRepair', 'speakerRepair'];
    default:
      return commonRepairs;
  }
}

export function getRepairTypeLabel(repairType: string): string {
  const labels: Record<string, string> = {
    screenRepair: 'Screen Repair',
    batteryReplacement: 'Battery Replacement',
    backGlassRepair: 'Back Glass Repair',
    softwareRepair: 'Software Issues',
    keyboardRepair: 'Keyboard Repair',
    motherboardRepair: 'Motherboard Repair',
    speakerRepair: 'Speaker Repair',
    cameraRepair: 'Camera Repair',
  };
  return labels[repairType] || repairType;
}
