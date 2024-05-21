import { z } from 'zod';

/**
 *
 * This file is auto generated from https://docs.simplyrets.com/api/simplyrets-openapi.yaml
 * Update it when simplyrets changes.
 *
 *
 *
 */

const Parking = z
  .object({
    leased: z.string().nullable(),
    spaces: z.number().int().nullable(),
    description: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Room = z
  .object({
    length: z.number().nullable(),
    features: z.string().nullable(),
    area: z.number().nullable(),
    width: z.number().nullable(),
    typeText: z.string().nullable(),
    type: z.string().nullable(),
    dimensions: z.string().nullable(),
    description: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Property = z
  .object({
    roof: z.string().nullable(),
    cooling: z.string().nullable(),
    style: z.string().nullable(),
    area: z.number().int().nullable(),
    bathsFull: z.number().int().nullable(),
    bathsHalf: z.number().int().nullable(),
    stories: z.number().nullable(),
    fireplaces: z.number().int().nullable(),
    flooring: z.string().nullable(),
    heating: z.string().nullable(),
    bathrooms: z.string().nullable(),
    foundation: z.string().nullable(),
    poolFeatures: z.string().nullable(),
    laundryFeatures: z.string().nullable(),
    occupantName: z.string().nullable(),
    ownerName: z.string().nullable(),
    lotDescription: z.string().nullable(),
    acres: z.number().nullable(),
    subType: z
      .enum([
        'Apartment',
        'BoatSlip',
        'SingleFamilyResidence',
        'DeededParking',
        'Cabin',
        'Condominium',
        'Duplex',
        'ManufacturedHome',
        'Quadruplex',
        'StockCooperative',
        'Townhouse',
        'Timeshare',
        'Triplex',
        'ManufacturedOnLand',
      ])
      .nullable(),
    bedrooms: z.number().int().nullable(),
    interiorFeatures: z.string().nullable(),
    lotSize: z.string().nullable(),
    areaSource: z.string().nullable(),
    maintenanceExpense: z.number().nullable(),
    additionalRooms: z.string().nullable(),
    exteriorFeatures: z.string().nullable(),
    water: z.string().nullable(),
    view: z.string().nullable(),
    lotSizeArea: z.number().nullable(),
    subdivision: z.string().nullable(),
    construction: z.string().nullable(),
    subTypeRaw: z.string().nullable(),
    parking: Parking,
    lotSizeAreaUnits: z.string().nullable(),
    type: z.enum(['RES', 'CND', 'RNT', 'MLF', 'CRE', 'LND', 'FRM']),
    garageSpaces: z.number().nullable(),
    bathsThreeQuarter: z.number().int().nullable(),
    accessibility: z.string().nullable(),
    occupantType: z.string().nullable(),
    yearBuilt: z.number().int().nullable(),
    rooms: z.array(Room).nullable(),
  })
  .partial()
  .passthrough();
const ContactInformation = z
  .object({
    email: z.string().nullable(),
    office: z.string().nullable(),
    cell: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Office = z
  .object({
    contact: ContactInformation.nullable(),
    name: z.string().nullable(),
    servingName: z.string().nullable(),
    brokerid: z.string().nullable(),
  })
  .partial()
  .passthrough();
const StreetAddress = z
  .object({
    crossStreet: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    postalCode: z.string().nullable(),
    streetName: z.string().nullable(),
    streetNumberText: z.string().nullable(),
    city: z.string().nullable(),
    streetNumber: z.number().int().nullable(),
    full: z.string().nullable(),
    unit: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Agent = z
  .object({
    lastName: z.string().nullable(),
    contact: ContactInformation.nullable(),
    firstName: z.string().nullable(),
    id: z.string().nullable(),
  })
  .partial()
  .passthrough();
const School = z
  .object({
    middleSchool: z.string().nullable(),
    highSchool: z.string().nullable(),
    elementarySchool: z.string().nullable(),
    district: z.string().nullable(),
  })
  .partial()
  .passthrough();
const MlsInformation = z
  .object({
    status: z.enum([
      'Active',
      'ActiveUnderContract',
      'Pending',
      'Hold',
      'Withdrawn',
      'Closed',
      'Expired',
      'Delete',
      'Incomplete',
      'ComingSoon',
    ]),
    area: z.string().nullable(),
    daysOnMarket: z.number().int().nullable(),
    originalEntryTimestamp: z.string().datetime({ offset: true }).nullable(),
    originatingSystemName: z.string().nullable(),
    statusText: z.string(),
    areaMinor: z.string().nullable(),
  })
  .partial()
  .passthrough();
const GeographicData = z
  .object({
    county: z.string().nullable(),
    lat: z.number().nullable(),
    lng: z.number().nullable(),
    marketArea: z.string().nullable(),
    directions: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Tax = z
  .object({
    taxYear: z.number().int().nullable(),
    taxAnnualAmount: z.number().int().nullable(),
    id: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Sales = z
  .object({
    closeDate: z.string().datetime({ offset: true }).nullable(),
    office: Office,
    closePrice: z.number().int().nullable(),
    agent: Agent,
    contractDate: z.string().datetime({ offset: true }).nullable(),
  })
  .partial()
  .passthrough();
const Association = z
  .object({
    fee: z.number().int().nullable(),
    frequency: z.string().nullable(),
    name: z.string().nullable(),
    amenities: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Listing = z
  .object({
    privateRemarks: z.string().nullable(),
    property: Property,
    mlsId: z.number().int(),
    showingInstructions: z.string().nullable(),
    showingContactName: z.string().nullable(),
    showingContactPhone: z.string().nullable(),
    specialListingConditions: z.string().nullable(),
    ownership: z.string().nullable(),
    office: Office,
    leaseTerm: z.string().nullable(),
    disclaimer: z.string().nullable(),
    address: StreetAddress,
    listDate: z.string().datetime({ offset: true }).nullable(),
    agent: Agent,
    modified: z.string().datetime({ offset: true }).nullable(),
    school: School,
    photos: z.array(z.string()),
    listPrice: z.number().nullable(),
    originalListPrice: z.number().nullable(),
    internetAddressDisplay: z.boolean().nullable(),
    listingId: z.string(),
    mls: MlsInformation,
    internetEntireListingDisplay: z.boolean().nullable(),
    geo: GeographicData,
    tax: Tax,
    coAgent: Agent,
    sales: Sales,
    leaseType: z.string().nullable(),
    virtualTourUrl: z.string().nullable(),
    remarks: z.string().nullable(),
    association: Association,
  })
  .partial()
  .passthrough();
const OpenHouse = z
  .object({
    refreshments: z.string().nullable(),
    listing: Listing,
    startTime: z.string().datetime({ offset: true }).nullable(),
    openHouseKey: z.number().int(),
    endTime: z.string().datetime({ offset: true }).nullable(),
    openHouseId: z.string(),
    type: z.string().nullable(),
    description: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Error = z.object({ error: z.number().int(), message: z.string() }).partial().passthrough();
const PropertiesOptionsResponse = z
  .object({
    expires: z.string().datetime({ offset: true }),
    lastUpdate: z.string().datetime({ offset: true }),
    fields: z
      .object({
        status: z.array(z.string()).nullable(),
        cities: z.array(z.string()).nullable(),
        counties: z.array(z.string()).nullable(),
        features: z.array(z.string()).nullable(),
        neighborhoods: z.array(z.string()).nullable(),
        areaMinor: z.array(z.string()).nullable(),
        type: z.array(z.string()).nullable(),
      })
      .partial()
      .passthrough()
      .nullable(),
  })
  .partial()
  .passthrough();
const OptionsResponse = z
  .object({
    expires: z.string().datetime({ offset: true }),
    vendors: z.array(z.string()),
    updates: z.record(z.string()),
    endpoints: z.array(z.string()),
    accepts: z.array(z.string()),
  })
  .partial()
  .passthrough();
const AgentsResponse = z
  .object({
    id: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    address: StreetAddress,
    contact: ContactInformation.nullable(),
    officeMlsId: z.string().nullable(),
  })
  .partial()
  .passthrough();
const ListingsAnalytics = z
  .object({
    avgLivingArea: z.number().nullable(),
    avgFullBaths: z.number().nullable(),
    avgBedrooms: z.number().nullable(),
    avgLotSize: z.number().nullable(),
    avgPrice: z.number().nullable(),
    avgYearBuilt: z.number().nullable(),
    areaDistribution: z.object({}).partial().passthrough().nullable(),
    totalCount: z.number().int().nullable(),
  })
  .partial()
  .passthrough();
const ListingAnalytics = z.object({ pricePerSqFt: z.number().nullable() }).partial().passthrough();

export const schemas = {
  Parking,
  Room,
  Property,
  ContactInformation,
  Office,
  StreetAddress,
  Agent,
  School,
  MlsInformation,
  GeographicData,
  Tax,
  Sales,
  Association,
  Listing,
  OpenHouse,
  Error,
  PropertiesOptionsResponse,
  OptionsResponse,
  AgentsResponse,
  ListingsAnalytics,
  ListingAnalytics,
};
