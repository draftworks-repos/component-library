"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import AuthManager from "./AuthManager";
import styles from "./AdminDashboard.module.css";
import UserManagement from "./UserManagement";

// Import the Lead interface from the schema
interface ILead {
  _id: string;
  client: {
    name: string;
    initials: string;
  };
  email: string;
  phone: string;
  message: string;
  assigned: "BOE1" | "BOE2" | "BOE3" | "BOE4" | "BOE5" | "";
  status: "pending" | "assigned" | "completed";
  action: "" | "trash";
  createdAt: string;
}

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  assigned: string;
  status: "Active" | "Inactive" | "Pending" | "Suspended" | "Verified";
  verified: boolean;
  created: string;
};

type BackofficeItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  assigned: string;
  status: "Completed" | "In Progress" | "Pending" | "On Hold" | "Cancelled";
  created: string;
};

type Tab = "Leads" | "Users" | "Backoffice" | "Backoffice Executives";

// Function to get random BOE assignment
const getRandomBOE = () => {
  const boeOptions = ['BOE1', 'BOE2', 'BOE3', 'BOE4', 'BOE5'];
  return boeOptions[Math.floor(Math.random() * boeOptions.length)];
};

// Mock leads data using the actual schema structure
const mockLeads: ILead[] = [
  {
    "_id": "fc40c263fdddbeaaa8f2e93e",
    "client": {
      "name": "Olivia Clark",
      "initials": "OC"
    },
    "email": "olivia.clark@example.com",
    "phone": "+1 (483) 983-9572",
    "message": "Interested in your property listings and would like to schedule a meeting to discuss investment opportunities.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-10T01:10:05.959519"
  },
  {
    "_id": "2beeb317f2c19c2fe5eaf8a2",
    "client": {
      "name": "James Johnson",
      "initials": "JJ"
    },
    "email": "james.johnson@example.com",
    "phone": "+1 (816) 467-7360",
    "message": "Looking for commercial property options in downtown area. Budget range 500K-1M.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-10T10:51:05.959584"
  },
  {
    "_id": "d73f7c3163f44d914ea9545e",
    "client": {
      "name": "James Walker",
      "initials": "JW"
    },
    "email": "james.walker@example.com",
    "phone": "+1 (636) 850-6708",
    "message": "Need more details on Riverfront project. When can we schedule a site visit?",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-06T00:16:05.959623"
  },
  {
    "_id": "5f855260b3ed0583ba2f327b",
    "client": {
      "name": "Sophia Clark",
      "initials": "SC"
    },
    "email": "sophia.clark@example.com",
    "phone": "+1 (338) 438-7757",
    "message": "Following up on last week's discussion about the Twin Tower project.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-11T13:19:05.959654"
  },
  {
    "_id": "6476b1864124558f102be2a2",
    "client": {
      "name": "Isabella Johnson",
      "initials": "IJ"
    },
    "email": "isabella.johnson@example.com",
    "phone": "+1 (873) 152-3109",
    "message": "Seeking commercial property options for expanding business operations.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T10:52:05.959684"
  },
  {
    "_id": "4a3efbaf550c95c11923662f",
    "client": {
      "name": "Emma Rhye",
      "initials": "ER"
    },
    "email": "emma.rhye@example.com",
    "phone": "+1 (409) 699-3446",
    "message": "Interested in residential plots and looking for good investment opportunities.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T13:16:05.959713"
  },
  {
    "_id": "629b0ba7cf41af0ea38f1b95",
    "client": {
      "name": "Lucas Clark",
      "initials": "LC"
    },
    "email": "lucas.clark@example.com",
    "phone": "+1 (860) 836-4883",
    "message": "Need brochure and pricing details for the new housing project.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-05T22:45:05.959743"
  },
  {
    "_id": "d8b7970e18b57ce345ad0d00",
    "client": {
      "name": "Liam Johnson",
      "initials": "LJ"
    },
    "email": "liam.johnson@example.com",
    "phone": "+1 (883) 929-1812",
    "message": "Schedule a site visit for Twin Tower. Interested in 2-3 bedroom apartments.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T21:03:05.959780"
  },
  {
    "_id": "1f516884101b8012a10de040",
    "client": {
      "name": "Olivia Lee",
      "initials": "OL"
    },
    "email": "olivia.lee@example.com",
    "phone": "+1 (513) 338-4262",
    "message": "Can we get a quotation for the premium apartment units?",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T10:02:05.959813"
  },
  {
    "_id": "21c27a98e264f150a5385f64",
    "client": {
      "name": "Isabella Young",
      "initials": "IY"
    },
    "email": "isabella.young@example.com",
    "phone": "+1 (550) 160-7883",
    "message": "Looking for family-friendly residential areas with good connectivity.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T21:30:05.959843"
  },
  {
    "_id": "10d0b527b27cefd94772a6c1",
    "client": {
      "name": "Isabella Lewis",
      "initials": "IL"
    },
    "email": "isabella.lewis@example.com",
    "phone": "+1 (903) 566-1124",
    "message": "Interested in eco-friendly housing options and sustainable living projects.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-12T16:42:05.959872"
  },
  {
    "_id": "5254f7210e33d29122831f32",
    "client": {
      "name": "Isabella Brown",
      "initials": "IB"
    },
    "email": "isabella.brown@example.com",
    "phone": "+1 (209) 327-5544",
    "message": "Following up on previous inquiry about office space availability.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-11T15:01:05.959902"
  },
  {
    "_id": "b4a6a3ab0e34291965507fc3",
    "client": {
      "name": "Lucas Walker",
      "initials": "LW"
    },
    "email": "lucas.walker@example.com",
    "phone": "+1 (996) 661-6017",
    "message": "Need information about parking facilities and amenities in the complex.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-07T21:03:05.959930"
  },
  {
    "_id": "e96fd69aa1fa93feebfd1d82",
    "client": {
      "name": "Lucas Lee",
      "initials": "LL"
    },
    "email": "lucas.lee@example.com",
    "phone": "+1 (664) 601-9541",
    "message": "Interested in luxury penthouses with city view. Please share catalog.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-12T15:23:05.959957"
  },
  {
    "_id": "63224b75e4a6f6939bebb3bd",
    "client": {
      "name": "Liam Brown",
      "initials": "LB"
    },
    "email": "liam.brown@example.com",
    "phone": "+1 (675) 416-6888",
    "message": "Looking for investment properties with good rental yield potential.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-10T18:53:05.959985"
  },
  {
    "_id": "f8bb6701d2212880cd1d6fae",
    "client": {
      "name": "Ava Lee",
      "initials": "AL"
    },
    "email": "ava.lee@example.com",
    "phone": "+1 (628) 465-8124",
    "message": "Need more details about payment plans and financing options available.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T08:28:05.960013"
  },
  {
    "_id": "ee9f47d62f69aa38e2cd90e5",
    "client": {
      "name": "Olivia Smith",
      "initials": "OS"
    },
    "email": "olivia.smith@example.com",
    "phone": "+1 (718) 947-9651",
    "message": "Interested in ground floor units suitable for elderly residents.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-10T07:35:05.960040"
  },
  {
    "_id": "eb2e927a4e8f9e7f72da5a1a",
    "client": {
      "name": "James Rhye",
      "initials": "JR"
    },
    "email": "james.rhye@example.com",
    "phone": "+1 (932) 364-1149",
    "message": "Would like to visit the model apartment and discuss customization options.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-12T07:34:05.960068"
  },
  {
    "_id": "b425f9a579de45d717c33c06",
    "client": {
      "name": "Ava Johnson",
      "initials": "AJ"
    },
    "email": "ava.johnson@example.com",
    "phone": "+1 (280) 826-7725",
    "message": "Looking for studio apartments near business district with modern amenities.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-06T06:21:05.960099"
  },
  {
    "_id": "326f2133d0f2311c2aa60653",
    "client": {
      "name": "Olivia Lewis",
      "initials": "OL"
    },
    "email": "olivia.lewis@example.com",
    "phone": "+1 (453) 432-7836",
    "message": "Need information about security features and safety measures in the building.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-11T22:39:05.960126"
  },
  {
    "_id": "314600a0d8f2512c15e8381a",
    "client": {
      "name": "Ava Clark",
      "initials": "AC"
    },
    "email": "ava.clark@example.com",
    "phone": "+1 (895) 798-8758",
    "message": "Interested in corner units with balcony and garden view options.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-06T08:22:05.960154"
  },
  {
    "_id": "6f0a0cdd8ed776accc6781c6",
    "client": {
      "name": "Lucas Johnson",
      "initials": "LJ"
    },
    "email": "lucas.johnson@example.com",
    "phone": "+1 (898) 117-9328",
    "message": "Looking for pet-friendly apartments with nearby park access.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T15:50:05.960183"
  },
  {
    "_id": "d9c6c9d229fcf4cc0613c656",
    "client": {
      "name": "Sophia Brown",
      "initials": "SB"
    },
    "email": "sophia.brown@example.com",
    "phone": "+1 (606) 351-2138",
    "message": "Need details about children's play area and educational facilities nearby.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-12T10:15:05.960210"
  },
  {
    "_id": "2371ba915bbdabf361f08223",
    "client": {
      "name": "James Clark",
      "initials": "JC"
    },
    "email": "james.clark@example.com",
    "phone": "+1 (329) 607-3148",
    "message": "Interested in duplex apartments with separate entrance and parking.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-06T02:22:05.960238"
  },
  {
    "_id": "4a7a7c09cfdb4fc2d9adc945",
    "client": {
      "name": "Ava Brown",
      "initials": "AB"
    },
    "email": "ava.brown@example.com",
    "phone": "+1 (625) 409-2895",
    "message": "Looking for furnished apartments with modern kitchen and appliances.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-12T01:39:05.960266"
  },
  {
    "_id": "31ae4ac8d15d902951e74faf",
    "client": {
      "name": "Liam Lee",
      "initials": "LL"
    },
    "email": "liam.lee@example.com",
    "phone": "+1 (608) 424-3747",
    "message": "Need information about gym facilities and swimming pool timings.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T15:48:05.960293"
  },
  {
    "_id": "1d0a1406b112f0a0bf12ab17",
    "client": {
      "name": "Ava Walker",
      "initials": "AW"
    },
    "email": "ava.walker@example.com",
    "phone": "+1 (897) 648-8939",
    "message": "Interested in smart home features and IoT integration in apartments.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T19:29:05.960320"
  },
  {
    "_id": "7884c9dc4dc2a477888b7ef0",
    "client": {
      "name": "Isabella Rhye",
      "initials": "IR"
    },
    "email": "isabella.rhye@example.com",
    "phone": "+1 (853) 601-6176",
    "message": "Looking for wheelchair accessible units with special amenities.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-10T02:13:05.960348"
  },
  {
    "_id": "73ecf49cf358e6243a1238a0",
    "client": {
      "name": "Emma Brown",
      "initials": "EB"
    },
    "email": "emma.brown@example.com",
    "phone": "+1 (762) 785-4535",
    "message": "Need information about rooftop garden and terrace access policies.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-05T19:27:05.960374"
  },
  {
    "_id": "00534ab4b85f654330c5134d",
    "client": {
      "name": "Isabella Brown",
      "initials": "IB"
    },
    "email": "isabella.brown@example.com",
    "phone": "+1 (575) 649-9787",
    "message": "Interested in energy-efficient apartments with solar panel integration.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-06T07:57:05.960395"
  },
  {
    "_id": "3ef887fe79a297399e36515a",
    "client": {
      "name": "Ava Lee",
      "initials": "AL"
    },
    "email": "ava.lee@example.com",
    "phone": "+1 (230) 396-6698",
    "message": "Looking for units with home office space and high-speed internet connectivity.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T06:21:05.960420"
  },
  {
    "_id": "2a00ca7bb57d230e5d2fda42",
    "client": {
      "name": "Emma Lee",
      "initials": "EL"
    },
    "email": "emma.lee@example.com",
    "phone": "+1 (539) 954-3162",
    "message": "Need details about maintenance charges and utility bill inclusions.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T07:09:05.960444"
  },
  {
    "_id": "9c44bea2825769dcb90e6ac6",
    "client": {
      "name": "Olivia Young",
      "initials": "OY"
    },
    "email": "olivia.young@example.com",
    "phone": "+1 (304) 292-9642",
    "message": "Interested in guest house facilities and visitor parking arrangements.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T04:55:05.960470"
  },
  {
    "_id": "d052a3756a7254f1a8716980",
    "client": {
      "name": "Sophia Rhye",
      "initials": "SR"
    },
    "email": "sophia.rhye@example.com",
    "phone": "+1 (662) 470-5531",
    "message": "Looking for apartments with natural lighting and cross ventilation.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T02:02:05.960497"
  },
  {
    "_id": "d000efcda34442f75be2e183",
    "client": {
      "name": "James Johnson",
      "initials": "JJ"
    },
    "email": "james.johnson@example.com",
    "phone": "+1 (859) 950-7377",
    "message": "Need information about clubhouse facilities and community events.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T09:28:05.960523"
  },
  {
    "_id": "7821b6648cbad4578d68a649",
    "client": {
      "name": "Lucas Clark",
      "initials": "LC"
    },
    "email": "lucas.clark@example.com",
    "phone": "+1 (500) 828-9925",
    "message": "Interested in penthouse units with private elevator access.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-07T00:33:05.960548"
  },
  {
    "_id": "8895c27c0b1d578d598b613d",
    "client": {
      "name": "James Rhye",
      "initials": "JR"
    },
    "email": "james.rhye@example.com",
    "phone": "+1 (734) 308-4276",
    "message": "Looking for apartments with study room and library access.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T19:04:05.960574"
  },
  {
    "_id": "560ce3acf045a63480ff7211",
    "client": {
      "name": "James Lewis",
      "initials": "JL"
    },
    "email": "james.lewis@example.com",
    "phone": "+1 (601) 543-8775",
    "message": "Need details about backup power systems and water supply arrangements.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T10:42:05.960600"
  },
  {
    "_id": "2c9c8a9d8337f8f50ab44d29",
    "client": {
      "name": "Olivia Brown",
      "initials": "OB"
    },
    "email": "olivia.brown@example.com",
    "phone": "+1 (298) 498-3199",
    "message": "Interested in corner apartments with panoramic city view.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T04:50:05.960625"
  },
  {
    "_id": "268e7f08d4193e2d2d9584b0",
    "client": {
      "name": "Olivia Johnson",
      "initials": "OJ"
    },
    "email": "olivia.johnson@example.com",
    "phone": "+1 (592) 130-8454",
    "message": "Looking for apartments with modular kitchen and premium fittings.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T23:36:05.960651"
  },
  {
    "_id": "8c99951b644c527b46fcba97",
    "client": {
      "name": "Lucas Brown",
      "initials": "LB"
    },
    "email": "lucas.brown@example.com",
    "phone": "+1 (445) 633-3773",
    "message": "Need information about fire safety systems and emergency exits.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T01:31:05.960676"
  },
  {
    "_id": "06bfec69ea273fc9348454ab",
    "client": {
      "name": "Isabella Brown",
      "initials": "IB"
    },
    "email": "isabella.brown@example.com",
    "phone": "+1 (840) 736-8325",
    "message": "Interested in apartments with walk-in closets and storage solutions.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-11T03:59:05.960701"
  },
  {
    "_id": "988008712df908a7b754cfa1",
    "client": {
      "name": "Noah Clark",
      "initials": "NC"
    },
    "email": "noah.clark@example.com",
    "phone": "+1 (581) 548-9927",
    "message": "Looking for apartments with multimedia room and entertainment systems.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-12T11:51:05.960727"
  },
  {
    "_id": "1dbf2a525d8194b240900e2f",
    "client": {
      "name": "Noah Walker",
      "initials": "NW"
    },
    "email": "noah.walker@example.com",
    "phone": "+1 (682) 912-5304",
    "message": "Need details about concierge services and package delivery systems.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-10T17:52:05.960753"
  },
  {
    "_id": "87a940affccb54eae2d2e5d5",
    "client": {
      "name": "Isabella Lewis",
      "initials": "IL"
    },
    "email": "isabella.lewis@example.com",
    "phone": "+1 (766) 799-5743",
    "message": "Interested in apartments with private balcony and outdoor seating area.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-10T00:05:05.960777"
  },
  {
    "_id": "a35a337f225ddf9bb80375db",
    "client": {
      "name": "James Johnson",
      "initials": "JJ"
    },
    "email": "james.johnson@example.com",
    "phone": "+1 (455) 988-4345",
    "message": "Looking for apartments with home automation and smart lighting systems.",
    "assigned": "BOE1",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-07T19:09:05.960802"
  },
  {
    "_id": "fd5565f53180e99a5b07f743",
    "client": {
      "name": "James Brown",
      "initials": "JB"
    },
    "email": "james.brown@example.com",
    "phone": "+1 (961) 801-3443",
    "message": "Need information about co-working spaces and business center facilities.",
    "assigned": "BOE3",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-09T16:39:05.960828"
  },
  {
    "_id": "8d6510eba899d58974b0ab9c",
    "client": {
      "name": "Ava Lee",
      "initials": "AL"
    },
    "email": "ava.lee@example.com",
    "phone": "+1 (482) 876-3155",
    "message": "Interested in apartments with spa and wellness center access.",
    "assigned": "BOE2",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-07T04:21:05.960853"
  },
  {
    "_id": "c530294a01ecbff20f89cb48",
    "client": {
      "name": "Sophia Rhye",
      "initials": "SR"
    },
    "email": "sophia.rhye@example.com",
    "phone": "+1 (449) 750-6512",
    "message": "Looking for apartments with meditation room and yoga studio facilities.",
    "assigned": "BOE5",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-06T22:39:05.960879"
  },
  {
    "_id": "e9aa600756cc84386fc36f9b",
    "client": {
      "name": "Sophia Davis",
      "initials": "SD"
    },
    "email": "sophia.davis@example.com",
    "phone": "+1 (801) 497-8100",
    "message": "Need details about electric vehicle charging stations and green parking.",
    "assigned": "BOE4",
    "status": "pending",
    "action": "",
    "createdAt": "2025-07-08T21:15:05.960904"
  }
];

const mockUsers: User[] = [
  {
    id: "#U3066",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    assigned: "JS",
    status: "Active",
    verified: true,
    created: "Just now"
  },
  {
    id: "#U3065",
    name: "Sarah Johnson",
    email: "sarah.j@business.com",
    phone: "+1 (555) 987-6543",
    assigned: "SJ",
    status: "Verified",
    verified: true,
    created: "2 hrs ago"
  },
  {
    id: "#U3064",
    name: "Mike Wilson",
    email: "mike.wilson@corp.com",
    phone: "+1 (555) 456-7890",
    assigned: "MW",
    status: "Pending",
    verified: false,
    created: "5 hrs ago"
  },
  {
    id: "#U3063",
    name: "Emily Davis",
    email: "emily.davis@firm.com",
    phone: "+1 (555) 321-0987",
    assigned: "ED",
    status: "Inactive",
    verified: false,
    created: "1 day ago"
  },
  {
    id: "#U3062",
    name: "Robert Brown",
    email: "robert.brown@office.com",
    phone: "+1 (555) 654-3210",
    assigned: "RB",
    status: "Suspended",
    verified: false,
    created: "2 days ago"
  }
];

const mockBackoffice: BackofficeItem[] = [
  {
    id: "#B3066",
    name: "Document Processing",
    email: "admin@processing.com",
    phone: "+1 (555) 111-2222",
    assigned: "DP",
    status: "Completed",
    created: "Just now"
  },
  {
    id: "#B3065",
    name: "Invoice Management",
    email: "invoice@finance.com",
    phone: "+1 (555) 333-4444",
    assigned: "IM",
    status: "In Progress",
    created: "1 hr ago"
  },
  {
    id: "#B3064",
    name: "Data Analysis",
    email: "data@analytics.com",
    phone: "+1 (555) 555-6666",
    assigned: "DA",
    status: "Pending",
    created: "3 hrs ago"
  },
  {
    id: "#B3063",
    name: "Report Generation",
    email: "reports@system.com",
    phone: "+1 (555) 777-8888",
    assigned: "RG",
    status: "On Hold",
    created: "6 hrs ago"
  },
  {
    id: "#B3062",
    name: "System Maintenance",
    email: "maintenance@tech.com",
    phone: "+1 (555) 999-0000",
    assigned: "SM",
    status: "Cancelled",
    created: "Yesterday"
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Leads");
  const [mounted, setMounted] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedBackoffice, setSelectedBackoffice] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState<string | null>(null);
  const [showAssignedDropdown, setShowAssignedDropdown] = useState<string | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState<string | null>(null);
  const [showUserStatusDropdown, setShowUserStatusDropdown] = useState<string | null>(null);
  const [showRequestStatusDropdown, setShowRequestStatusDropdown] = useState<string | null>(null);
  const [leadAssignments, setLeadAssignments] = useState<{[key: string]: string}>({});
  const [leadStatuses, setLeadStatuses] = useState<{[key: string]: string}>({});
  const [userStatuses, setUserStatuses] = useState<{[key: string]: string}>({});
  const [requestStatuses, setRequestStatuses] = useState<{[key: string]: string}>({});
  const [dropdownPositions, setDropdownPositions] = useState<{[key: string]: 'up' | 'down'}>({});

  useEffect(() => {
    setMounted(true);
    // Initialize default assignments and statuses from the actual data
    const defaultAssignments: {[key: string]: string} = {};
    const defaultStatuses: {[key: string]: string} = {};
    const defaultUserStatuses: {[key: string]: string} = {};
    const defaultRequestStatuses: {[key: string]: string} = {};
    const defaultPositions: {[key: string]: 'up' | 'down'} = {};
    
    mockLeads.forEach((lead, index) => {
      // Use the actual assigned value from the data, show "None" if empty
      defaultAssignments[lead._id] = lead.assigned || "None";
      // Use the actual status value from the data, default to "pending" if empty
      defaultStatuses[lead._id] = lead.status || "pending";
      // Set last 4 rows to show dropdown above
      defaultPositions[lead._id] = index >= mockLeads.length - 4 ? 'up' : 'down';
    });

    // Initialize user statuses and request statuses
    mockUsers.forEach((user, index) => {
      defaultUserStatuses[user.id] = user.status;
      defaultRequestStatuses[user.id] = "Pending"; // Default request status
      defaultPositions[user.id] = index >= mockUsers.length - 2 ? 'up' : 'down';
    });
    
    setLeadAssignments(defaultAssignments);
    setLeadStatuses(defaultStatuses);
    setUserStatuses(defaultUserStatuses);
    setRequestStatuses(defaultRequestStatuses);
    setDropdownPositions(defaultPositions);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if click is outside dropdown areas
      if (!target.closest('.dropdown-container')) {
        setShowAssignedDropdown(null);
        setShowStatusDropdown(null);
        setShowUserStatusDropdown(null);
        setShowRequestStatusDropdown(null);
        setShowActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Customer": return "#10b981";
      case "Qualified": return "#f59e0b";
      case "Working": return "#3b82f6";
      case "Contacted": return "#8b5cf6";
      case "Proposal Sent": return "#ef4444";
      case "Active": return "#10b981";
      case "Verified": return "#059669";
      case "Inactive": return "#6b7280";
      case "Pending": return "#f59e0b";
      case "Suspended": return "#ef4444";
      case "Completed": return "#10b981";
      case "In Progress": return "#3b82f6";
      case "On Hold": return "#f59e0b";
      case "Cancelled": return "#ef4444";
      case "pending": return "#f59e0b";
      case "assigned": return "#3b82f6";
      case "completed": return "#10b981";
      case "In porgress": return "#3b82f6"; // Handle typo
      default: return "#6b7280";
    }
  };

  const handleActionClick = (leadId: string, action: string) => {
    console.log(`Action ${action} clicked for lead ${leadId}`);
    setShowActionMenu(null);
    // Handle the action logic here
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(mockLeads.map(lead => lead._id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectLead = (leadId: string) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleAssignmentChange = (leadId: string, assignment: string) => {
    setLeadAssignments(prev => ({ ...prev, [leadId]: assignment }));
    setShowAssignedDropdown(null);
  };

  const handleStatusChange = (leadId: string, status: string) => {
    setLeadStatuses(prev => ({ ...prev, [leadId]: status }));
    setShowStatusDropdown(null);
  };

  const handleAssignmentDropdownClick = (e: React.MouseEvent, leadId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setShowStatusDropdown(null); // Close status dropdown if open
    setShowAssignedDropdown(showAssignedDropdown === leadId ? null : leadId);
  };

  const handleStatusDropdownClick = (e: React.MouseEvent, leadId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAssignedDropdown(null); // Close assigned dropdown if open
    setShowStatusDropdown(showStatusDropdown === leadId ? null : leadId);
  };

  const handleAssignmentChangeWithEvent = (e: React.MouseEvent, leadId: string, assignment: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLeadAssignments(prev => ({ ...prev, [leadId]: assignment }));
    setShowAssignedDropdown(null);
  };

  const handleStatusChangeWithEvent = (e: React.MouseEvent, leadId: string, status: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLeadStatuses(prev => ({ ...prev, [leadId]: status }));
    setShowStatusDropdown(null);
  };

  const handleUserStatusDropdownClick = (e: React.MouseEvent, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRequestStatusDropdown(null); // Close request status dropdown if open
    setShowUserStatusDropdown(showUserStatusDropdown === userId ? null : userId);
  };

  const handleRequestStatusDropdownClick = (e: React.MouseEvent, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setShowUserStatusDropdown(null); // Close user status dropdown if open
    setShowRequestStatusDropdown(showRequestStatusDropdown === userId ? null : userId);
  };

  const handleUserStatusChangeWithEvent = (e: React.MouseEvent, userId: string, status: string) => {
    e.preventDefault();
    e.stopPropagation();
    setUserStatuses(prev => ({ ...prev, [userId]: status }));
    setShowUserStatusDropdown(null);
  };

  const handleRequestStatusChangeWithEvent = (e: React.MouseEvent, userId: string, status: string) => {
    e.preventDefault();
    e.stopPropagation();
    setRequestStatuses(prev => ({ ...prev, [userId]: status }));
    setShowRequestStatusDropdown(null);
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleActionIconClick = (leadId: string, action: string) => {
    console.log(`${action} action for lead ${leadId}`);
    // Implement specific action logic here
  };

  const handleSelectAllUsers = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(mockUsers.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAllBackoffice = () => {
    if (selectAll) {
      setSelectedBackoffice([]);
    } else {
      setSelectedBackoffice(mockBackoffice.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBackoffice = (itemId: string) => {
    if (selectedBackoffice.includes(itemId)) {
      setSelectedBackoffice(selectedBackoffice.filter(id => id !== itemId));
    } else {
      setSelectedBackoffice([...selectedBackoffice, itemId]);
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const renderLeadsTab = () => (
    <div className={styles.leadsContainer}>
      <div className={styles.leadsHeader}>
        <div className={styles.headerLeft}>
          <h2>Leads Management</h2>
          <p>Organize leads and track their progress effectively here</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn}>
            Export
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>LEADS (LAST 30 DAYS)</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#3b82f6' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>1,200</div>
          <div className={styles.statSubLine}>
          <div>
            <span className={styles.statSubLabel}>This Week: </span>
            <span className={styles.statSubValue}>320</span>
          </div>
          <div>
            <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>Total Leads: </span> 
            <span className={styles.statSubValue}>1,200</span>
          </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>PENDING</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#f59e0b' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>600</div>
          <div className={styles.statSubLine}>
            <div>
            <span className={styles.statSubLabel}>This Week: </span> 
            <span className={styles.statSubValue}>150</span>
            </div>
            <div>
            <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>This Month: </span>
            <span className={styles.statSubValue}>450</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>ASSIGNED</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#10b981' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>1,100</div>
          <div className={styles.statSubLine}>
            <div>
            <span className={styles.statSubLabel}>This Week: </span>
            <span className={styles.statSubValue}>275</span>
            </div>
            <div>
            <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>This Month: </span>
            <span className={styles.statSubValue}>825</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>REJECTED</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#ef4444' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>100</div>
          <div className={styles.statSubLine}>
            <div>
            <span className={styles.statSubLabel}>This Week: </span>
            <span className={styles.statSubValue}>15</span>
            </div>
            <div>
            <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>This Month: </span>
            <span className={styles.statSubValue}>85</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
          <button className={styles.bulkBtn}>Bulk Actions</button>
        </div>
        <div className={styles.rightControls}>
          <input type="text" placeholder="Search text" className={styles.searchInput} />
          <button className={styles.searchBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button className={styles.filterBtn}>⚙ Filter</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Lead ID</th>
              <th>Client</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockLeads.map((lead) => (
              <tr key={lead._id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => handleSelectLead(lead._id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>{lead._id}</td>
                <td className={styles.customerCell}>
                  <div className={styles.avatar}>{lead.client.initials}</div>
                  {lead.client.name}
                </td>
                <td 
                  className={styles.emailCell}
                  onClick={() => handleEmailClick(lead.email)}
                  style={{ cursor: 'pointer', color: '#2563eb' }}
                >
                  {lead.email}
                </td>
                <td 
                  onClick={() => handlePhoneClick(lead.phone)}
                  style={{ cursor: 'pointer', color: '#2563eb' }}
                >
                  {lead.phone}
                </td>
                <td>
                  <button
                    onClick={() => setShowMessagePopup(lead._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563eb',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontSize: '0.875rem'
                    }}
                  >
                    Message text
                  </button>
                </td>
                <td>
                  <div style={{ position: 'relative' }} className="dropdown-container">
                    <button
                      onClick={(e) => handleAssignmentDropdownClick(e, lead._id)}
                      className={styles.dropdownButton}
                      style={{
                        color: leadAssignments[lead._id] === 'BOE1' ? '#3b82f6' : 
                               leadAssignments[lead._id] === 'BOE2' ? '#10b981' :
                               leadAssignments[lead._id] === 'BOE3' ? '#f59e0b' :
                               leadAssignments[lead._id] === 'BOE4' ? '#8b5cf6' : 
                               leadAssignments[lead._id] === 'BOE5' ? '#ef4444' : '#6b7280'
                      }}
                    >
                      {leadAssignments[lead._id] || 'None'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </button>
                    {showAssignedDropdown === lead._id && (
                      <div className={`${styles.modernDropdown} ${dropdownPositions[lead._id] === 'up' ? styles.dropdownUp : ''}`}>
                        <div className={`${styles.dropdownArrowUp} ${dropdownPositions[lead._id] === 'up' ? styles.arrowDown : ''}`}></div>
                        {['None', 'BOE1', 'BOE2', 'BOE3', 'BOE4', 'BOE5'].map((option, index) => (
                          <button
                            key={option}
                            className={styles.modernDropdownItem}
                            onClick={(e) => handleAssignmentChangeWithEvent(e, lead._id, option)}
                            style={{
                              color: option === 'BOE1' ? '#3b82f6' : 
                                     option === 'BOE2' ? '#10b981' :
                                     option === 'BOE3' ? '#f59e0b' :
                                     option === 'BOE4' ? '#8b5cf6' : 
                                     option === 'BOE5' ? '#ef4444' : '#6b7280'
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div style={{ position: 'relative' }} className="dropdown-container">
                    <button
                      onClick={(e) => handleStatusDropdownClick(e, lead._id)}
                      className={styles.dropdownButton}
                      style={{
                        color: getStatusColor(leadStatuses[lead._id] || 'pending')
                      }}
                    >
                      {leadStatuses[lead._id] || 'pending'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </button>
                    {showStatusDropdown === lead._id && (
                      <div className={`${styles.modernDropdown} ${dropdownPositions[lead._id] === 'up' ? styles.dropdownUp : ''}`}>
                        <div className={`${styles.dropdownArrowUp} ${dropdownPositions[lead._id] === 'up' ? styles.arrowDown : ''}`}></div>
                        {['pending', 'assigned', 'completed'].map(option => (
                          <button
                            key={option}
                            className={styles.modernDropdownItem}
                            onClick={(e) => handleStatusChangeWithEvent(e, lead._id, option)}
                            style={{
                              color: getStatusColor(option)
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>{formatDate(lead.createdAt)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleActionIconClick(lead._id, 'download')}
                      className={styles.actionIcon}
                      style={{ color: '#10b981' }}
                      title="Download"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleActionIconClick(lead._id, 'delete')}
                      className={styles.actionIcon}
                      style={{ color: '#ef4444' }}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleActionIconClick(lead._id, 'view')}
                      className={styles.actionIcon}
                      style={{ color: '#3b82f6' }}
                      title="View"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles.paginationBtn}>← Previous</button>
        <div className={styles.pageNumbers}>
          <span className={styles.activePage}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <button className={styles.paginationBtn}>Next →</button>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className={styles.leadsContainer}>
      <div className={styles.leadsHeader}>
        <div className={styles.headerLeft}>
          <h2>Users Management</h2>
          <p>Manage user accounts, permissions, and access levels</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn}>
            Export
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.statsContainerCentered}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>USERS</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#3b82f6' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>45</div>
          <div className={styles.statSubLine}>
            <div>
              <span className={styles.statSubLabel}>New Today: </span>
              <span className={styles.statSubValue}>23</span>
            </div>
            <div>
              <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>Last 30 days: </span> 
              <span className={styles.statSubValue}>42</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>SUSPENDED</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#ef4444' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>12</div>
          <div className={styles.statSubLine}>
            <div>
              <span className={styles.statSubLabel}>Today: </span>
              <span className={styles.statSubValue}>2</span>
            </div>
            <div>
              <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>Last 30 days: </span>
              <span className={styles.statSubValue}>7</span>
            </div>
            </div>
          </div>
        </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
          <button className={styles.bulkBtn}>Bulk Actions</button>
        </div>
        <div className={styles.rightControls}>
          <input type="text" placeholder="Search text" className={styles.searchInput} />
          <button className={styles.searchBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
              </svg>
          </button>
          <button className={styles.filterBtn}>⚙ Filter</button>
            </div>
          </div>

      <div className={styles.tableContainer}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAllUsers}
                  className={styles.checkbox}
                />
              </th>
              <th>Verified</th>
              <th>User ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Request Status</th>
              <th>Created ↑</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>
                  {user.verified ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10b981' }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ef4444' }}>
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  )}
                </td>
                <td>{user.id}</td>
                <td className={styles.customerCell}>
                  <div className={styles.avatar}>{user.assigned}</div>
                  {user.name}
                </td>
                <td 
                  className={styles.emailCell}
                  onClick={() => handleEmailClick(user.email)}
                  style={{ cursor: 'pointer', color: '#2563eb' }}
                >
                  {user.email}
                </td>
                <td 
                  onClick={() => handlePhoneClick(user.phone)}
                  style={{ cursor: 'pointer', color: '#2563eb' }}
                >
                  {user.phone}
                </td>
                <td>
                  <div style={{ position: 'relative' }} className="dropdown-container">
                    <button
                      onClick={(e) => handleUserStatusDropdownClick(e, user.id)}
                      className={styles.dropdownButton}
                      style={{
                        color: getStatusColor(userStatuses[user.id] || user.status)
                      }}
                    >
                      {userStatuses[user.id] || user.status}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </button>
                    {showUserStatusDropdown === user.id && (
                      <div className={`${styles.modernDropdown} ${dropdownPositions[user.id] === 'up' ? styles.dropdownUp : ''}`}>
                        <div className={`${styles.dropdownArrowUp} ${dropdownPositions[user.id] === 'up' ? styles.arrowDown : ''}`}></div>
                        {['Active', 'Inactive', 'Suspended'].map(option => (
                          <button
                            key={option}
                            className={styles.modernDropdownItem}
                            onClick={(e) => handleUserStatusChangeWithEvent(e, user.id, option)}
                            style={{
                              color: getStatusColor(option)
                            }}
                          >
                            {option}
                          </button>
                        ))}
            </div>
                    )}
            </div>
                </td>
                <td>
                  <div style={{ position: 'relative' }} className="dropdown-container">
                    <button
                      onClick={(e) => handleRequestStatusDropdownClick(e, user.id)}
                      className={styles.dropdownButton}
                      style={{
                        color: getStatusColor(requestStatuses[user.id] || "Pending")
                      }}
                    >
                      {requestStatuses[user.id] || "Pending"}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </button>
                    {showRequestStatusDropdown === user.id && (
                      <div className={`${styles.modernDropdown} ${dropdownPositions[user.id] === 'up' ? styles.dropdownUp : ''}`}>
                        <div className={`${styles.dropdownArrowUp} ${dropdownPositions[user.id] === 'up' ? styles.arrowDown : ''}`}></div>
                        {['Pending', 'In Progress', 'Completed'].map(option => (
                          <button
                            key={option}
                            className={styles.modernDropdownItem}
                            onClick={(e) => handleRequestStatusChangeWithEvent(e, user.id, option)}
                            style={{
                              color: getStatusColor(option)
                            }}
                          >
                            {option}
                          </button>
                        ))}
          </div>
                    )}
                  </div>
                </td>
                <td>{user.created}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleActionIconClick(user.id, 'view')}
                      className={styles.actionIcon}
                      style={{ color: '#3b82f6' }}
                      title="View"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleActionIconClick(user.id, 'edit')}
                      className={styles.actionIcon}
                      style={{ color: '#f59e0b' }}
                      title="Edit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleActionIconClick(user.id, 'delete')}
                      className={styles.actionIcon}
                      style={{ color: '#ef4444' }}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      <div className={styles.pagination} style={{display: 'none'}}>
        <button className={styles.paginationBtn}>← Previous</button>
        <div className={styles.pageNumbers}>
          <span className={styles.activePage}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <button className={styles.paginationBtn}>Next →</button>
      </div>
    </div>
  );

  const renderBackofficeTab = () => (
    <div className={styles.leadsContainer}>
      <div className={styles.leadsHeader}>
        <div className={styles.headerLeft}>
          <h2>Backoffice Management</h2>
          <p>Manage backoffice executives and their assignments</p>
        </div>
        <div className={styles.headerRight}>
        </div>
      </div>

      <div className={styles.statsContainerCentered}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Backoffice Executives</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#3b82f6' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>5</div>
          <div className={styles.statSubLine}>
            <div>
              <span className={styles.statSubLabel}>Slots: </span>
              <span className={styles.statSubValue}>5</span>
            </div>
            <div>
              <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>Empty Slots: </span> 
              <span className={styles.statSubValue}>0</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
          <button className={styles.bulkBtn}>Bulk Actions</button>
          <button className={styles.bulkBtn}>Add Backoffice executive</button>
        </div>
        <div className={styles.rightControls}>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAllUsers}
                  className={styles.checkbox}
                />
              </th>
              <th>Verified</th>
              <th>User ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Created ↑</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>
                  {user.verified ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10b981' }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ef4444' }}>
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  )}
                </td>
                <td>{user.id}</td>
                <td className={styles.customerCell}>
                  <div className={styles.avatar}>{user.assigned}</div>
                  {user.name}
                </td>
                <td 
                  className={styles.emailCell}
                  onClick={() => handleEmailClick(user.email)}
                  style={{ cursor: 'pointer', color: '#2563eb' }}
                  >
                  {user.email}
                </td>
                <td>{user.created}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleActionIconClick(user.id, 'view')}
                      className={styles.actionIcon}
                      style={{ color: '#3b82f6' }}
                      title="View"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleActionIconClick(user.id, 'edit')}
                      className={styles.actionIcon}
                      style={{ color: '#f59e0b' }}
                      title="Edit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleActionIconClick(user.id, 'delete')}
                      className={styles.actionIcon}
                      style={{ color: '#ef4444' }}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination} style={{display: 'none'}}>
        <button className={styles.paginationBtn}>← Previous</button>
        <div className={styles.pageNumbers}>
          <span className={styles.activePage}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <button className={styles.paginationBtn}>Next →</button>
      </div>
    </div>
  );

  const renderBackofficeExecutivesTab = () => (
    <div className={styles.leadsContainer}>
      <div className={styles.leadsHeader}>
        <div className={styles.headerLeft}>
          <h2>Backoffice Executives</h2>
          <p>Manage executive tasks and high-priority operations</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn}>
            Export
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.statsContainer} style={{ display: 'none' }}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>LEADS (LAST 30 DAYS)</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#3b82f6' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>1,200</div>
          <div className={styles.statSubLine}>
            <div>
            <span className={styles.statSubLabel}>This Week: </span>
            <span className={styles.statSubValue}>320</span>
            </div>
            <div>
            <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>Total Leads: </span> 
            <span className={styles.statSubValue}>1,200</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>PENDING</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#f59e0b' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>600</div>
          <div className={styles.statSubLine}>
            <div>
            <span className={styles.statSubLabel}>This Week: </span> 
            <span className={styles.statSubValue}>150</span>
            </div>
            <div>
            <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>This Month: </span>
            <span className={styles.statSubValue}>450</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>ASSIGNED</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#10b981' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>1,100</div>
          <div className={styles.statSubLine}>
            <div>
              <span className={styles.statSubLabel}>This Week: </span>
            <span className={styles.statSubValue}>275</span>
            </div>
            <div>
              <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>This Month: </span>
            <span className={styles.statSubValue}>825</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>REJECTED</span>
            <div className={styles.statIcon} style={{ backgroundColor: '#ef4444' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
          </div>
          <div className={styles.statMainValue}>100</div>
          <div className={styles.statSubLine}>
            <div>
            <span className={styles.statSubLabel}>This Week: </span>
            <span className={styles.statSubValue}>15</span>
            </div>
            <div>
            <span className={styles.statSubLabel} style={{ marginLeft: '24px' }}>This Month: </span>
            <span className={styles.statSubValue}>85</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
          <button className={styles.bulkBtn}>Bulk Actions</button>
        </div>
        <div className={styles.rightControls}>
          <input type="text" placeholder="Search text" className={styles.searchInput} />
          <button className={styles.searchBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button className={styles.filterBtn}>⚙ Filter</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Lead ID</th>
              <th>Client</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Assigned</th>
              <th>Takeover</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockLeads.map((lead) => (
              <tr key={lead._id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => handleSelectLead(lead._id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>{lead._id}</td>
                <td className={styles.customerCell}>
                  <div className={styles.avatar}>{lead.client.initials}</div>
                  {lead.client.name}
                </td>
                <td 
                  className={styles.emailCell}
                  onClick={() => handleEmailClick(lead.email)}
                  style={{ cursor: 'pointer', color: '#2563eb' }}
                >
                  {lead.email}
                </td>
                <td 
                  onClick={() => handlePhoneClick(lead.phone)}
                  style={{ cursor: 'pointer', color: '#2563eb' }}
                >
                  {lead.phone}
                </td>
                <td>
                    <button
                    onClick={() => setShowMessagePopup(lead._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563eb',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontSize: '0.875rem'
                    }}
                  >
                    Message text
                  </button>
                </td>
                <td>
                  <span style={{
                    color: leadAssignments[lead._id] === 'BOE1' ? '#3b82f6' : 
                           leadAssignments[lead._id] === 'BOE2' ? '#10b981' :
                           leadAssignments[lead._id] === 'BOE3' ? '#f59e0b' :
                           leadAssignments[lead._id] === 'BOE4' ? '#8b5cf6' : 
                           leadAssignments[lead._id] === 'BOE5' ? '#ef4444' : '#6b7280'
                  }}>
                    {leadAssignments[lead._id] || 'None'}
                  </span>
                </td>
                <td>
                    <button
                    onClick={() => handleActionIconClick(lead._id, 'takeover')}
                    className={styles.bulkBtn}
                    style={{
                      background: 'white',
                      border: '1px solid #d1d5db',
                      color: '#374151',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      padding: '6px 12px',
                      borderRadius: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    Takeover
                    </button>
                </td>
                <td>{formatDate(lead.createdAt)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleActionIconClick(lead._id, 'download')}
                      className={styles.actionIcon}
                      style={{ color: '#10b981' }}
                      title="Download"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleActionIconClick(lead._id, 'delete')}
                      className={styles.actionIcon}
                      style={{ color: '#ef4444' }}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleActionIconClick(lead._id, 'view')}
                      className={styles.actionIcon}
                      style={{ color: '#3b82f6' }}
                      title="View"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button className={styles.paginationBtn}>← Previous</button>
        <div className={styles.pageNumbers}>
          <span className={styles.activePage}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <button className={styles.paginationBtn}>Next →</button>
      </div>
    </div>
  );


  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <div className={styles.profileSection}>
          <div className={styles.profileIcon}>
            👤
          </div>
          <div className={styles.profileName}>Admin User</div>
          <div className={styles.profileEmail}>admin@company.com</div>
          <div className={styles.profileButtons}>
            <Link href="/" className={styles.profileBtn}>
              🏠 Home
            </Link>
            <button 
              className={`${styles.profileBtn} ${styles.logoutBtn}`}
              onClick={() => setShowAuthPopup(true)}
            >
              🚪 Logout
            </button>
          </div>
        </div>
        <nav className={styles.nav}>
          {(["Leads", "Users", "Backoffice", "Backoffice Executives"] as Tab[]).map((tab) => (
            <button
              key={tab}
              className={`${styles.navItem} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            <button
              className={`${styles.navItem} ${activeTab === "users" ? styles.active : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.content}>
        {activeTab === "Leads" && renderLeadsTab()}
        {activeTab === "Users" && renderUsersTab()}
        {activeTab === "Backoffice" && renderBackofficeTab()}
        {activeTab === "Backoffice Executives" && renderBackofficeExecutivesTab()}
      </div>

      <AuthManager 
        isOpen={showAuthPopup} 
        onClose={() => setShowAuthPopup(false)} 
      />

      {/* Message Popup */}
      {showMessagePopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowMessagePopup(null)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Message</h3>
              <button
                onClick={() => setShowMessagePopup(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ lineHeight: '1.6', color: '#374151' }}>
              {mockLeads.find(lead => lead._id === showMessagePopup)?.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}