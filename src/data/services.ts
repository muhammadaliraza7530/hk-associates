export type Service = {
  slug: string;
  title: string;
  short: string;
  tag: string;
  img: string;
  intro: string;
  highlights: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "designing",
    title: "Designing",
    short: "Designing",
    tag: "Design",
    img: "/images/svc-designing.jpg",
    intro:
      "Building construction design — creating detailed plans and specifications for buildings. Architectural, structural and engineering elements combined for safety, functionality and aesthetics using modern 3D modelling and sustainable practices.",
    highlights: [
      "Architectural concept & site analysis",
      "Floor planning and 3D modelling",
      "Structural & MEP coordination",
      "Building code compliance",
    ],
  },
  {
    slug: "interior-designing",
    title: "Interior Designing",
    short: "Interior",
    tag: "Interior",
    img: "/images/svc-interior.jpg",
    intro:
      "Enhancing interior spaces to be healthier and more aesthetically pleasing. Selection of furnishings, colors, lighting and materials, with emphasis on ergonomics, acoustics and spatial planning.",
    highlights: [
      "Space planning & mood boards",
      "Custom furniture & finishes",
      "Lighting & acoustics",
      "Sustainable materials",
    ],
  },
  {
    slug: "landscaping",
    title: "Landscaping",
    short: "Landscaping",
    tag: "Outdoor",
    img: "/images/svc-side.jpg",
    intro:
      "Designing and arranging outdoor spaces around a structure — gardens, lawns, walkways and water features — for aesthetic appeal, recreation and ecological benefit.",
    highlights: [
      "Garden & lawn design",
      "Hardscape & walkways",
      "Water features",
      "Efficient irrigation",
    ],
  },
  {
    slug: "renovation",
    title: "Renovation",
    short: "Renovation",
    tag: "Upgrade",
    img: "/images/about-1.jpg",
    intro:
      "Updating, improving or restoring an existing structure — from minor cosmetic upgrades to extensive structural modifications — with eco-friendly materials and improved energy efficiency.",
    highlights: [
      "Structural repairs",
      "Electrical, plumbing & HVAC upgrades",
      "Interior & exterior modernisation",
      "Energy-efficiency retrofits",
    ],
  },
  {
    slug: "construction",
    title: "Construction",
    short: "Construction",
    tag: "Build",
    img: "/images/svc-construction.jpg",
    intro:
      "End-to-end building construction — design, site preparation, foundation, structural framing and finishing — delivered by architects, engineers and contractors to meet codes, budgets and timelines.",
    highlights: [
      "Foundation & structural framing",
      "Finishing & MEP",
      "Quality control on site",
      "Timeline & budget control",
    ],
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    short: "Maintenance",
    tag: "Care",
    img: "/images/svc-side.jpg",
    intro:
      "Regular inspection, repair and upkeep of a structure — cleaning, HVAC servicing, plumbing and electrical repairs — to extend the building's lifespan and avoid costly emergency repairs.",
    highlights: [
      "Preventive maintenance",
      "HVAC, plumbing & electrical",
      "Painting & finishes",
      "Corrective repairs",
    ],
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s] as const),
);