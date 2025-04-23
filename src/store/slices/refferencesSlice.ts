import { createSlice } from "@reduxjs/toolkit";
import { IRefference } from "../../models/IRefference";


export interface RefferencesState {
  refferences: IRefference[];
}

const initialState: RefferencesState = {
  refferences: [
    {
      id: 1,
      name: "Артем960",
      date: "07.04.2025",
      income: {
        kredit: 100,
        darkMatter: 50
      }
    },
    {
      id: 2, 
      name: "Гарик2000",
      date: "07.04.2025",
      income: {
        kredit: 200,
        darkMatter: 75
      }
    },
    {
      id: 3,
      name: "JohnySilver", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 4,
      name: "NeonVortex", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 5,
      name: "RustHawk", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 6,
      name: "CyberReaper", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 7,
      name: "VoidSpecter", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 8,
      name: "GlitchRider", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 9,
      name: "PixelWarden", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 10,
      name: "ToxicNova", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 11,
      name: "IronReign", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 12,
      name: "DoomCircuit", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 13,
      name: "QuantumFang", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 14,
      name: "DarkByte", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 15,
      name: "SynthMerc", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 16,
      name: "Артем960", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 17,
      name: "Гарик2000", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 18,
      name: "JohnySilver", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 19,
      name: "NeonVortex", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 20,
      name: "RustHawk", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 21,
      name: "CyberReaper", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 22,
      name: "VoidSpecter", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 23,
      name: "GlitchRider", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 24,
      name: "PixelWarden", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 25,
      name: "ToxicNova", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 26,
      name: "IronReign", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 27,
      name: "DoomCircuit", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 28,
      name: "QuantumFang", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 29,
      name: "DarkByte", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 30,
      name: "SynthMerc", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 31,
      name: "Артем960", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 32,
      name: "Гарик2000", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
    {
      id: 33,
      name: "JohnySilver", 
      date: "07.04.2025",
      income: {
        kredit: 300,
        darkMatter: 100
      }
    },
  ],
};

export const refferencesSlice = createSlice({
  name: "refferencesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {  } = refferencesSlice.actions;

export default refferencesSlice.reducer;
