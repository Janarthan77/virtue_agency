"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Mic, Briefcase, Music, LayoutGrid, ArrowRight, Eye } from "lucide-react";
import EventDetailsModal, { EventItem } from "@/components/EventDetailsModal";

export const eventsData: EventItem[] = [
  {
    id: 1,
    title: "10TH SOUTHERN HOG(HARLEY OWNERS GROUP) RALLY",
    category: "Automotive",
    subtitle: "Harley Owners Group",
    date: "15",
    month: "FEB",
    time: "10:00am – 04:00pm",
    location: "Mahindra World City, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-7.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-8.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-9.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-10.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-11.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-12.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-13.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-14.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-15.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-16.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-17.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-18.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-19.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-20.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-21.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-22.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-23.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-24.webp",
    ],
    description: "The 10th Southern H.O.G. Rally was a roaring success, bringing together over 500 Harley Owners Group riders from across South India. The event transformed Mahindra World City into a biker's paradise with dynamic stunt shows, custom bike displays, live bands, and thrilling group rides.",
    highlights: ["500+ Harley Owners Group Riders", "360-Degree Stunt Shows", "Custom Bike Displays", "Live Bands & DJs", "Group Rides Across Chennai"],
  },
  {
    id: 2,
    title: "TVS Emerald – Home Debut",
    category: "Product Launch",
    subtitle: "Peninsula & Green Enclave Launch",
    date: "22",
    month: "AUG",
    time: "09:00am – 06:00pm",
    location: "TVS Emerald, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-7.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-8.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-9.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-10.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-11.webp",
    ],
    description: "Grand property unveiling and sales launch for TVS Emerald's ultra-luxury Peninsula & Green Enclave project. Built interactive architectural model zones, high-lumen experiential projection walkthroughs, and VIP lounge pavilions.",
    highlights: ["Interactive Experience Pavilion", "3D Projection Mapping", "VIP Investor Hospitality", "Over 800 Exclusive Buyer Registrations"],
  },
  {
    id: 3,
    title: "Radiant Dental Care Employees Day Outing & Annual Day - 2024",
    category: "Corporate",
    subtitle: "Jones Lang LaSalle",
    date: "05",
    month: "SEP",
    time: "08:00am – 08:00pm",
    location: "Taj Fisherman's Cove",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-7.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp"
    ],
    description: "An invigorating coastal retreat and leadership team-building event for Jones Lang LaSalle at Taj Fisherman's Cove. Features curated team games, beachside gala dinners, live acoustic sets, and award ceremonies.",
    highlights: ["Custom Team-Building Activities", "Seaside Sunset Dinner", "Live Band & DJ Setup", "Bespoke Corporate Awards"],
  },
  {
    id: 4,
    title: "Madarase Fashion Talent Hunt",
    category: "Entertainment",
    subtitle: "Phoenix Marketcity Chennai",
    date: "12",
    month: "OCT",
    time: "18:00pm – 23:00pm",
    location: "Phoenix Marketcity",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-5.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-7.webp",
    ],
    description: "High-octane fashion runway competition showcasing emerging regional designers and models. Executed 40-foot illuminated catwalk, dynamic intelligent LED rigging, celebrity green rooms, and live broadcast production.",
    highlights: ["40-Foot LED Runway", "Celebrity Jury Coordination", "Over 2,500 Spectators", "Live HD Streaming"],
  },
  {
    id: 5,
    title: "SAVE A CHILD MARATHON - SAVEETHA ECO PUPIL SCHOOL- EKAM NGO",
    category: "Corporate",
    subtitle: "Saveetha Eco Pupil School",
    date: "26",
    month: "JULY",
    time: "05:00am – 10:00am",
    location: "Saveetha Eco Pupil School",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-7.webp",
    ],
    description: "The region's premier conference covering AI, enterprise cloud systems, and cutting-edge innovations. Designed multiple track breakout stages, digital registration kiosks, and VIP speaker lounges.",
    highlights: ["3 Multi-Track Keynote Stages", "1,500+ Tech Professionals", "Expo Exhibition Booths", "Digital Networking App Integration"],
  },
  {
    id: 6,
    title: "BNI B REGION AUDI CHENNAI CONFERENCE MEETING - 2024",
    category: "Corporate",
    subtitle: "CONFERENCE MEETING",
    date: "17",
    month: "DEC",
    time: "09:00am – 02:00pm",
    location: "Audi Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-5.webp",
    ],
    description: "A high-energy business summit at Audi Chennai, blending premium networking with strategic industry insights. Executed custom stage builds, VIP hospitality suites, and closed-door executive sessions.",
    highlights: ["Central Audi Showroom Ambiance", "Exclusive Executive Networking Lounge", "Closed-Door Strategy Roundtables", "Curated VIP Gala Dinner Experience"],
  },
  {
    id: 7,
    title: "BNP Paribas Middle Office Annual Bash",
    category: "Corporate",
    subtitle: "",
    date: "28",
    month: "AUG",
    time: "18:00pm – 23:00pm",
    location: "The Leela Palace, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-7.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-8.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-9.webp",
    ],
    description: "An opulent corporate celebration at The Leela Palace, Chennai with tailored table stylings, live jazz ensembles, and crystal illumination.",
    highlights: ["LED Ceiling Projection", "Live Jazz Performance", "Awards Conferment", "Gourmet Dinner", "3D Floor Mapping"],
  },
  {
    id: 8,
    title: "NYE BEACH 2025",
    category: "Entertainment",
    subtitle: "FORTUNE BEACH RESORT",
    date: "31",
    month: "DEC",
    time: "18:00pm – 01:00am",
    location: "Fortune Beach Resort,ECR",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-7.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-8.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-9.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-10.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-11.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-12.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-13.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-14.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-15.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-16.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-17.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-18.webp",
    ],
    description: "Open-air music festival supporting homegrown indie talent with line-array concert sound, custom truss stage design, food truck villages, and crowd safety control.",
    highlights: ["Line-Array Concert Acoustic Array", "Food Truck Village Management", "Over 4,000 Fans", "Special FX Fireworks"],
  },
  {
    id: 9,
    title: "WELONA HEALTHCARE - FAMILY DAY - R & R",
    category: "Corporate",
    subtitle: "Family Day Celebration",
    date: "21",
    month: "JUN",
    time: "03:00pm – 10:00pm",
    location: "Illusion - Neelankarai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Welona%20Healthcare%20Family%20Day/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Welona%20Healthcare%20Family%20Day/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Welona%20Healthcare%20Family%20Day/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Welona%20Healthcare%20Family%20Day/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Welona%20Healthcare%20Family%20Day/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Welona%20Healthcare%20Family%20Day/image-5.webp",
    ],
    description: "Venture pitch arena uniting 50 emerging founders with tier-1 angel investors and venture capitalists. Handled lightning demo timings, live polling systems, and private deal rooms.",
    highlights: ["50 Pitching Startups", "Private Investor Lounges", "Live Pitch Scoring Display", "B2B Deal-Making Sessions"],
  },
  {
    id: 10,
    title: "HARLEY DAVIDSON MOTORCYCLES DISPLAY AT VARIOUS PLACES",
    category: "Product Launch",
    subtitle: "Display & Awareness Campaign",
    date: "02",
    month: "NOV",
    time: "10:00am – 09:00pm",
    location: "Various Locations",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-7.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-8.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-9.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-10.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-11.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-12.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-13.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-14.webp",
    ],
    description: "Next-gen EV two-wheeler launch with indoor test ride arena, interactive charging pod simulation, and key influencer media interactions.",
    highlights: ["Indoor Test-Track Arena", "Dynamic Vehicle Reveal", "Press Q&A Forum", "Instant Booking Kiosks"],
  },
  {
    id: 11,
    title: "OTHER CORPORATE EVENTS",
    category: "Corporate",
    subtitle: "Corporate Events",
    date: "02",
    month: "NOV",
    time: "10:00am – 09:00pm",
    location: "Various Locations",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-7.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-8.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Other%20Events/image-9.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Eat%20Pray%20Love%20-%20SPP%20Gardens/image-1.webp",
    ],
    description: "Next-gen EV two-wheeler launch with indoor test ride arena, interactive charging pod simulation, and key influencer media interactions.",
    highlights: ["Indoor Test-Track Arena", "Dynamic Vehicle Reveal", "Press Q&A Forum", "Instant Booking Kiosks"],
  },
];

const categories = [
  { id: "All", name: "All Events", icon: LayoutGrid },
  { id: "Corporate", name: "Corporate Event", icon: Briefcase },
  { id: "Product Launch", name: "Product Launch", icon: Mic },
  { id: "Entertainment", name: "Entertainment", icon: Music },
];

const categoryMeta: Record<string, { color: string; bg: string }> = {
  Corporate: { color: "#FFB800", bg: "rgba(255,184,0,0.12)" },
  "Product Launch": { color: "#CBD5E1", bg: "rgba(255,255,255,0.12)" },
  Entertainment: { color: "#34d399", bg: "rgba(52,211,153,0.12)" },
};

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const itemsPerPage = 6;

  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId);
      setCurrentPage(1);
    });
  };

  const filteredEvents =
    activeTab === "All" ? eventsData : eventsData.filter((e) => e.category === activeTab);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-[#0F172A] py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFFFFF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FFB800]/4 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Section Header ─────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#FFB800]" />
              <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase">
                Virtue IN Events
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Events We&apos;ve <span className="text-[#FFB800]">Managed</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105 self-start lg:self-auto shrink-0"
            style={{
              background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)",
              boxShadow: "0 8px 25px -8px rgba(255,255,255,0.5)",
            }}
          >
            View All Events <ArrowRight size={16} />
          </Link>
        </div>

        {/* ── Filter Tabs ─────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #FFFFFF, #E2E8F0)"
                    : "rgba(30,41,59,0.8)",
                  color: isActive ? "#111827" : "#94a3b8",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isActive ? "0 4px 20px rgba(255,255,255,0.35)" : "none",
                }}
              >
                <Icon size={14} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* ── Event Cards Grid ─────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px]"
          style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.2s" }}
        >
          {currentEvents.map((event) => {
            const meta = categoryMeta[event.category] || categoryMeta["Corporate"];
            return (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group bg-[#1E293B] rounded-2xl overflow-hidden border border-white/[0.07] hover:border-[#FFFFFF]/35 hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.25)] transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={14} /> View Photos & Details
                    </span>
                  </div>

                  {/* Date badge */}
                  <div
                    className="absolute top-4 left-4 w-14 h-14 rounded-xl flex flex-col items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)" }}
                  >
                    <span className="text-gray-900 text-xl font-black leading-none">{event.date}</span>
                    <span className="text-gray-600 text-[9px] font-black tracking-widest uppercase mt-0.5">{event.month}</span>
                  </div>

                  {/* Category tag */}
                  <div className="absolute top-4 right-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur-sm"
                      style={{
                        background: "rgba(15,23,42,0.7)",
                        color: meta.color,
                        border: `1px solid ${meta.color}40`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="capitalize text-white font-black text-lg leading-tight mb-1 group-hover:text-[#FFB800] transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="capitalize text-sm font-semibold mb-5" style={{ color: meta.color }}>
                    {event.subtitle}
                  </p>

                  <div className="space-y-2.5 mb-6 flex-1">
                    <div className="flex items-center gap-2.5 text-sm text-gray-400">
                      <div className="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center shrink-0">
                        <Clock size={13} className="text-[#FFB800]" />
                      </div>
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-400">
                      <div className="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center shrink-0">
                        <MapPin size={13} className="text-[#FFB800]" />
                      </div>
                      {event.location}
                    </div>
                  </div>

                  {/* View Details Button triggers popup modal */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-3 text-left self-start cursor-pointer"
                    style={{ color: meta.color }}
                  >
                    VIEW DETAILS <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Pagination ───────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-14">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                onClick={() => startTransition(() => setCurrentPage(i + 1))}
                key={i}
                className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background:
                    currentPage === i + 1
                      ? "linear-gradient(135deg, #FFFFFF, #E2E8F0)"
                      : "rgba(30,41,59,0.8)",
                  color: currentPage === i + 1 ? "#111827" : "#94a3b8",
                  border: currentPage === i + 1 ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: currentPage === i + 1 ? "0 4px 20px rgba(255,255,255,0.4)" : "none",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* ── Event Details Slider Pop-Up Modal ──────────────────────── */}
      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
