'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Package,
  Truck,
  Calculator,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RotateCcw,
  MapPin,
  Scale,
  Ruler,
  Clock,
  Shield,
  Plane,
  DollarSign,
  ArrowRight,
  Info,
  CheckCircle
} from 'lucide-react';
import ExploreMoreTools from '@/components/ExploreMoreTools';
import PostResultUpsell from '@/components/PostResultUpsell';

interface ShippingResult {
  billableWeight: number;
  actualWeight: number;
  dimWeight: number;
  method: string;
  methodLabel: string;
  baseRate: number;
  zoneFactor: number;
  zone: number;
  insuranceCost: number;
  totalCost: number;
  estimatedDays: string;
}

const SHIPPING_METHODS = {
  ground: { label: 'UPS Ground', rate: 0.85, days: '5-7 business days' },
  '3day': { label: 'UPS 3 Day Select', rate: 1.10, days: '3 business days' },
  '2day': { label: 'UPS 2nd Day Air', rate: 1.50, days: '2 business days' },
  nextday: { label: 'UPS Next Day Air', rate: 2.85, days: '1 business day' },
};

const DIM_FACTOR = 139;

const faqs = [
  {
    q: "How accurate is this UPS shipping cost estimator?",
    a: "This tool provides a reasonable estimate based on standard UPS pricing rules including dimensional weight, zone-based pricing, and service levels. Actual UPS rates may vary based on your account discounts, fuel surcharges, and other factors. Use this to estimate UPS shipping cost before getting a final quote."
  },
  {
    q: "What is dimensional weight and how does UPS calculate it?",
    a: "Dimensional weight (DIM weight) is calculated by multiplying Length × Width × Height and dividing by 139. UPS charges based on whichever is higher: actual weight or dimensional weight. This prevents carriers from losing money on large, lightweight packages."
  },
  {
    q: "How do UPS shipping zones affect the cost?",
    a: "UPS divides the US into 8 zones based on distance from the origin. Zone 2 is local (same region), while Zone 8 is coast-to-coast. Each zone increase adds approximately 10-15% to the base shipping cost. That's why it costs more to ship from New York to California than New York to New Jersey."
  },
  {
    q: "What's the cheapest UPS shipping option?",
    a: "UPS Ground is typically the most affordable option for non-urgent shipments, with delivery in 5-7 business days. For faster delivery, UPS 3 Day Select offers a balance between speed and cost. Use this calculator to estimate UPS shipping cost for each service level."
  },
  {
    q: "Does UPS charge extra for insurance?",
    a: "Yes, UPS offers declared value coverage at approximately 1% of the declared value (with a minimum charge). This protects your package if it's lost or damaged. For valuable items, adding insurance is highly recommended."
  },
  {
    q: "What's the maximum weight and size UPS accepts?",
    a: "UPS accepts packages up to 150 lbs and 165 inches in combined length and girth (length + 2×width + 2×height). Individual dimensions cannot exceed 108 inches. Packages exceeding these limits require UPS Freight services."
  }
];

const ZIP_REGIONS: { [prefix: string]: { region: number; lat: number; lon: number } } = {
  '006': { region: 1, lat: 18.4, lon: -66.1 }, '007': { region: 1, lat: 18.4, lon: -66.1 }, '008': { region: 1, lat: 18.4, lon: -66.1 }, '009': { region: 1, lat: 18.4, lon: -66.1 },
  '010': { region: 2, lat: 42.1, lon: -72.6 }, '011': { region: 2, lat: 42.1, lon: -72.6 }, '012': { region: 2, lat: 42.1, lon: -72.6 }, '013': { region: 2, lat: 42.1, lon: -72.6 },
  '014': { region: 2, lat: 42.3, lon: -71.8 }, '015': { region: 2, lat: 42.3, lon: -71.8 }, '016': { region: 2, lat: 42.3, lon: -71.8 }, '017': { region: 2, lat: 42.3, lon: -71.8 },
  '018': { region: 2, lat: 42.4, lon: -71.1 }, '019': { region: 2, lat: 42.4, lon: -71.1 }, '020': { region: 2, lat: 42.4, lon: -71.1 }, '021': { region: 2, lat: 42.4, lon: -71.1 },
  '022': { region: 2, lat: 42.4, lon: -71.1 }, '023': { region: 2, lat: 41.8, lon: -71.4 }, '024': { region: 2, lat: 42.4, lon: -71.1 }, '025': { region: 2, lat: 41.7, lon: -70.3 },
  '026': { region: 2, lat: 41.5, lon: -71.3 }, '027': { region: 2, lat: 41.8, lon: -71.4 }, '028': { region: 2, lat: 41.8, lon: -71.4 }, '029': { region: 2, lat: 41.8, lon: -71.4 },
  '030': { region: 2, lat: 43.0, lon: -71.5 }, '031': { region: 2, lat: 43.0, lon: -71.5 }, '032': { region: 2, lat: 43.0, lon: -71.5 }, '033': { region: 2, lat: 43.2, lon: -71.5 },
  '034': { region: 2, lat: 43.2, lon: -71.5 }, '035': { region: 2, lat: 44.5, lon: -71.2 }, '036': { region: 2, lat: 44.5, lon: -71.2 }, '037': { region: 2, lat: 43.0, lon: -71.5 },
  '038': { region: 2, lat: 43.0, lon: -71.5 }, '039': { region: 2, lat: 44.8, lon: -68.8 }, '040': { region: 2, lat: 43.7, lon: -70.3 }, '041': { region: 2, lat: 43.7, lon: -70.3 },
  '042': { region: 2, lat: 43.7, lon: -70.3 }, '043': { region: 2, lat: 44.3, lon: -69.8 }, '044': { region: 2, lat: 44.8, lon: -68.8 }, '045': { region: 2, lat: 43.7, lon: -70.3 },
  '046': { region: 2, lat: 44.8, lon: -68.8 }, '047': { region: 2, lat: 44.8, lon: -68.8 }, '048': { region: 2, lat: 43.7, lon: -70.3 }, '049': { region: 2, lat: 44.5, lon: -67.6 },
  '050': { region: 2, lat: 44.5, lon: -73.2 }, '051': { region: 2, lat: 44.5, lon: -73.2 }, '052': { region: 2, lat: 44.5, lon: -73.2 }, '053': { region: 2, lat: 44.5, lon: -73.2 },
  '054': { region: 2, lat: 44.5, lon: -73.2 }, '055': { region: 3, lat: 44.9, lon: -93.3 }, '056': { region: 3, lat: 44.9, lon: -93.3 }, '057': { region: 2, lat: 44.5, lon: -73.2 },
  '058': { region: 3, lat: 46.9, lon: -96.8 }, '059': { region: 3, lat: 47.9, lon: -97.0 }, '060': { region: 2, lat: 41.8, lon: -72.7 }, '061': { region: 2, lat: 41.8, lon: -72.7 },
  '062': { region: 2, lat: 41.8, lon: -72.7 }, '063': { region: 2, lat: 41.3, lon: -73.1 }, '064': { region: 2, lat: 41.3, lon: -73.1 }, '065': { region: 2, lat: 41.2, lon: -73.2 },
  '066': { region: 2, lat: 41.1, lon: -73.4 }, '067': { region: 2, lat: 41.8, lon: -72.7 }, '068': { region: 2, lat: 41.2, lon: -73.2 }, '069': { region: 2, lat: 41.3, lon: -73.1 },
  '070': { region: 2, lat: 40.7, lon: -74.2 }, '071': { region: 2, lat: 40.7, lon: -74.2 }, '072': { region: 2, lat: 40.7, lon: -74.2 }, '073': { region: 2, lat: 40.7, lon: -74.2 },
  '074': { region: 2, lat: 40.9, lon: -74.2 }, '075': { region: 2, lat: 40.9, lon: -74.2 }, '076': { region: 2, lat: 40.9, lon: -74.2 }, '077': { region: 2, lat: 40.2, lon: -74.0 },
  '078': { region: 2, lat: 40.7, lon: -74.2 }, '079': { region: 2, lat: 40.2, lon: -74.8 }, '080': { region: 2, lat: 39.9, lon: -75.0 }, '081': { region: 2, lat: 39.9, lon: -75.0 },
  '082': { region: 2, lat: 39.4, lon: -74.5 }, '083': { region: 2, lat: 39.4, lon: -74.5 }, '084': { region: 2, lat: 39.4, lon: -74.5 }, '085': { region: 2, lat: 40.2, lon: -74.8 },
  '086': { region: 2, lat: 40.2, lon: -74.8 }, '087': { region: 2, lat: 40.2, lon: -74.8 }, '088': { region: 2, lat: 40.5, lon: -74.4 }, '089': { region: 2, lat: 40.5, lon: -74.4 },
  '100': { region: 2, lat: 40.7, lon: -74.0 }, '101': { region: 2, lat: 40.7, lon: -74.0 }, '102': { region: 2, lat: 40.7, lon: -74.0 }, '103': { region: 2, lat: 40.6, lon: -74.0 },
  '104': { region: 2, lat: 40.8, lon: -73.9 }, '105': { region: 2, lat: 40.9, lon: -73.8 }, '106': { region: 2, lat: 41.0, lon: -73.8 }, '107': { region: 2, lat: 41.0, lon: -73.9 },
  '108': { region: 2, lat: 41.0, lon: -73.7 }, '109': { region: 2, lat: 41.3, lon: -73.9 }, '110': { region: 2, lat: 40.7, lon: -73.5 }, '111': { region: 2, lat: 40.7, lon: -73.5 },
  '112': { region: 2, lat: 40.7, lon: -73.9 }, '113': { region: 2, lat: 40.7, lon: -73.9 }, '114': { region: 2, lat: 40.7, lon: -73.9 }, '115': { region: 2, lat: 40.8, lon: -73.5 },
  '116': { region: 2, lat: 40.8, lon: -73.5 }, '117': { region: 2, lat: 40.8, lon: -73.3 }, '118': { region: 2, lat: 40.9, lon: -73.1 }, '119': { region: 2, lat: 40.9, lon: -72.7 },
  '120': { region: 2, lat: 42.7, lon: -73.7 }, '121': { region: 2, lat: 42.7, lon: -73.7 }, '122': { region: 2, lat: 42.7, lon: -73.7 }, '123': { region: 2, lat: 42.8, lon: -73.9 },
  '124': { region: 2, lat: 41.7, lon: -73.9 }, '125': { region: 2, lat: 41.5, lon: -74.0 }, '126': { region: 2, lat: 41.9, lon: -74.0 }, '127': { region: 2, lat: 41.5, lon: -74.0 },
  '128': { region: 2, lat: 44.7, lon: -73.5 }, '129': { region: 2, lat: 44.7, lon: -73.5 }, '130': { region: 2, lat: 43.0, lon: -76.1 }, '131': { region: 2, lat: 43.0, lon: -76.1 },
  '132': { region: 2, lat: 43.0, lon: -76.1 }, '133': { region: 2, lat: 43.1, lon: -75.2 }, '134': { region: 2, lat: 43.1, lon: -75.2 }, '135': { region: 2, lat: 43.1, lon: -75.2 },
  '136': { region: 2, lat: 44.0, lon: -75.9 }, '137': { region: 2, lat: 42.1, lon: -76.0 }, '138': { region: 2, lat: 42.1, lon: -76.0 }, '139': { region: 2, lat: 42.1, lon: -76.0 },
  '140': { region: 2, lat: 43.0, lon: -78.9 }, '141': { region: 2, lat: 43.0, lon: -78.9 }, '142': { region: 2, lat: 43.0, lon: -78.9 }, '143': { region: 2, lat: 43.0, lon: -78.9 },
  '144': { region: 2, lat: 43.2, lon: -77.6 }, '145': { region: 2, lat: 43.2, lon: -77.6 }, '146': { region: 2, lat: 43.2, lon: -77.6 }, '147': { region: 2, lat: 42.1, lon: -79.2 },
  '148': { region: 2, lat: 42.9, lon: -78.9 }, '149': { region: 2, lat: 42.1, lon: -76.8 }, '150': { region: 2, lat: 40.4, lon: -80.0 }, '151': { region: 2, lat: 40.4, lon: -80.0 },
  '152': { region: 2, lat: 40.4, lon: -80.0 }, '153': { region: 2, lat: 40.4, lon: -80.0 }, '154': { region: 2, lat: 40.4, lon: -80.0 }, '155': { region: 2, lat: 40.3, lon: -78.9 },
  '156': { region: 2, lat: 40.5, lon: -79.9 }, '157': { region: 2, lat: 40.3, lon: -78.9 }, '158': { region: 2, lat: 40.3, lon: -78.9 }, '159': { region: 2, lat: 40.3, lon: -78.9 },
  '160': { region: 2, lat: 41.4, lon: -79.7 }, '161': { region: 2, lat: 41.4, lon: -79.7 }, '162': { region: 2, lat: 41.4, lon: -79.7 }, '163': { region: 2, lat: 41.9, lon: -80.1 },
  '164': { region: 2, lat: 41.9, lon: -80.1 }, '165': { region: 2, lat: 41.9, lon: -80.1 }, '166': { region: 2, lat: 40.5, lon: -78.4 }, '167': { region: 2, lat: 41.2, lon: -77.0 },
  '168': { region: 2, lat: 40.5, lon: -78.4 }, '169': { region: 2, lat: 41.0, lon: -76.5 }, '170': { region: 2, lat: 40.3, lon: -76.9 }, '171': { region: 2, lat: 40.3, lon: -76.9 },
  '172': { region: 2, lat: 40.3, lon: -76.9 }, '173': { region: 2, lat: 40.0, lon: -76.3 }, '174': { region: 2, lat: 40.0, lon: -76.9 }, '175': { region: 2, lat: 40.0, lon: -76.3 },
  '176': { region: 2, lat: 40.0, lon: -76.3 }, '177': { region: 2, lat: 41.2, lon: -77.0 }, '178': { region: 2, lat: 40.6, lon: -75.5 }, '179': { region: 2, lat: 40.6, lon: -75.5 },
  '180': { region: 2, lat: 41.2, lon: -75.9 }, '181': { region: 2, lat: 40.6, lon: -75.5 }, '182': { region: 2, lat: 41.4, lon: -75.7 }, '183': { region: 2, lat: 41.4, lon: -75.7 },
  '184': { region: 2, lat: 41.4, lon: -75.7 }, '185': { region: 2, lat: 41.4, lon: -75.7 }, '186': { region: 2, lat: 41.2, lon: -75.9 }, '187': { region: 2, lat: 41.2, lon: -75.9 },
  '188': { region: 2, lat: 41.4, lon: -75.7 }, '189': { region: 2, lat: 41.0, lon: -75.2 }, '190': { region: 2, lat: 40.0, lon: -75.1 }, '191': { region: 2, lat: 40.0, lon: -75.1 },
  '192': { region: 2, lat: 40.0, lon: -75.1 }, '193': { region: 2, lat: 40.0, lon: -75.1 }, '194': { region: 2, lat: 40.1, lon: -75.3 }, '195': { region: 2, lat: 40.3, lon: -75.9 },
  '196': { region: 2, lat: 40.0, lon: -75.5 }, '197': { region: 2, lat: 39.7, lon: -75.5 }, '198': { region: 2, lat: 39.7, lon: -75.5 }, '199': { region: 2, lat: 39.7, lon: -75.5 },
  '200': { region: 2, lat: 38.9, lon: -77.0 }, '201': { region: 2, lat: 38.9, lon: -77.0 }, '202': { region: 2, lat: 38.9, lon: -77.0 }, '203': { region: 2, lat: 38.9, lon: -77.0 },
  '204': { region: 2, lat: 38.9, lon: -77.0 }, '205': { region: 2, lat: 38.9, lon: -77.0 }, '206': { region: 2, lat: 38.8, lon: -77.0 }, '207': { region: 2, lat: 38.8, lon: -77.1 },
  '208': { region: 2, lat: 38.8, lon: -77.1 }, '209': { region: 2, lat: 39.1, lon: -77.2 }, '210': { region: 2, lat: 39.3, lon: -76.6 }, '211': { region: 2, lat: 39.3, lon: -76.6 },
  '212': { region: 2, lat: 39.3, lon: -76.6 }, '214': { region: 2, lat: 39.0, lon: -76.5 }, '215': { region: 2, lat: 39.5, lon: -76.2 }, '216': { region: 2, lat: 39.5, lon: -76.2 },
  '217': { region: 2, lat: 39.6, lon: -77.4 }, '218': { region: 2, lat: 39.6, lon: -77.4 }, '219': { region: 2, lat: 39.4, lon: -79.4 }, '220': { region: 2, lat: 38.8, lon: -77.1 },
  '221': { region: 2, lat: 38.8, lon: -77.1 }, '222': { region: 2, lat: 38.8, lon: -77.1 }, '223': { region: 2, lat: 38.5, lon: -77.3 }, '224': { region: 2, lat: 38.0, lon: -78.5 },
  '225': { region: 2, lat: 38.5, lon: -77.3 }, '226': { region: 2, lat: 39.2, lon: -78.2 }, '227': { region: 2, lat: 38.4, lon: -78.9 }, '228': { region: 2, lat: 38.0, lon: -78.5 },
  '229': { region: 2, lat: 38.0, lon: -78.5 }, '230': { region: 2, lat: 37.5, lon: -77.4 }, '231': { region: 2, lat: 37.5, lon: -77.4 }, '232': { region: 2, lat: 37.5, lon: -77.4 },
  '233': { region: 2, lat: 36.8, lon: -76.3 }, '234': { region: 2, lat: 36.8, lon: -76.3 }, '235': { region: 2, lat: 36.8, lon: -76.3 }, '236': { region: 2, lat: 36.8, lon: -76.3 },
  '237': { region: 2, lat: 37.0, lon: -76.5 }, '238': { region: 2, lat: 37.5, lon: -77.4 }, '239': { region: 2, lat: 37.5, lon: -77.4 }, '240': { region: 2, lat: 37.3, lon: -79.9 },
  '241': { region: 2, lat: 37.3, lon: -79.9 }, '242': { region: 2, lat: 36.6, lon: -82.2 }, '243': { region: 2, lat: 37.3, lon: -80.1 }, '244': { region: 2, lat: 38.4, lon: -78.9 },
  '245': { region: 2, lat: 37.4, lon: -79.1 }, '246': { region: 2, lat: 37.8, lon: -80.4 }, '247': { region: 2, lat: 36.6, lon: -82.2 }, '248': { region: 2, lat: 37.8, lon: -80.4 },
  '249': { region: 2, lat: 37.8, lon: -80.4 }, '250': { region: 2, lat: 38.4, lon: -81.8 }, '251': { region: 2, lat: 38.4, lon: -81.8 }, '252': { region: 2, lat: 38.4, lon: -81.8 },
  '253': { region: 2, lat: 38.4, lon: -81.8 }, '254': { region: 2, lat: 39.5, lon: -80.1 }, '255': { region: 2, lat: 38.4, lon: -82.4 }, '256': { region: 2, lat: 38.4, lon: -82.4 },
  '257': { region: 2, lat: 38.4, lon: -82.4 }, '258': { region: 2, lat: 37.8, lon: -81.2 }, '259': { region: 2, lat: 37.8, lon: -81.2 }, '260': { region: 2, lat: 39.5, lon: -80.1 },
  '261': { region: 2, lat: 39.3, lon: -81.6 }, '262': { region: 2, lat: 39.3, lon: -81.6 }, '263': { region: 2, lat: 39.5, lon: -80.1 }, '264': { region: 2, lat: 39.3, lon: -81.6 },
  '265': { region: 2, lat: 39.5, lon: -80.1 }, '266': { region: 2, lat: 39.5, lon: -80.1 }, '267': { region: 2, lat: 39.5, lon: -80.1 }, '268': { region: 2, lat: 39.3, lon: -81.6 },
  '270': { region: 3, lat: 35.2, lon: -80.8 }, '271': { region: 3, lat: 36.1, lon: -79.8 }, '272': { region: 3, lat: 36.1, lon: -79.8 }, '273': { region: 3, lat: 36.1, lon: -79.8 },
  '274': { region: 3, lat: 36.1, lon: -79.8 }, '275': { region: 3, lat: 35.8, lon: -78.6 }, '276': { region: 3, lat: 35.8, lon: -78.6 }, '277': { region: 3, lat: 35.8, lon: -78.6 },
  '278': { region: 3, lat: 35.6, lon: -77.4 }, '279': { region: 3, lat: 35.6, lon: -77.4 }, '280': { region: 3, lat: 35.2, lon: -80.8 }, '281': { region: 3, lat: 35.2, lon: -80.8 },
  '282': { region: 3, lat: 35.2, lon: -80.8 }, '283': { region: 3, lat: 35.1, lon: -79.0 }, '284': { region: 3, lat: 35.1, lon: -79.0 }, '285': { region: 3, lat: 35.2, lon: -81.0 },
  '286': { region: 3, lat: 35.6, lon: -82.6 }, '287': { region: 3, lat: 35.6, lon: -82.6 }, '288': { region: 3, lat: 35.6, lon: -82.6 }, '289': { region: 3, lat: 34.2, lon: -79.0 },
  '290': { region: 3, lat: 34.0, lon: -81.0 }, '291': { region: 3, lat: 34.0, lon: -81.0 }, '292': { region: 3, lat: 34.0, lon: -81.0 }, '293': { region: 3, lat: 34.8, lon: -82.4 },
  '294': { region: 3, lat: 32.8, lon: -80.0 }, '295': { region: 3, lat: 34.2, lon: -79.8 }, '296': { region: 3, lat: 34.8, lon: -82.4 }, '297': { region: 3, lat: 35.0, lon: -80.8 },
  '298': { region: 3, lat: 33.9, lon: -80.4 }, '299': { region: 3, lat: 32.8, lon: -80.0 }, '300': { region: 3, lat: 33.7, lon: -84.4 }, '301': { region: 3, lat: 33.7, lon: -84.4 },
  '302': { region: 3, lat: 33.7, lon: -84.4 }, '303': { region: 3, lat: 33.7, lon: -84.4 }, '304': { region: 3, lat: 33.4, lon: -82.0 }, '305': { region: 3, lat: 33.4, lon: -82.0 },
  '306': { region: 3, lat: 33.4, lon: -82.0 }, '307': { region: 3, lat: 32.5, lon: -83.6 }, '308': { region: 3, lat: 33.4, lon: -82.0 }, '309': { region: 3, lat: 32.1, lon: -81.1 },
  '310': { region: 3, lat: 32.1, lon: -81.1 }, '311': { region: 3, lat: 32.1, lon: -81.1 }, '312': { region: 3, lat: 32.5, lon: -83.6 }, '313': { region: 3, lat: 32.5, lon: -83.6 },
  '314': { region: 3, lat: 32.5, lon: -83.6 }, '315': { region: 3, lat: 31.6, lon: -84.2 }, '316': { region: 3, lat: 31.6, lon: -84.2 }, '317': { region: 3, lat: 31.6, lon: -84.2 },
  '318': { region: 3, lat: 32.5, lon: -83.6 }, '319': { region: 3, lat: 31.6, lon: -84.2 }, '320': { region: 3, lat: 30.3, lon: -81.7 }, '321': { region: 3, lat: 28.5, lon: -81.4 },
  '322': { region: 3, lat: 30.3, lon: -81.7 }, '323': { region: 3, lat: 28.5, lon: -81.4 }, '324': { region: 3, lat: 29.2, lon: -81.0 }, '325': { region: 3, lat: 30.4, lon: -84.3 },
  '326': { region: 3, lat: 29.2, lon: -82.1 }, '327': { region: 3, lat: 28.5, lon: -81.4 }, '328': { region: 3, lat: 28.5, lon: -81.4 }, '329': { region: 3, lat: 28.5, lon: -81.4 },
  '330': { region: 3, lat: 25.8, lon: -80.2 }, '331': { region: 3, lat: 25.8, lon: -80.2 }, '332': { region: 3, lat: 25.8, lon: -80.2 }, '333': { region: 3, lat: 26.1, lon: -80.1 },
  '334': { region: 3, lat: 26.7, lon: -80.1 }, '335': { region: 3, lat: 27.9, lon: -82.5 }, '336': { region: 3, lat: 27.9, lon: -82.5 }, '337': { region: 3, lat: 27.9, lon: -82.5 },
  '338': { region: 3, lat: 28.0, lon: -81.9 }, '339': { region: 3, lat: 26.3, lon: -80.1 }, '340': { region: 1, lat: 18.4, lon: -64.9 }, '341': { region: 3, lat: 26.3, lon: -80.1 },
  '342': { region: 3, lat: 28.0, lon: -81.9 }, '344': { region: 3, lat: 28.0, lon: -81.9 }, '346': { region: 3, lat: 27.5, lon: -82.6 }, '347': { region: 3, lat: 28.5, lon: -81.4 },
  '349': { region: 3, lat: 26.6, lon: -81.9 }, '350': { region: 3, lat: 33.5, lon: -86.8 }, '351': { region: 3, lat: 33.5, lon: -86.8 }, '352': { region: 3, lat: 33.5, lon: -86.8 },
  '354': { region: 3, lat: 33.5, lon: -86.2 }, '355': { region: 3, lat: 33.5, lon: -86.8 }, '356': { region: 3, lat: 34.7, lon: -86.6 }, '357': { region: 3, lat: 34.7, lon: -86.6 },
  '358': { region: 3, lat: 34.7, lon: -86.6 }, '359': { region: 3, lat: 33.5, lon: -86.8 }, '360': { region: 3, lat: 32.4, lon: -86.3 }, '361': { region: 3, lat: 32.4, lon: -86.3 },
  '362': { region: 3, lat: 33.2, lon: -87.5 }, '363': { region: 3, lat: 33.2, lon: -87.5 }, '364': { region: 3, lat: 34.0, lon: -85.0 }, '365': { region: 3, lat: 34.0, lon: -85.0 },
  '366': { region: 3, lat: 31.3, lon: -85.8 }, '367': { region: 3, lat: 31.3, lon: -85.8 }, '368': { region: 3, lat: 32.4, lon: -86.3 }, '369': { region: 3, lat: 30.7, lon: -88.0 },
  '370': { region: 3, lat: 36.2, lon: -86.8 }, '371': { region: 3, lat: 36.2, lon: -86.8 }, '372': { region: 3, lat: 36.2, lon: -86.8 }, '373': { region: 3, lat: 35.0, lon: -85.3 },
  '374': { region: 3, lat: 35.0, lon: -85.3 }, '375': { region: 3, lat: 36.0, lon: -87.4 }, '376': { region: 3, lat: 36.3, lon: -82.4 }, '377': { region: 3, lat: 35.0, lon: -85.3 },
  '378': { region: 3, lat: 35.0, lon: -85.3 }, '379': { region: 3, lat: 36.0, lon: -84.3 }, '380': { region: 3, lat: 35.1, lon: -90.1 }, '381': { region: 3, lat: 35.1, lon: -90.1 },
  '382': { region: 3, lat: 35.1, lon: -90.1 }, '383': { region: 3, lat: 35.6, lon: -88.8 }, '384': { region: 3, lat: 35.6, lon: -88.8 }, '385': { region: 3, lat: 35.0, lon: -89.8 },
  '386': { region: 3, lat: 35.6, lon: -88.8 }, '387': { region: 3, lat: 35.6, lon: -88.8 }, '388': { region: 3, lat: 33.4, lon: -88.7 }, '389': { region: 3, lat: 34.3, lon: -89.5 },
  '390': { region: 3, lat: 32.3, lon: -90.2 }, '391': { region: 3, lat: 32.3, lon: -90.2 }, '392': { region: 3, lat: 32.3, lon: -90.2 }, '393': { region: 3, lat: 31.3, lon: -89.3 },
  '394': { region: 3, lat: 31.3, lon: -89.3 }, '395': { region: 3, lat: 30.4, lon: -88.9 }, '396': { region: 3, lat: 33.5, lon: -88.7 }, '397': { region: 3, lat: 33.5, lon: -88.7 },
  '398': { region: 3, lat: 34.3, lon: -89.5 }, '399': { region: 3, lat: 34.3, lon: -89.5 }, '400': { region: 3, lat: 38.3, lon: -85.8 }, '401': { region: 3, lat: 38.3, lon: -85.8 },
  '402': { region: 3, lat: 38.3, lon: -85.8 }, '403': { region: 3, lat: 38.0, lon: -84.5 }, '404': { region: 3, lat: 38.0, lon: -84.5 }, '405': { region: 3, lat: 38.0, lon: -84.5 },
  '406': { region: 3, lat: 38.0, lon: -84.5 }, '407': { region: 3, lat: 37.1, lon: -84.1 }, '408': { region: 3, lat: 37.1, lon: -84.1 }, '409': { region: 3, lat: 37.1, lon: -84.1 },
  '410': { region: 3, lat: 39.1, lon: -84.5 }, '411': { region: 3, lat: 38.0, lon: -83.4 }, '412': { region: 3, lat: 38.0, lon: -83.4 }, '413': { region: 3, lat: 37.1, lon: -87.5 },
  '414': { region: 3, lat: 37.1, lon: -87.5 }, '415': { region: 3, lat: 37.8, lon: -87.1 }, '416': { region: 3, lat: 37.8, lon: -87.1 }, '417': { region: 3, lat: 37.1, lon: -83.2 },
  '418': { region: 3, lat: 37.1, lon: -83.2 }, '420': { region: 3, lat: 37.1, lon: -87.5 }, '421': { region: 3, lat: 36.9, lon: -86.4 }, '422': { region: 3, lat: 36.9, lon: -86.4 },
  '423': { region: 3, lat: 37.8, lon: -85.4 }, '424': { region: 3, lat: 37.8, lon: -85.4 }, '425': { region: 3, lat: 37.8, lon: -87.1 }, '426': { region: 3, lat: 38.0, lon: -83.4 },
  '427': { region: 3, lat: 38.0, lon: -83.4 }, '430': { region: 3, lat: 39.9, lon: -83.0 }, '431': { region: 3, lat: 39.9, lon: -83.0 }, '432': { region: 3, lat: 39.9, lon: -83.0 },
  '433': { region: 3, lat: 39.9, lon: -83.0 }, '434': { region: 3, lat: 40.8, lon: -81.4 }, '435': { region: 3, lat: 40.8, lon: -81.4 }, '436': { region: 3, lat: 41.5, lon: -81.7 },
  '437': { region: 3, lat: 40.1, lon: -82.0 }, '438': { region: 3, lat: 40.1, lon: -82.0 }, '439': { region: 3, lat: 41.1, lon: -81.5 }, '440': { region: 3, lat: 41.5, lon: -81.7 },
  '441': { region: 3, lat: 41.5, lon: -81.7 }, '442': { region: 3, lat: 41.1, lon: -81.5 }, '443': { region: 3, lat: 41.1, lon: -81.5 }, '444': { region: 3, lat: 41.1, lon: -81.5 },
  '445': { region: 3, lat: 41.1, lon: -80.7 }, '446': { region: 3, lat: 40.0, lon: -80.7 }, '447': { region: 3, lat: 40.0, lon: -80.7 }, '448': { region: 3, lat: 40.5, lon: -80.7 },
  '449': { region: 3, lat: 40.5, lon: -80.7 }, '450': { region: 3, lat: 39.1, lon: -84.5 }, '451': { region: 3, lat: 39.1, lon: -84.5 }, '452': { region: 3, lat: 39.1, lon: -84.5 },
  '453': { region: 3, lat: 39.8, lon: -84.2 }, '454': { region: 3, lat: 39.8, lon: -84.2 }, '455': { region: 3, lat: 39.5, lon: -84.4 }, '456': { region: 3, lat: 39.5, lon: -82.4 },
  '457': { region: 3, lat: 39.1, lon: -82.0 }, '458': { region: 3, lat: 40.3, lon: -83.1 }, '459': { region: 3, lat: 39.1, lon: -84.5 }, '460': { region: 3, lat: 39.8, lon: -86.2 },
  '461': { region: 3, lat: 39.8, lon: -86.2 }, '462': { region: 3, lat: 39.8, lon: -86.2 }, '463': { region: 3, lat: 39.8, lon: -86.2 }, '464': { region: 3, lat: 40.4, lon: -86.9 },
  '465': { region: 3, lat: 40.4, lon: -86.9 }, '466': { region: 3, lat: 40.4, lon: -86.9 }, '467': { region: 3, lat: 40.4, lon: -86.9 }, '468': { region: 3, lat: 41.1, lon: -85.1 },
  '469': { region: 3, lat: 41.6, lon: -87.3 }, '470': { region: 3, lat: 39.1, lon: -85.5 }, '471': { region: 3, lat: 38.3, lon: -85.8 }, '472': { region: 3, lat: 38.0, lon: -87.6 },
  '473': { region: 3, lat: 39.5, lon: -87.4 }, '474': { region: 3, lat: 39.2, lon: -86.5 }, '475': { region: 3, lat: 39.5, lon: -87.4 }, '476': { region: 3, lat: 38.0, lon: -87.6 },
  '477': { region: 3, lat: 38.0, lon: -87.6 }, '478': { region: 3, lat: 38.0, lon: -87.6 }, '479': { region: 3, lat: 40.4, lon: -86.9 }, '480': { region: 3, lat: 42.3, lon: -83.0 },
  '481': { region: 3, lat: 42.3, lon: -83.0 }, '482': { region: 3, lat: 42.3, lon: -83.0 }, '483': { region: 3, lat: 42.3, lon: -83.0 }, '484': { region: 3, lat: 43.0, lon: -83.7 },
  '485': { region: 3, lat: 43.0, lon: -83.7 }, '486': { region: 3, lat: 43.4, lon: -83.9 }, '487': { region: 3, lat: 43.4, lon: -83.9 }, '488': { region: 3, lat: 42.7, lon: -84.5 },
  '489': { region: 3, lat: 42.7, lon: -84.5 }, '490': { region: 3, lat: 42.3, lon: -85.6 }, '491': { region: 3, lat: 42.3, lon: -85.6 }, '492': { region: 3, lat: 42.3, lon: -85.6 },
  '493': { region: 3, lat: 43.0, lon: -85.7 }, '494': { region: 3, lat: 43.0, lon: -85.7 }, '495': { region: 3, lat: 43.0, lon: -85.7 }, '496': { region: 3, lat: 43.7, lon: -85.5 },
  '497': { region: 3, lat: 44.8, lon: -85.6 }, '498': { region: 3, lat: 46.5, lon: -87.4 }, '499': { region: 3, lat: 46.5, lon: -87.4 }, '500': { region: 4, lat: 41.6, lon: -93.6 },
  '501': { region: 4, lat: 41.6, lon: -93.6 }, '502': { region: 4, lat: 41.6, lon: -93.6 }, '503': { region: 4, lat: 41.6, lon: -93.6 }, '504': { region: 4, lat: 42.5, lon: -92.3 },
  '505': { region: 4, lat: 42.5, lon: -92.3 }, '506': { region: 4, lat: 42.5, lon: -92.3 }, '507': { region: 4, lat: 42.5, lon: -92.3 }, '508': { region: 4, lat: 41.3, lon: -95.9 },
  '509': { region: 4, lat: 41.3, lon: -95.9 }, '510': { region: 4, lat: 42.5, lon: -96.4 }, '511': { region: 4, lat: 42.5, lon: -96.4 }, '512': { region: 4, lat: 42.0, lon: -93.6 },
  '513': { region: 4, lat: 42.0, lon: -93.6 }, '514': { region: 4, lat: 42.0, lon: -93.6 }, '515': { region: 4, lat: 41.3, lon: -95.9 }, '516': { region: 4, lat: 41.3, lon: -95.9 },
  '520': { region: 4, lat: 41.5, lon: -90.6 }, '521': { region: 4, lat: 41.5, lon: -90.6 }, '522': { region: 4, lat: 41.7, lon: -91.5 }, '523': { region: 4, lat: 41.7, lon: -91.5 },
  '524': { region: 4, lat: 41.7, lon: -91.5 }, '525': { region: 4, lat: 41.0, lon: -91.0 }, '526': { region: 4, lat: 41.0, lon: -91.0 }, '527': { region: 4, lat: 42.5, lon: -90.7 },
  '528': { region: 4, lat: 42.5, lon: -90.7 }, '530': { region: 3, lat: 43.1, lon: -89.4 }, '531': { region: 3, lat: 43.1, lon: -89.4 }, '532': { region: 3, lat: 42.7, lon: -87.8 },
  '534': { region: 3, lat: 42.7, lon: -89.0 }, '535': { region: 3, lat: 43.1, lon: -89.4 }, '537': { region: 3, lat: 43.1, lon: -89.4 }, '538': { region: 3, lat: 43.1, lon: -89.4 },
  '539': { region: 3, lat: 43.8, lon: -88.4 }, '540': { region: 3, lat: 44.5, lon: -88.0 }, '541': { region: 3, lat: 44.5, lon: -88.0 }, '542': { region: 3, lat: 44.5, lon: -88.0 },
  '543': { region: 3, lat: 44.5, lon: -88.0 }, '544': { region: 3, lat: 45.0, lon: -89.7 }, '545': { region: 3, lat: 44.8, lon: -91.5 }, '546': { region: 3, lat: 43.8, lon: -91.2 },
  '547': { region: 3, lat: 44.8, lon: -91.5 }, '548': { region: 3, lat: 46.6, lon: -90.1 }, '549': { region: 3, lat: 44.5, lon: -88.0 }, '550': { region: 3, lat: 44.9, lon: -93.3 },
  '551': { region: 3, lat: 44.9, lon: -93.3 }, '553': { region: 3, lat: 44.9, lon: -93.3 }, '554': { region: 3, lat: 44.9, lon: -93.3 }, '555': { region: 3, lat: 44.9, lon: -93.3 },
  '556': { region: 3, lat: 46.8, lon: -92.1 }, '557': { region: 3, lat: 46.8, lon: -92.1 }, '558': { region: 3, lat: 46.8, lon: -92.1 }, '559': { region: 3, lat: 44.2, lon: -94.0 },
  '560': { region: 3, lat: 44.0, lon: -92.5 }, '561': { region: 3, lat: 46.3, lon: -94.2 }, '562': { region: 3, lat: 45.6, lon: -94.2 }, '563': { region: 3, lat: 44.0, lon: -92.5 },
  '564': { region: 3, lat: 47.0, lon: -95.0 }, '565': { region: 3, lat: 47.0, lon: -95.0 }, '566': { region: 3, lat: 47.9, lon: -97.0 }, '567': { region: 3, lat: 48.2, lon: -96.6 },
  '570': { region: 4, lat: 43.5, lon: -96.7 }, '571': { region: 4, lat: 43.5, lon: -96.7 }, '572': { region: 4, lat: 44.4, lon: -98.2 }, '573': { region: 4, lat: 44.4, lon: -98.2 },
  '574': { region: 4, lat: 45.5, lon: -98.5 }, '575': { region: 4, lat: 44.1, lon: -103.2 }, '576': { region: 4, lat: 46.9, lon: -96.8 }, '577': { region: 4, lat: 44.1, lon: -103.2 },
  '580': { region: 4, lat: 46.9, lon: -96.8 }, '581': { region: 4, lat: 46.9, lon: -96.8 }, '582': { region: 4, lat: 47.9, lon: -97.0 }, '583': { region: 4, lat: 47.9, lon: -97.0 },
  '584': { region: 4, lat: 46.9, lon: -98.7 }, '585': { region: 4, lat: 46.9, lon: -100.8 }, '586': { region: 4, lat: 48.2, lon: -101.3 }, '587': { region: 4, lat: 48.2, lon: -101.3 },
  '588': { region: 4, lat: 47.5, lon: -99.5 }, '590': { region: 4, lat: 45.8, lon: -108.5 }, '591': { region: 4, lat: 45.8, lon: -108.5 }, '592': { region: 4, lat: 47.5, lon: -111.3 },
  '593': { region: 4, lat: 47.5, lon: -111.3 }, '594': { region: 4, lat: 48.5, lon: -109.5 }, '595': { region: 4, lat: 48.0, lon: -104.5 }, '596': { region: 4, lat: 46.0, lon: -105.0 },
  '597': { region: 4, lat: 45.8, lon: -108.5 }, '598': { region: 4, lat: 46.9, lon: -114.0 }, '599': { region: 4, lat: 48.2, lon: -114.3 }, '600': { region: 3, lat: 41.9, lon: -87.6 },
  '601': { region: 3, lat: 41.9, lon: -87.6 }, '602': { region: 3, lat: 41.9, lon: -87.6 }, '603': { region: 3, lat: 42.0, lon: -87.7 }, '604': { region: 3, lat: 41.8, lon: -87.7 },
  '605': { region: 3, lat: 41.8, lon: -87.7 }, '606': { region: 3, lat: 41.9, lon: -87.6 }, '607': { region: 3, lat: 41.9, lon: -87.6 }, '608': { region: 3, lat: 41.9, lon: -87.6 },
  '609': { region: 3, lat: 42.3, lon: -88.2 }, '610': { region: 3, lat: 41.8, lon: -89.5 }, '611': { region: 3, lat: 41.5, lon: -90.6 }, '612': { region: 3, lat: 41.5, lon: -90.6 },
  '613': { region: 3, lat: 43.0, lon: -89.0 }, '614': { region: 3, lat: 40.7, lon: -89.6 }, '615': { region: 3, lat: 40.7, lon: -89.6 }, '616': { region: 3, lat: 40.7, lon: -89.6 },
  '617': { region: 3, lat: 40.5, lon: -88.9 }, '618': { region: 3, lat: 40.1, lon: -88.2 }, '619': { region: 3, lat: 40.1, lon: -88.2 }, '620': { region: 3, lat: 38.6, lon: -90.2 },
  '622': { region: 3, lat: 38.5, lon: -89.9 }, '623': { region: 3, lat: 38.9, lon: -90.1 }, '624': { region: 3, lat: 38.5, lon: -89.0 }, '625': { region: 3, lat: 39.8, lon: -89.6 },
  '626': { region: 3, lat: 39.8, lon: -89.6 }, '627': { region: 3, lat: 39.8, lon: -89.6 }, '628': { region: 3, lat: 38.3, lon: -88.9 }, '629': { region: 3, lat: 37.7, lon: -89.2 },
  '630': { region: 4, lat: 38.6, lon: -90.2 }, '631': { region: 4, lat: 38.6, lon: -90.2 }, '633': { region: 4, lat: 38.8, lon: -90.5 }, '634': { region: 4, lat: 39.1, lon: -90.3 },
  '635': { region: 4, lat: 39.1, lon: -90.3 }, '636': { region: 4, lat: 38.6, lon: -90.2 }, '637': { region: 4, lat: 38.6, lon: -90.2 }, '638': { region: 4, lat: 38.0, lon: -90.4 },
  '639': { region: 4, lat: 38.6, lon: -90.2 }, '640': { region: 4, lat: 39.1, lon: -94.6 }, '641': { region: 4, lat: 39.1, lon: -94.6 }, '644': { region: 4, lat: 39.1, lon: -94.6 },
  '645': { region: 4, lat: 39.1, lon: -94.6 }, '646': { region: 4, lat: 39.1, lon: -94.6 }, '647': { region: 4, lat: 39.1, lon: -94.6 }, '648': { region: 4, lat: 37.0, lon: -94.5 },
  '649': { region: 4, lat: 39.1, lon: -94.6 }, '650': { region: 4, lat: 38.6, lon: -92.2 }, '651': { region: 4, lat: 38.6, lon: -92.2 }, '652': { region: 4, lat: 38.6, lon: -92.2 },
  '653': { region: 4, lat: 38.9, lon: -92.3 }, '654': { region: 4, lat: 37.2, lon: -93.3 }, '655': { region: 4, lat: 37.2, lon: -93.3 }, '656': { region: 4, lat: 37.2, lon: -93.3 },
  '657': { region: 4, lat: 37.2, lon: -93.3 }, '658': { region: 4, lat: 39.1, lon: -94.6 }, '660': { region: 4, lat: 39.1, lon: -94.6 }, '661': { region: 4, lat: 39.1, lon: -94.6 },
  '662': { region: 4, lat: 39.1, lon: -94.6 }, '664': { region: 4, lat: 39.0, lon: -95.7 }, '665': { region: 4, lat: 39.0, lon: -95.7 }, '666': { region: 4, lat: 39.0, lon: -95.7 },
  '667': { region: 4, lat: 39.0, lon: -95.7 }, '668': { region: 4, lat: 39.0, lon: -95.7 }, '669': { region: 4, lat: 38.7, lon: -99.3 }, '670': { region: 4, lat: 37.7, lon: -97.3 },
  '671': { region: 4, lat: 37.7, lon: -97.3 }, '672': { region: 4, lat: 37.7, lon: -97.3 }, '673': { region: 4, lat: 38.8, lon: -97.6 }, '674': { region: 4, lat: 38.8, lon: -97.6 },
  '675': { region: 4, lat: 38.4, lon: -98.8 }, '676': { region: 4, lat: 38.4, lon: -98.8 }, '677': { region: 4, lat: 39.4, lon: -101.0 }, '678': { region: 4, lat: 37.0, lon: -100.9 },
  '679': { region: 4, lat: 37.0, lon: -100.9 }, '680': { region: 4, lat: 41.3, lon: -96.0 }, '681': { region: 4, lat: 41.3, lon: -96.0 }, '683': { region: 4, lat: 40.8, lon: -96.7 },
  '684': { region: 4, lat: 40.8, lon: -96.7 }, '685': { region: 4, lat: 40.8, lon: -96.7 }, '686': { region: 4, lat: 41.3, lon: -96.0 }, '687': { region: 4, lat: 41.3, lon: -96.0 },
  '688': { region: 4, lat: 41.1, lon: -100.8 }, '689': { region: 4, lat: 41.1, lon: -100.8 }, '690': { region: 4, lat: 41.1, lon: -100.8 }, '691': { region: 4, lat: 41.9, lon: -103.7 },
  '692': { region: 4, lat: 42.9, lon: -100.5 }, '693': { region: 4, lat: 42.9, lon: -100.5 }, '700': { region: 4, lat: 30.0, lon: -90.1 }, '701': { region: 4, lat: 30.0, lon: -90.1 },
  '703': { region: 4, lat: 30.0, lon: -90.1 }, '704': { region: 4, lat: 30.2, lon: -93.2 }, '705': { region: 4, lat: 30.2, lon: -93.2 }, '706': { region: 4, lat: 30.2, lon: -93.2 },
  '707': { region: 4, lat: 30.5, lon: -91.2 }, '708': { region: 4, lat: 30.5, lon: -91.2 }, '710': { region: 4, lat: 32.5, lon: -93.7 }, '711': { region: 4, lat: 32.5, lon: -93.7 },
  '712': { region: 4, lat: 32.5, lon: -93.7 }, '713': { region: 4, lat: 31.3, lon: -92.4 }, '714': { region: 4, lat: 31.3, lon: -92.4 }, '716': { region: 4, lat: 32.3, lon: -91.4 },
  '717': { region: 4, lat: 32.3, lon: -91.4 }, '718': { region: 4, lat: 32.5, lon: -93.7 }, '719': { region: 4, lat: 32.3, lon: -91.4 }, '720': { region: 4, lat: 35.4, lon: -94.4 },
  '721': { region: 4, lat: 35.4, lon: -94.4 }, '722': { region: 4, lat: 34.7, lon: -92.3 }, '723': { region: 4, lat: 34.7, lon: -92.3 }, '724': { region: 4, lat: 34.7, lon: -92.3 },
  '725': { region: 4, lat: 35.8, lon: -90.7 }, '726': { region: 4, lat: 35.8, lon: -90.7 }, '727': { region: 4, lat: 35.4, lon: -94.4 }, '728': { region: 4, lat: 36.4, lon: -94.2 },
  '729': { region: 4, lat: 36.4, lon: -94.2 }, '730': { region: 4, lat: 35.5, lon: -97.5 }, '731': { region: 4, lat: 35.5, lon: -97.5 }, '733': { region: 4, lat: 34.6, lon: -98.4 },
  '734': { region: 4, lat: 34.2, lon: -97.1 }, '735': { region: 4, lat: 34.2, lon: -97.1 }, '736': { region: 4, lat: 35.5, lon: -97.5 }, '737': { region: 4, lat: 36.1, lon: -97.1 },
  '738': { region: 4, lat: 36.7, lon: -97.1 }, '739': { region: 4, lat: 36.1, lon: -95.9 }, '740': { region: 4, lat: 36.1, lon: -95.9 }, '741': { region: 4, lat: 36.1, lon: -95.9 },
  '743': { region: 4, lat: 35.5, lon: -97.5 }, '744': { region: 4, lat: 35.5, lon: -95.0 }, '745': { region: 4, lat: 34.9, lon: -95.8 }, '746': { region: 4, lat: 36.8, lon: -95.0 },
  '747': { region: 4, lat: 34.9, lon: -95.8 }, '748': { region: 4, lat: 34.6, lon: -99.3 }, '749': { region: 4, lat: 36.7, lon: -101.5 }, '750': { region: 5, lat: 32.8, lon: -96.8 },
  '751': { region: 5, lat: 32.8, lon: -96.8 }, '752': { region: 5, lat: 32.8, lon: -96.8 }, '753': { region: 5, lat: 32.8, lon: -96.8 }, '754': { region: 5, lat: 33.2, lon: -97.1 },
  '755': { region: 5, lat: 33.2, lon: -97.1 }, '756': { region: 5, lat: 31.8, lon: -97.1 }, '757': { region: 5, lat: 31.8, lon: -97.1 }, '758': { region: 5, lat: 32.4, lon: -99.7 },
  '759': { region: 5, lat: 32.4, lon: -99.7 }, '760': { region: 5, lat: 32.7, lon: -97.3 }, '761': { region: 5, lat: 32.7, lon: -97.3 }, '762': { region: 5, lat: 32.7, lon: -97.3 },
  '763': { region: 5, lat: 33.6, lon: -101.8 }, '764': { region: 5, lat: 33.6, lon: -101.8 }, '765': { region: 5, lat: 33.6, lon: -101.8 }, '766': { region: 5, lat: 33.9, lon: -98.5 },
  '767': { region: 5, lat: 33.9, lon: -98.5 }, '768': { region: 5, lat: 35.2, lon: -101.8 }, '769': { region: 5, lat: 35.2, lon: -101.8 }, '770': { region: 5, lat: 29.8, lon: -95.4 },
  '771': { region: 5, lat: 29.8, lon: -95.4 }, '772': { region: 5, lat: 29.8, lon: -95.4 }, '773': { region: 5, lat: 29.8, lon: -95.4 }, '774': { region: 5, lat: 29.8, lon: -95.4 },
  '775': { region: 5, lat: 29.8, lon: -95.4 }, '776': { region: 5, lat: 30.1, lon: -93.7 }, '777': { region: 5, lat: 30.1, lon: -93.7 }, '778': { region: 5, lat: 30.1, lon: -94.1 },
  '779': { region: 5, lat: 30.6, lon: -96.3 }, '780': { region: 5, lat: 29.4, lon: -98.5 }, '781': { region: 5, lat: 29.4, lon: -98.5 }, '782': { region: 5, lat: 29.4, lon: -98.5 },
  '783': { region: 5, lat: 27.8, lon: -97.4 }, '784': { region: 5, lat: 27.8, lon: -97.4 }, '785': { region: 5, lat: 26.2, lon: -98.2 }, '786': { region: 5, lat: 30.3, lon: -97.7 },
  '787': { region: 5, lat: 30.3, lon: -97.7 }, '788': { region: 5, lat: 29.3, lon: -100.9 }, '789': { region: 5, lat: 29.3, lon: -100.9 }, '790': { region: 5, lat: 35.2, lon: -101.8 },
  '791': { region: 5, lat: 35.2, lon: -101.8 }, '792': { region: 5, lat: 31.8, lon: -106.4 }, '793': { region: 5, lat: 31.8, lon: -106.4 }, '794': { region: 5, lat: 31.8, lon: -106.4 },
  '795': { region: 5, lat: 33.6, lon: -101.8 }, '796': { region: 5, lat: 32.4, lon: -99.7 }, '797': { region: 5, lat: 31.4, lon: -100.5 }, '798': { region: 5, lat: 31.8, lon: -106.4 },
  '799': { region: 5, lat: 31.8, lon: -106.4 }, '800': { region: 5, lat: 39.7, lon: -105.0 }, '801': { region: 5, lat: 39.7, lon: -105.0 }, '802': { region: 5, lat: 39.7, lon: -105.0 },
  '803': { region: 5, lat: 40.4, lon: -104.7 }, '804': { region: 5, lat: 39.7, lon: -105.0 }, '805': { region: 5, lat: 40.4, lon: -104.7 }, '806': { region: 5, lat: 40.4, lon: -104.7 },
  '807': { region: 5, lat: 40.4, lon: -104.7 }, '808': { region: 5, lat: 38.8, lon: -104.8 }, '809': { region: 5, lat: 38.8, lon: -104.8 }, '810': { region: 5, lat: 38.8, lon: -104.8 },
  '811': { region: 5, lat: 38.3, lon: -105.0 }, '812': { region: 5, lat: 38.3, lon: -105.0 }, '813': { region: 5, lat: 37.3, lon: -107.9 }, '814': { region: 5, lat: 39.1, lon: -108.5 },
  '815': { region: 5, lat: 39.1, lon: -108.5 }, '816': { region: 5, lat: 39.6, lon: -106.4 }, '820': { region: 5, lat: 41.1, lon: -104.8 }, '821': { region: 5, lat: 41.1, lon: -104.8 },
  '822': { region: 5, lat: 41.1, lon: -104.8 }, '823': { region: 5, lat: 40.8, lon: -109.2 }, '824': { region: 5, lat: 42.9, lon: -106.3 }, '825': { region: 5, lat: 41.8, lon: -107.2 },
  '826': { region: 5, lat: 42.9, lon: -106.3 }, '827': { region: 5, lat: 43.5, lon: -110.8 }, '828': { region: 5, lat: 44.0, lon: -107.9 }, '829': { region: 5, lat: 43.5, lon: -110.8 },
  '830': { region: 5, lat: 43.5, lon: -110.8 }, '831': { region: 5, lat: 43.5, lon: -110.8 }, '832': { region: 5, lat: 43.6, lon: -116.2 }, '833': { region: 5, lat: 42.6, lon: -114.5 },
  '834': { region: 5, lat: 43.6, lon: -116.2 }, '835': { region: 5, lat: 46.4, lon: -117.0 }, '836': { region: 5, lat: 43.6, lon: -116.2 }, '837': { region: 5, lat: 43.6, lon: -116.2 },
  '838': { region: 5, lat: 47.7, lon: -116.8 }, '840': { region: 5, lat: 40.8, lon: -111.9 }, '841': { region: 5, lat: 40.8, lon: -111.9 }, '842': { region: 5, lat: 40.8, lon: -111.9 },
  '843': { region: 5, lat: 41.2, lon: -111.9 }, '844': { region: 5, lat: 40.2, lon: -111.7 }, '845': { region: 5, lat: 38.6, lon: -109.6 }, '846': { region: 5, lat: 39.1, lon: -110.1 },
  '847': { region: 5, lat: 40.2, lon: -111.7 }, '850': { region: 6, lat: 33.4, lon: -112.1 }, '851': { region: 6, lat: 33.4, lon: -112.1 }, '852': { region: 6, lat: 33.4, lon: -112.1 },
  '853': { region: 6, lat: 33.4, lon: -112.1 }, '855': { region: 6, lat: 33.4, lon: -112.1 }, '856': { region: 6, lat: 32.2, lon: -110.9 }, '857': { region: 6, lat: 32.2, lon: -110.9 },
  '859': { region: 6, lat: 35.2, lon: -111.6 }, '860': { region: 6, lat: 35.2, lon: -111.6 }, '863': { region: 6, lat: 34.5, lon: -112.5 }, '864': { region: 6, lat: 36.0, lon: -112.1 },
  '865': { region: 6, lat: 34.9, lon: -110.1 }, '870': { region: 5, lat: 35.1, lon: -106.6 }, '871': { region: 5, lat: 35.1, lon: -106.6 }, '872': { region: 5, lat: 35.1, lon: -106.6 },
  '873': { region: 5, lat: 36.7, lon: -108.2 }, '874': { region: 5, lat: 36.7, lon: -108.2 }, '875': { region: 5, lat: 35.1, lon: -106.6 }, '877': { region: 5, lat: 35.7, lon: -105.9 },
  '878': { region: 5, lat: 36.4, lon: -105.6 }, '879': { region: 5, lat: 33.4, lon: -104.5 }, '880': { region: 5, lat: 32.3, lon: -106.8 }, '881': { region: 5, lat: 34.0, lon: -106.9 },
  '882': { region: 5, lat: 34.0, lon: -106.9 }, '883': { region: 5, lat: 32.3, lon: -106.8 }, '884': { region: 5, lat: 32.8, lon: -108.3 }, '885': { region: 5, lat: 31.8, lon: -106.4 },
  '889': { region: 6, lat: 36.2, lon: -115.1 }, '890': { region: 6, lat: 36.2, lon: -115.1 }, '891': { region: 6, lat: 36.2, lon: -115.1 }, '893': { region: 6, lat: 37.8, lon: -114.8 },
  '894': { region: 6, lat: 39.5, lon: -119.8 }, '895': { region: 6, lat: 39.5, lon: -119.8 }, '897': { region: 6, lat: 40.8, lon: -115.8 }, '898': { region: 6, lat: 40.8, lon: -117.0 },
  '900': { region: 6, lat: 34.1, lon: -118.2 }, '901': { region: 6, lat: 34.1, lon: -118.2 }, '902': { region: 6, lat: 34.1, lon: -118.2 }, '903': { region: 6, lat: 34.1, lon: -118.2 },
  '904': { region: 6, lat: 34.1, lon: -118.2 }, '905': { region: 6, lat: 33.8, lon: -118.2 }, '906': { region: 6, lat: 33.9, lon: -118.1 }, '907': { region: 6, lat: 33.9, lon: -118.1 },
  '908': { region: 6, lat: 33.9, lon: -118.1 }, '910': { region: 6, lat: 34.0, lon: -117.9 }, '911': { region: 6, lat: 34.1, lon: -118.0 }, '912': { region: 6, lat: 34.1, lon: -117.8 },
  '913': { region: 6, lat: 34.2, lon: -118.2 }, '914': { region: 6, lat: 34.2, lon: -118.5 }, '915': { region: 6, lat: 33.9, lon: -118.4 }, '916': { region: 6, lat: 34.1, lon: -118.3 },
  '917': { region: 6, lat: 34.0, lon: -117.6 }, '918': { region: 6, lat: 34.0, lon: -117.6 }, '919': { region: 6, lat: 34.0, lon: -117.3 }, '920': { region: 6, lat: 32.7, lon: -117.2 },
  '921': { region: 6, lat: 32.7, lon: -117.2 }, '922': { region: 6, lat: 33.0, lon: -117.3 }, '923': { region: 6, lat: 33.0, lon: -117.3 }, '924': { region: 6, lat: 33.0, lon: -117.3 },
  '925': { region: 6, lat: 33.8, lon: -116.5 }, '926': { region: 6, lat: 33.6, lon: -117.9 }, '927': { region: 6, lat: 33.7, lon: -117.9 }, '928': { region: 6, lat: 33.7, lon: -117.9 },
  '930': { region: 6, lat: 34.4, lon: -119.7 }, '931': { region: 6, lat: 34.4, lon: -119.7 }, '932': { region: 6, lat: 34.4, lon: -118.6 }, '933': { region: 6, lat: 34.9, lon: -117.0 },
  '934': { region: 6, lat: 34.0, lon: -118.2 }, '935': { region: 6, lat: 35.4, lon: -119.0 }, '936': { region: 6, lat: 36.7, lon: -119.8 }, '937': { region: 6, lat: 36.7, lon: -119.8 },
  '938': { region: 6, lat: 36.7, lon: -119.8 }, '939': { region: 6, lat: 36.6, lon: -121.9 }, '940': { region: 6, lat: 37.8, lon: -122.4 }, '941': { region: 6, lat: 37.8, lon: -122.4 },
  '942': { region: 6, lat: 37.8, lon: -122.3 }, '943': { region: 6, lat: 37.4, lon: -122.2 }, '944': { region: 6, lat: 37.4, lon: -122.2 }, '945': { region: 6, lat: 37.6, lon: -122.4 },
  '946': { region: 6, lat: 37.9, lon: -122.1 }, '947': { region: 6, lat: 37.9, lon: -122.1 }, '948': { region: 6, lat: 37.9, lon: -122.5 }, '949': { region: 6, lat: 37.9, lon: -122.5 },
  '950': { region: 6, lat: 37.3, lon: -121.9 }, '951': { region: 6, lat: 37.3, lon: -121.9 }, '952': { region: 6, lat: 38.0, lon: -122.0 }, '953': { region: 6, lat: 38.4, lon: -121.5 },
  '954': { region: 6, lat: 38.4, lon: -121.5 }, '955': { region: 6, lat: 40.8, lon: -124.2 }, '956': { region: 6, lat: 38.4, lon: -121.5 }, '957': { region: 6, lat: 38.4, lon: -121.5 },
  '958': { region: 6, lat: 38.4, lon: -121.5 }, '959': { region: 6, lat: 39.2, lon: -121.0 }, '960': { region: 6, lat: 40.6, lon: -122.4 }, '961': { region: 6, lat: 39.5, lon: -121.5 },
  '962': { region: 7, lat: 34.1, lon: -118.2 }, '963': { region: 7, lat: 34.1, lon: -118.2 }, '964': { region: 7, lat: 35.3, lon: -120.7 }, '965': { region: 7, lat: 35.3, lon: -120.7 },
  '966': { region: 6, lat: 36.6, lon: -121.9 }, '967': { region: 8, lat: 21.3, lon: -157.8 }, '968': { region: 8, lat: 21.3, lon: -157.8 }, '969': { region: 1, lat: 14.3, lon: 145.0 },
  '970': { region: 6, lat: 45.5, lon: -122.7 }, '971': { region: 6, lat: 45.5, lon: -122.7 }, '972': { region: 6, lat: 45.5, lon: -122.7 }, '973': { region: 6, lat: 45.5, lon: -122.7 },
  '974': { region: 6, lat: 44.1, lon: -123.1 }, '975': { region: 6, lat: 42.3, lon: -122.9 }, '976': { region: 6, lat: 42.2, lon: -121.7 }, '977': { region: 6, lat: 44.3, lon: -121.2 },
  '978': { region: 6, lat: 45.9, lon: -119.3 }, '979': { region: 6, lat: 44.6, lon: -121.0 }, '980': { region: 6, lat: 47.6, lon: -122.3 }, '981': { region: 6, lat: 47.6, lon: -122.3 },
  '982': { region: 6, lat: 47.4, lon: -122.2 }, '983': { region: 6, lat: 47.2, lon: -122.4 }, '984': { region: 6, lat: 47.6, lon: -122.3 }, '985': { region: 6, lat: 47.0, lon: -122.9 },
  '986': { region: 6, lat: 46.7, lon: -117.2 }, '988': { region: 6, lat: 47.4, lon: -120.3 }, '989': { region: 6, lat: 47.6, lon: -117.4 }, '990': { region: 6, lat: 47.6, lon: -117.4 },
  '991': { region: 6, lat: 47.6, lon: -117.4 }, '992': { region: 6, lat: 47.6, lon: -117.4 }, '993': { region: 6, lat: 46.3, lon: -119.3 }, '994': { region: 6, lat: 46.3, lon: -119.3 },
  '995': { region: 7, lat: 61.2, lon: -149.9 }, '996': { region: 7, lat: 61.2, lon: -149.9 }, '997': { region: 7, lat: 64.8, lon: -147.7 }, '998': { region: 7, lat: 58.3, lon: -134.4 },
  '999': { region: 7, lat: 55.3, lon: -131.7 }
};

function getZipLocation(zip: string): { lat: number; lon: number } | null {
  const prefix = zip.substring(0, 3);
  const data = ZIP_REGIONS[prefix];
  if (data) {
    return { lat: data.lat, lon: data.lon };
  }
  const firstDigit = zip.charAt(0);
  const defaultLocs: { [key: string]: { lat: number; lon: number } } = {
    '0': { lat: 42.4, lon: -71.1 }, '1': { lat: 40.7, lon: -74.0 }, '2': { lat: 38.9, lon: -77.0 },
    '3': { lat: 33.7, lon: -84.4 }, '4': { lat: 39.1, lon: -84.5 }, '5': { lat: 44.9, lon: -93.3 },
    '6': { lat: 41.9, lon: -87.6 }, '7': { lat: 29.8, lon: -95.4 }, '8': { lat: 39.7, lon: -105.0 },
    '9': { lat: 37.8, lon: -122.4 }
  };
  return defaultLocs[firstDigit] || null;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calculateZone(senderZip: string, receiverZip: string): number {
  const sender = getZipLocation(senderZip);
  const receiver = getZipLocation(receiverZip);
  
  if (!sender || !receiver) {
    const senderPrefix = parseInt(senderZip.charAt(0));
    const receiverPrefix = parseInt(receiverZip.charAt(0));
    const difference = Math.abs(senderPrefix - receiverPrefix);
    return Math.min(Math.max(difference + 2, 2), 8);
  }
  
  const distance = calculateDistance(sender.lat, sender.lon, receiver.lat, receiver.lon);
  
  if (distance < 150) return 2;
  if (distance < 300) return 3;
  if (distance < 600) return 4;
  if (distance < 1000) return 5;
  if (distance < 1400) return 6;
  if (distance < 1800) return 7;
  return 8;
}

function calculateShipping(
  senderZip: string,
  receiverZip: string,
  weight: number,
  length: number,
  width: number,
  height: number,
  method: keyof typeof SHIPPING_METHODS,
  insuranceValue: number
): ShippingResult {
  const dimWeight = Math.ceil((length * width * height) / DIM_FACTOR);
  const billableWeight = Math.max(weight, dimWeight);
  const zone = calculateZone(senderZip, receiverZip);
  const zoneFactor = 1 + (zone * 0.12);
  const methodData = SHIPPING_METHODS[method];
  const baseRate = methodData.rate;
  const insuranceCost = insuranceValue > 0 ? Math.max(insuranceValue * 0.01, 2.50) : 0;
  const baseCost = billableWeight * baseRate * zoneFactor;
  const totalCost = baseCost + insuranceCost;

  return {
    billableWeight,
    actualWeight: weight,
    dimWeight,
    method,
    methodLabel: methodData.label,
    baseRate,
    zoneFactor,
    zone,
    insuranceCost,
    totalCost,
    estimatedDays: methodData.days
  };
}

export default function UPSShippingCostPage() {
  const [senderZip, setSenderZip] = useState('');
  const [receiverZip, setReceiverZip] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [method, setMethod] = useState<keyof typeof SHIPPING_METHODS>('ground');
  const [insuranceValue, setInsuranceValue] = useState('');
  const [result, setResult] = useState<ShippingResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const validateInputs = (): boolean => {
    const newErrors: string[] = [];
    
    if (!/^\d{5}$/.test(senderZip)) {
      newErrors.push('Sender ZIP must be a 5-digit number');
    }
    if (!/^\d{5}$/.test(receiverZip)) {
      newErrors.push('Receiver ZIP must be a 5-digit number');
    }
    
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0 || w > 150) {
      newErrors.push('Weight must be between 0.1 and 150 lbs');
    }
    
    const l = parseFloat(length);
    const wd = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(l) || l <= 0 || l > 108) {
      newErrors.push('Length must be between 1 and 108 inches');
    }
    if (isNaN(wd) || wd <= 0 || wd > 108) {
      newErrors.push('Width must be between 1 and 108 inches');
    }
    if (isNaN(h) || h <= 0 || h > 108) {
      newErrors.push('Height must be between 1 and 108 inches');
    }
    
    const ins = parseFloat(insuranceValue) || 0;
    if (ins < 0) {
      newErrors.push('Insurance value cannot be negative');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    
    const shippingResult = calculateShipping(
      senderZip,
      receiverZip,
      parseFloat(weight),
      parseFloat(length),
      parseFloat(width),
      parseFloat(height),
      method,
      parseFloat(insuranceValue) || 0
    );
    
    setResult(shippingResult);
    
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleReset = () => {
    setSenderZip('');
    setReceiverZip('');
    setWeight('');
    setLength('');
    setWidth('');
    setHeight('');
    setMethod('ground');
    setInsuranceValue('');
    setResult(null);
    setErrors([]);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="hover:text-orange-600">Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">UPS Shipping Cost Estimator</span>
          </nav>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
              <Package className="w-4 h-4" />
              Free UPS Shipping Calculator
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Estimate UPS Shipping Cost – Free Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use this free tool to <strong>estimate UPS shipping cost</strong> instantly. Enter your package details, origin, and destination to get an accurate price estimate for UPS Ground, 2nd Day Air, and Next Day Air services.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Calculator className="w-6 h-6 text-amber-700" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">UPS Shipping Cost Calculator</h2>
            </div>

            {errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 mb-1">Please fix the following:</p>
                    <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                      {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Sender ZIP Code *
                </label>
                <input
                  type="text"
                  value={senderZip}
                  onChange={(e) => setSenderZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="e.g., 10001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Receiver ZIP Code *
                </label>
                <input
                  type="text"
                  value={receiverZip}
                  onChange={(e) => setReceiverZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="e.g., 90210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  maxLength={5}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Scale className="w-4 h-4 text-amber-600" />
                Package Weight (lbs) *
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                min="0.1"
                max="150"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum: 150 lbs</p>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Ruler className="w-4 h-4 text-amber-600" />
                Package Dimensions (inches) *
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Length"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    min="1"
                    max="108"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">Length</p>
                </div>
                <div>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Width"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    min="1"
                    max="108"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">Width</p>
                </div>
                <div>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    min="1"
                    max="108"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">Height</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Truck className="w-4 h-4 text-amber-600" />
                Shipping Method *
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as keyof typeof SHIPPING_METHODS)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white"
              >
                <option value="ground">UPS Ground (5-7 business days)</option>
                <option value="3day">UPS 3 Day Select (3 business days)</option>
                <option value="2day">UPS 2nd Day Air (2 business days)</option>
                <option value="nextday">UPS Next Day Air (1 business day)</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Shield className="w-4 h-4 text-amber-600" />
                Declared Value / Insurance (optional)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={insuranceValue}
                  onChange={(e) => setInsuranceValue(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Insurance adds ~1% of declared value (min $2.50)</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCalculate}
                className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Estimate UPS Shipping Cost
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all flex items-center justify-center"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {result && (
            <div ref={resultRef} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-6 sm:p-8 mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-500 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Estimated Cost: ${result.totalCost.toFixed(2)}
                  </h3>
                  <p className="text-amber-700">{result.methodLabel}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Estimated Delivery
                  </div>
                  <p className="font-semibold text-gray-900">{result.estimatedDays}</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    Shipping Zone
                  </div>
                  <p className="font-semibold text-gray-900">Zone {result.zone}</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Scale className="w-4 h-4" />
                    Billable Weight
                  </div>
                  <p className="font-semibold text-gray-900">{result.billableWeight} lbs</p>
                  {result.dimWeight > result.actualWeight && (
                    <p className="text-xs text-amber-600 mt-1">
                      (DIM weight applied: {result.dimWeight} lbs)
                    </p>
                  )}
                </div>

                <div className="bg-white rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Shield className="w-4 h-4" />
                    Insurance Added
                  </div>
                  <p className="font-semibold text-gray-900">
                    {result.insuranceCost > 0 ? `$${result.insuranceCost.toFixed(2)}` : 'None'}
                  </p>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    This is an <strong>unofficial estimate</strong> based on standard UPS pricing rules. 
                    Actual rates may vary based on account discounts, fuel surcharges, residential delivery fees, 
                    and other factors. For exact pricing, visit{' '}
                    <a href="https://www.ups.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                      ups.com
                    </a>.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <PostResultUpsell />
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-amber-500" />
              How to Estimate UPS Shipping Cost
            </h2>
            <p className="text-gray-700 mb-4">
              When you need to <strong>estimate UPS shipping cost</strong>, there are four key factors that determine your final price: 
              package weight, package dimensions, shipping distance (zones), and service level. Understanding these factors 
              helps you make smarter shipping decisions and potentially save money.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Weight and Dimensions:</strong> UPS charges based on whichever is greater — your package's actual weight 
              or its dimensional weight. Large, lightweight packages often cost more than you'd expect because UPS needs to 
              account for the space they take up in trucks and planes.
            </p>
            <p className="text-gray-700">
              <strong>Distance and Service:</strong> UPS divides the country into shipping zones. The further your package 
              travels, the higher the zone number and cost. Faster services like Next Day Air cost significantly more than 
              Ground shipping, but may be worth it for time-sensitive deliveries.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-amber-500" />
              UPS Shipping Zones Explained
            </h2>
            <p className="text-gray-700 mb-4">
              UPS uses a zone-based pricing system that divides the United States into 8 zones. Zone 2 represents local 
              shipments (typically within 50-150 miles), while Zone 8 covers coast-to-coast deliveries.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">Zone</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">Distance</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">Cost Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">Zone 2</td><td className="px-4 py-2">Local (0-150 mi)</td><td className="px-4 py-2">1.0x (baseline)</td></tr>
                  <tr><td className="px-4 py-2">Zone 3</td><td className="px-4 py-2">150-300 mi</td><td className="px-4 py-2">1.1x</td></tr>
                  <tr><td className="px-4 py-2">Zone 4</td><td className="px-4 py-2">300-600 mi</td><td className="px-4 py-2">1.2x</td></tr>
                  <tr><td className="px-4 py-2">Zone 5</td><td className="px-4 py-2">600-1000 mi</td><td className="px-4 py-2">1.4x</td></tr>
                  <tr><td className="px-4 py-2">Zone 6</td><td className="px-4 py-2">1000-1400 mi</td><td className="px-4 py-2">1.5x</td></tr>
                  <tr><td className="px-4 py-2">Zone 7</td><td className="px-4 py-2">1400-1800 mi</td><td className="px-4 py-2">1.7x</td></tr>
                  <tr><td className="px-4 py-2">Zone 8</td><td className="px-4 py-2">1800+ mi</td><td className="px-4 py-2">2.0x</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700">
              Use this calculator to estimate UPS shipping cost across any zone. Simply enter your origin and destination 
              ZIP codes, and we'll determine the appropriate zone automatically.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-amber-500" />
              Dimensional Weight vs Actual Weight
            </h2>
            <p className="text-gray-700 mb-4">
              One of the most important concepts when you <strong>estimate UPS shipping cost</strong> is understanding 
              billable weight. UPS charges based on whichever is greater: your package's actual weight or its dimensional weight.
            </p>
            <div className="bg-amber-50 rounded-xl p-4 mb-4 border border-amber-200">
              <p className="font-mono text-sm text-gray-800">
                <strong>Formula:</strong> Dimensional Weight = (Length × Width × Height) ÷ 139
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Example:</strong> A 20" × 15" × 12" box weighing 5 lbs has a dimensional weight of 26 lbs 
              (20 × 15 × 12 ÷ 139 = 25.9, rounded up). You'd be charged for 26 lbs, not 5 lbs.
            </p>
            <p className="text-gray-700">
              <strong>Pro tip:</strong> Use the smallest box possible for your items to minimize dimensional weight charges. 
              Don't ship air — it costs you money!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-6 h-6 text-amber-500" />
              UPS Shipping Methods Compared
            </h2>
            <p className="text-gray-700 mb-4">
              UPS offers several service levels, each with different delivery speeds and price points. Choose the right 
              service based on how urgently your package needs to arrive:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-900">UPS Ground</h3>
                </div>
                <p className="text-sm text-gray-600">5-7 business days • Most economical option for non-urgent shipments. Ideal for e-commerce and regular deliveries.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-900">UPS 3 Day Select</h3>
                </div>
                <p className="text-sm text-gray-600">3 business days • Good balance of speed and cost. Great for moderately urgent shipments.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-900">UPS 2nd Day Air</h3>
                </div>
                <p className="text-sm text-gray-600">2 business days • Faster than ground, delivered by end of second business day.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-900">UPS Next Day Air</h3>
                </div>
                <p className="text-sm text-gray-600">1 business day • Premium overnight service. Best for urgent, time-critical shipments.</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 mb-10">
            <h3 className="font-semibold text-gray-900 mb-3">Related Shipping Resources</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/mbb/ups-shipping-rates-explained"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div className="p-2 bg-amber-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors">UPS Shipping Rates Explained</p>
                  <p className="text-sm text-gray-500">Complete breakdown of UPS pricing</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link 
                href="/mbb/ups-ground-vs-air"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Truck className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors">UPS Ground vs Air</p>
                  <p className="text-sm text-gray-500">Which shipping method is cheaper?</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-amber-500" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <ExploreMoreTools currentTool="/tools/ups-shipping-cost" />

        </div>
      </div>
    </>
  );
}
