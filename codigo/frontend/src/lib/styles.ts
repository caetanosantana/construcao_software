export const BADGE_STYLES = {
  education: {
    color: "#9A3412", // orange-800
    background: "#FFF0DF",
    border: "#FED7AA", // orange-200
  },
  knowledge: {
    color: "#155E9D",
    background: "#CFFAFE",
    border: "#A5F3FC",
  },
  hability: {
    color: "#6C27AB",
    background: "#F3E8FF",
    border: "#E9D5FF",
  },
  pending_approval: {
    color: "#1F2937", // gray-800
    background: "#F3F4F6", // gray-100
    border: "#D1D5DB", // gray-300
  },
  approved: {
    color: "#047857", // emerald-800
    background: "#ECFDF5", // emerald-100
    border: "#A7F3D0", // emerald-200
  },
  rejected: {
    color: "#B91C1C", // red-800
    background: "#FEF2F2", // red-100
    border: "#FCA5A5", // red-200
  },
};

export type BadgeStyles = keyof typeof BADGE_STYLES;

export const getQuestionBadgeStyle = (badge: BadgeStyles) => {
  const style = BADGE_STYLES[badge];
  return {
    backgroundColor: style.background,
    borderColor: style.border,
    color: style.color,
  };
};