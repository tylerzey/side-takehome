export const listingTypeDefs = /* GraphQL */ `
  extend type Query {
    """
    Query listings based on a filter
    Improve: add query: QueryArgs in to support pagination
    """
    queryListings(filter: QueryListingFilter): QueryListingResponse
    """
    Find a listing by its mlsId.
    Returns an ErrorCause if the listing is not found or an error occurs.
    """
    findListingById(mlsId: Int!): ListingResponse
  }

  input QueryListingFilter {
    # Improve: Add filtering by StringFilter so we can do {eq: "foo"} and {neq: "foo"} etc
    city: String
  }

  union ListingResponse = Listing | ErrorCause

  type QueryListingResponse {
    entities: [Listing]
    hasMore: Boolean
  }

  # Note - contact, internetEntireListingDisplay, originalListPrice, and internetAddressDisplay are different data types than
  # what was documented in the assignment
  type Listing {
    privateRemarks: String
    showingContactName: String
    mlsId: Int
    showingContactPhone: String
    terms: String
    showingInstructions: String
    leaseTerm: String
    disclaimer: String
    originalListPrice: Int
    agreement: String
    listDate: String
    modified: String
    listPrice: Int
    internetAddressDisplay: Boolean
    listingId: String
    internetEntireListingDisplay: Boolean
    leaseType: String
    virtualTourUrl: String
    remarks: String
    association: Association
    sales: Sales
    coAgent: CoAgent
    tax: Tax
    geo: Geo
    mls: Mls
    photos: [String]
    school: School
    agent: Agent
    address: Address
    office: Office
    property: Property

    # Resolved values
    resolvedValues: ListingResolvedValues
  }

  type ListingResolvedValues {
    favoritesCount: Int
  }

  type Association {
    frequency: String
    fee: Int
    name: String
    amenities: String
  }

  type Contact {
    email: String
    office: String
    cell: String
  }

  type Agent {
    lastName: String
    contact: Contact
    address: String
    firstName: String
    id: String
  }

  type Office {
    contact: Contact
    name: String
    servingName: String
    brokerid: String
  }

  type Sales {
    closeDate: String
    closePrice: Int
    contractDate: String
    agent: Agent
    office: Office
  }

  type CoAgent {
    lastName: String
    contact: Contact
    address: String
    firstName: String
    id: String
  }

  type Tax {
    taxYear: Int
    taxAnnualAmount: Int
    id: String
  }

  type Geo {
    county: String
    lat: Float
    lng: Float
    marketArea: String
    directions: String
  }

  type Mls {
    status: String
    area: String
    daysOnMarket: Int
    originalEntryTimestamp: String
    originatingSystemName: String
    statusText: String
    areaMinor: String
  }

  type School {
    middleSchool: String
    highSchool: String
    elementarySchool: String
    district: String
  }

  type Address {
    crossStreet: String
    state: String
    country: String
    postalCode: String
    streetName: String
    streetNumberText: String
    city: String
    streetNumber: Int
    full: String
    unit: String
  }

  type Parking {
    leased: String
    spaces: Int
    description: String
  }

  type Property {
    roof: String
    cooling: String
    style: String
    area: Int
    bathsFull: Int
    bathsHalf: Int
    stories: Int
    fireplaces: Int
    flooring: String
    heating: String
    bathrooms: String
    foundation: String
    laundryFeatures: String
    occupantName: String
    ownerName: String
    lotDescription: String
    pool: String
    subType: String
    bedrooms: Int
    interiorFeatures: String
    lotSize: String
    areaSource: String
    maintenanceExpense: Float
    additionalRooms: String
    exteriorFeatures: String
    water: String
    view: String
    lotSizeArea: Float
    subdivision: String
    construction: String
    lotSizeAreaUnits: String
    type: String
    garageSpaces: Float
    bathsThreeQuarter: Float
    accessibility: String
    acres: Float
    occupantType: String
    subTypeText: String
    yearBuilt: Int
    parking: Parking
  }
`;
