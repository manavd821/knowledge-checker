import { 
    AI_STRICTNESS,
    DIFFICULTY,
    DOMAIN,
    ROLE,
    ROLE_LEVEL,
    SESSION_DURATIONS,
    SESSION_TYPE, 
    TOPIC_TYPE,
} from "@/db/enums";
import { 
    Bot, 
    Code, 
    LucideIcon, 
    User, 
    Users,
    Briefcase,
    Scale,
    Sparkles,
    GraduationCap,
} from "lucide-react";
import { FormFieldRole, Step } from "@/react/session-form/session-form.types";

export const steps : Step[] = [
    { 
        id : 1,  
        name : "Session Details",
        title: "Session Details",
        description: "Choose the type and subject of your AI interview session.",
    },
    { 
        id : 2,  
        name : "Configuration",
        title: "Session Configuration",
        description : "Fine-tune how the AI conducts and evaluates your session.",
    },
    { 
        id : 3,  
        name : "Context",
        title: "Additional Context",
        description: "Give the AI more context to personalize your experience."
    },
    { 
        id : 4,  
        name : "Review & Create",
        title: "Review & Create",
        description: "Confirm your session configuration before submitting.",
    },
];

export const MIME_TO_FILE_TYPE = {
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "text/plain": "txt",
    "text/markdown": "md",
} as const;

export const SESSION_TYPE_META : Record<
    typeof SESSION_TYPE[number],
    {
        description: string;
        Icon: LucideIcon;
        label: string;
    }
> = {
    ai_session : {
        description: "Practice with AI interviewer",
        Icon : Bot,
        label : "AI"
    },
    human_session : {
        description : "Invite another person",
        Icon : User,
        label: "Human"
    }
};
export const ROLE_META: Record<
  FormFieldRole,
  {
    label: string;
    description: string;
    icon: LucideIcon;
  }
> = {
  candidate : {
    label: "Candidate",
    description: "I am being interviewed",
    icon : GraduationCap,
  },
  interviewer: {
    label: "Interviewer",
    description : "I am conducting the interview",
    icon: Briefcase,
  },
}
export const TOPIC_TYPE_META : Record<
    typeof TOPIC_TYPE[number] ,
    {
        label: string;
        description: string;
        icon: LucideIcon;
    }
> = {
    technical: {
        label: "Technical",
        description: "Coding, DSA & System Design.",
        icon: Code,
    },
    behavioral: {
        label: "Behavioral",
        description: "Communication & leadership questions.",
        icon: Users,
    },
    mock_interview: {
        label: "Mock Interview",
        description: "Real interview simulation.",
        icon: Briefcase,
    },
    debate: {
        label: "Debate",
        description: "Structured discussions.",
        icon: Scale,
    },
    custom: {
        label: "Custom",
        description: "Create your own session.",
        icon: Sparkles,
    },
}

export const DOMAIN_META: Record<
  typeof DOMAIN[number],
  {
    label: string;
    description: string;
  }
> = {
  swe: {
    label: "Software Engineering",
    description: "Frontend, Backend, Full Stack & System Design",
  },
  data_science: {
    label: "Data Science & ML",
    description: "Machine Learning, AI, Analytics & Data Engineering",
  },
  devops: {
    label: "DevOps & Cloud",
    description: "CI/CD, Docker, Kubernetes & Cloud Platforms",
  },
  product: {
    label: "Product Management",
    description: "Product Strategy, Roadmaps & Execution",
  },
  custom: {
    label: "Custom",
    description: "Choose your own domain or specialization",
  },
};

export const ROLE_LEVEL_META: Record<
  typeof ROLE_LEVEL[number],
  {
    label: string;
    description: string;
  }
> = {
  beginner: {
    label: "Beginner",
    description: "0–1 years of experience",
  },
  intermediate: {
    label: "Intermediate",
    description: "1–3 years of experience",
  },
  senior: {
    label: "Advanced",
    description: "3–5 years of experience",
  },
  experienced: {
    label: "Expert",
    description: "5+ years of experience",
  },
};

export const DIFFICULTY_META: Record<
  typeof DIFFICULTY[number],
  {
    label: string;
    description: string;
  }
> = {
  easy: {
    label: "Easy",
    description: "Basic concepts and introductory questions",
  },
  medium: {
    label: "Medium",
    description: "Typical interview-level difficulty",
  },
  hard: {
    label: "Hard",
    description: "Advanced concepts and challenging problems",
  },
  expert: {
    label: "Expert",
    description: "Senior-level and highly complex questions",
  },
};
export const AI_STRICTNESS_META: Record<
  typeof AI_STRICTNESS[number],
  {
    label: string;
    description: string;
  }
> = {
  lenient: {
    label: "Lenient",
    description: "Supportive feedback with generous evaluation",
  },
  balanced: {
    label: "Balanced",
    description: "Realistic interview experience",
  },
  strict: {
    label: "Strict",
    description: "Higher expectations with tougher evaluation",
  },
  ultra_strict: {
    label: "Ultra Strict",
    description: "Simulates highly competitive interviews",
  },
};

export const SESSION_DURATION_LABELS: Record<
  typeof SESSION_DURATIONS[number],
  string
> = {
  15: "15 minutes",
  20: "20 minutes",
  30: "30 minutes",
  45: "45 minutes",
  60: "1 hour",
  90: "1 hour 30 minutes",
  120: "2 hours",
};

export const SESSION_FEATURE_LABELS = {
  realtime_transcript: "Realtime Transcript",
  ai_hints_enabled: "AI Hints",
  camera_required: "Camera Required",
} as const;