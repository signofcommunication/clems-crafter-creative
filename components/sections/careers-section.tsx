"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, MapPin, Clock, Calendar, ChevronRight } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

const mockJobs: Job[] = [
  // {
  //   id: "1",
  //   title: "Senior UI/UX Designer",
  //   department: "Design",
  //   location: "Jakarta, Indonesia",
  //   type: "Full-time",
  //   posted: "2 days ago",
  //   description:
  //     "We're looking for a talented Senior UI/UX Designer to join our creative team. You'll be responsible for creating beautiful, intuitive user experiences for our clients across web and mobile platforms.",
  //   responsibilities: [
  //     "Lead the design process from concept to final implementation",
  //     "Create wireframes, prototypes, and high-fidelity mockups",
  //     "Collaborate with developers to ensure design feasibility",
  //     "Conduct user research and usability testing",
  //     "Maintain and evolve our design system",
  //   ],
  //   requirements: [
  //     "5+ years of experience in UI/UX design",
  //     "Strong portfolio showcasing web and mobile designs",
  //     "Proficiency in Figma, Adobe Creative Suite",
  //     "Understanding of responsive design principles",
  //     "Excellent communication and presentation skills",
  //   ],
  //   benefits: [
  //     "Competitive salary and performance bonuses",
  //     "Health insurance coverage",
  //     "Flexible working hours",
  //     "Professional development budget",
  //     "Modern office in central Jakarta",
  //   ],
  // },
  // {
  //   id: "2",
  //   title: "Frontend Developer",
  //   department: "Engineering",
  //   location: "Jakarta, Indonesia",
  //   type: "Full-time",
  //   posted: "1 week ago",
  //   description:
  //     "Join our engineering team as a Frontend Developer. You'll work on cutting-edge web applications using modern technologies like React, Next.js, and TypeScript.",
  //   responsibilities: [
  //     "Build responsive and performant web applications",
  //     "Implement pixel-perfect designs from Figma",
  //     "Write clean, maintainable, and tested code",
  //     "Collaborate with designers and backend developers",
  //     "Optimize applications for maximum speed and scalability",
  //   ],
  //   requirements: [
  //     "3+ years of experience with React and Next.js",
  //     "Strong knowledge of TypeScript, HTML, CSS",
  //     "Experience with state management (Zustand, Redux)",
  //     "Familiarity with modern build tools and workflows",
  //     "Understanding of SEO and web performance best practices",
  //   ],
  //   benefits: [
  //     "Competitive salary package",
  //     "Health and dental insurance",
  //     "Remote work options",
  //     "Learning and development opportunities",
  //     "Annual team retreats",
  //   ],
  // },
  // {
  //   id: "3",
  //   title: "Digital Marketing Specialist",
  //   department: "Marketing",
  //   location: "Jakarta, Indonesia",
  //   type: "Full-time",
  //   posted: "3 days ago",
  //   description:
  //     "We're seeking a creative Digital Marketing Specialist to help our clients grow their online presence. You'll develop and execute marketing strategies across multiple digital channels.",
  //   responsibilities: [
  //     "Develop and implement digital marketing campaigns",
  //     "Manage social media accounts and content calendars",
  //     "Analyze campaign performance and provide insights",
  //     "Create engaging content for various platforms",
  //     "Collaborate with design and content teams",
  //   ],
  //   requirements: [
  //     "2+ years of digital marketing experience",
  //     "Strong understanding of SEO, SEM, and social media",
  //     "Experience with Google Analytics and advertising platforms",
  //     "Excellent copywriting and content creation skills",
  //     "Data-driven mindset with analytical skills",
  //   ],
  //   benefits: [
  //     "Competitive compensation",
  //     "Health insurance",
  //     "Flexible schedule",
  //     "Creative work environment",
  //     "Performance bonuses",
  //   ],
  // },
  // {
  //   id: "4",
  //   title: "Motion Graphics Designer",
  //   department: "Design",
  //   location: "Jakarta, Indonesia",
  //   type: "Contract",
  //   posted: "5 days ago",
  //   description:
  //     "We're looking for a talented Motion Graphics Designer to create stunning animations and video content for our clients' digital campaigns and brand stories.",
  //   responsibilities: [
  //     "Create engaging motion graphics and animations",
  //     "Develop brand videos and social media content",
  //     "Collaborate with the creative team on concepts",
  //     "Edit and post-produce video content",
  //     "Stay updated with motion design trends",
  //   ],
  //   requirements: [
  //     "3+ years of motion graphics experience",
  //     "Proficiency in After Effects, Premiere Pro",
  //     "Strong understanding of animation principles",
  //     "Portfolio showcasing motion design work",
  //     "Ability to work under tight deadlines",
  //   ],
  //   benefits: [
  //     "Flexible contract terms",
  //     "Competitive hourly rate",
  //     "Creative freedom",
  //     "Collaborative team environment",
  //     "Portfolio-building opportunities",
  //   ],
  // },
  // {
  //   id: "5",
  //   title: "Project Manager",
  //   department: "Operations",
  //   location: "Jakarta, Indonesia",
  //   type: "Full-time",
  //   posted: "1 week ago",
  //   description:
  //     "Join us as a Project Manager to oversee digital projects from conception to delivery. You'll be the bridge between clients, designers, and developers.",
  //   responsibilities: [
  //     "Manage multiple projects simultaneously",
  //     "Coordinate with cross-functional teams",
  //     "Develop project timelines and budgets",
  //     "Communicate with clients and stakeholders",
  //     "Ensure projects are delivered on time and within scope",
  //   ],
  //   requirements: [
  //     "4+ years of project management experience",
  //     "Experience in digital agency or tech environment",
  //     "Strong organizational and leadership skills",
  //     "Familiarity with project management tools (Asana, Jira)",
  //     "Excellent client-facing and communication skills",
  //   ],
  //   benefits: [
  //     "Competitive salary",
  //     "Health insurance",
  //     "Work-life balance",
  //     "Leadership development programs",
  //     "Annual performance reviews",
  //   ],
  // },
  // {
  //   id: "6",
  //   title: "Content Writer",
  //   department: "Content",
  //   location: "Remote",
  //   type: "Part-time",
  //   posted: "4 days ago",
  //   description:
  //     "We're seeking a creative Content Writer to craft compelling copy for websites, blogs, social media, and marketing materials for our diverse client base.",
  //   responsibilities: [
  //     "Write engaging content for digital platforms",
  //     "Develop content strategies for clients",
  //     "Research industry trends and topics",
  //     "Edit and proofread content",
  //     "Optimize content for SEO",
  //   ],
  //   requirements: [
  //     "2+ years of content writing experience",
  //     "Strong portfolio of published work",
  //     "Excellent command of English (Bahasa Indonesia is a plus)",
  //     "Understanding of SEO best practices",
  //     "Ability to adapt tone and style for different brands",
  //   ],
  //   benefits: [
  //     "Flexible remote work",
  //     "Competitive freelance rates",
  //     "Diverse projects",
  //     "Collaborative team",
  //     "Growth opportunities",
  //   ],
  // },
];

export function CareersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const handleApply = () => {
    // In a real application, this would navigate to an application form
    window.location.href = `mailto:careers@clemsgrafter.com?subject=Application for ${selectedJob?.title}`;
  };

  return (
    <>
      <section
        ref={ref}
        className="relative w-full bg-background px-6 py-24 sm:px-8 lg:px-12"
      >
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-96"
          style={{
            background:
              "radial-gradient(140% 120% at 50% 0%, color-mix(in oklch, var(--accent) 15%, transparent) 0%, color-mix(in oklch, var(--chart-3) 10%, transparent) 45%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div className="mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-16"
          >
            {/* Header */}
            <div className="max-w-3xl space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight text-foreground"
              >
                Join Our Creative Team
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
              >
                We're always looking for talented individuals who are passionate
                about design, technology, and creating exceptional digital
                experiences. Explore our open positions and become part of our
                story.
              </motion.p>
            </div>            {/* Jobs Grid */}
            {mockJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                className="my-16"
              >
                <Card className="max-w-3xl mx-auto text-center bg-card/30 border-dashed">
                  <CardContent className="py-16 px-6 space-y-6">
                    <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Briefcase className="size-10 text-accent" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-light text-foreground">
                        No Open Positions At The Moment
                      </h3>
                      <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
                        We don't have any job openings right now, but we're always interested in meeting talented people. Feel free to send us your portfolio and we'll keep you in mind for future opportunities.
                      </p>
                    </div>
                    <div className="pt-4">
                      <Button
                        size="lg"
                        onClick={() => window.location.href = 'mailto:careers@clemsgrafter.com?subject=Future Opportunities'}
                        className="gap-2"
                      >
                        Send Your Portfolio
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {mockJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Card
                    className="h-full cursor-pointer transition-all hover:shadow-lg hover:border-accent/50 group"
                    onClick={() => handleJobClick(job)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge
                          variant={
                            job.type === "Full-time" ? "default" : "outline"
                          }
                        >
                          {job.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {job.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        Posted {job.posted}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-accent pt-2 group-hover:gap-3 transition-all">
                        View Details
                        <ChevronRight className="size-4" />
                      </div>
                    </CardContent>                  </Card>
                </motion.div>
              ))}
            </motion.div>
            )}

            {/* Culture Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
              className="mt-24 space-y-12"
            >
              <div className="max-w-3xl space-y-6">
                <h2 className="text-4xl sm:text-5xl font-light leading-tight text-foreground">
                  Why Join Us?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Clems Grafter Creative, we believe in fostering a culture
                  of creativity, collaboration, and continuous growth. We're
                  more than just a team—we're a family of passionate creators.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Creative Freedom",
                    description:
                      "We encourage innovation and give you the space to explore new ideas and push creative boundaries.",
                  },
                  {
                    title: "Growth & Learning",
                    description:
                      "Continuous learning opportunities, workshops, and access to the latest tools and technologies.",
                  },
                  {
                    title: "Work-Life Balance",
                    description:
                      "Flexible schedules and remote work options to help you maintain a healthy work-life balance.",
                  },
                  {
                    title: "Collaborative Culture",
                    description:
                      "Work with talented professionals in a supportive environment that values teamwork.",
                  },
                  {
                    title: "Competitive Benefits",
                    description:
                      "Comprehensive benefits package including health insurance, performance bonuses, and more.",
                  },
                  {
                    title: "Impactful Work",
                    description:
                      "Work on diverse projects for leading brands and make a real impact in the digital space.",
                  },
                ].map((benefit, index) => (
                  <Card key={index} className="bg-card/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Job Detail Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{selectedJob.department}</Badge>
                    <Badge
                      variant={
                        selectedJob.type === "Full-time" ? "default" : "outline"
                      }
                    >
                      {selectedJob.type}
                    </Badge>
                  </div>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl">
                  {selectedJob.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedJob.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Job Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4 text-muted-foreground" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="size-4 text-muted-foreground" />
                    <span>{selectedJob.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span>Posted {selectedJob.posted}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="size-4 text-muted-foreground" />
                    <span>{selectedJob.department} Department</span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((item, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((item, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">What We Offer</h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((item, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={handleApply}
                    className="flex-1 sm:flex-none"
                    size="lg"
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    size="lg"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
