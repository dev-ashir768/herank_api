import { prisma } from "../src/config/db";

async function main() {
  console.log("Cleaning up existing CMS data...");
  await prisma.seoMeta.deleteMany();
  await prisma.heroSection.deleteMany();
  await prisma.clientLogosSection.deleteMany();
  await prisma.clientLogo.deleteMany();
  await prisma.serviceItem.deleteMany();
  await prisma.servicesSection.deleteMany();
  await prisma.featureItem.deleteMany();
  await prisma.featuresSection.deleteMany();
  await prisma.statItem.deleteMany();
  await prisma.statsSection.deleteMany();
  await prisma.testimonialItem.deleteMany();
  await prisma.testimonialsSection.deleteMany();
  await prisma.pricingPlan.deleteMany();
  await prisma.pricingSection.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.blogSection.deleteMany();
  await prisma.ctaSection.deleteMany();
  await prisma.contactSection.deleteMany();
  await prisma.footerMenuLink.deleteMany();
  await prisma.footerSocialLink.deleteMany();
  await prisma.footerSection.deleteMany();
  await prisma.workingHoursSection.deleteMany();
  await prisma.inquiryFormSection.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.faqSection.deleteMany();
  await prisma.socialMediaSection.deleteMany();

  console.log("Seeding Home Page CMS...");

  // 1. Home Hero
  await prisma.heroSection.create({
    data: {
      pageIdentifier: "home",
      heroTitle: "Build your next big thing with Herank",
      heroSubtitle: "Powerful Backend CMS Solutions",
      heroDescription: "Scale your agency with our optimized, modular backend services. Built for speed, security, and developer happiness.",
      heroPrimaryButtonLabel: "Get Started",
      heroPrimaryButtonLink: "/sign-up",
      heroSecondaryButtonLabel: "View Demo",
      heroSecondaryButtonLink: "/demo",
      heroTrustedByText: "Trusted by 500+ global brands",
      seoMeta: {
        create: {
          seoTitle: "Herank | Premium Backend Agency CMS",
          seoDescription: "The most scalable backend CMS for modern agencies.",
          seoKeywords: "CMS, Backend, Prisma, Express, TypeScript"
        }
      }
    }
  });

  // 2. Services (Home)
  await prisma.servicesSection.create({
    data: {
      pageIdentifier: "home",
      servicesSectionTitle: "Our Core Services",
      servicesSectionSubtitle: "What we do best",
      services: {
        create: [
          {
            serviceTitle: "API Development",
            serviceDescription: "Fast, secure, and well-documented RESTful APIs.",
            serviceIcon: "api-icon-url"
          },
          {
            serviceTitle: "Database Design",
            serviceDescription: "Scalable PostgreSQL schemas with Prisma ORM.",
            serviceIcon: "db-icon-url"
          },
          {
            serviceTitle: "CMS Integration",
            serviceDescription: "Modular CMS fields tailored to your specific needs.",
            serviceIcon: "cms-icon-url"
          }
        ]
      }
    }
  });

  // 3. Blog (Home)
  await prisma.blogSection.create({
    data: {
      pageIdentifier: "home",
      blogSectionTitle: "Latest Insights",
      blogSectionDescription: "Stay updated with our latest news and technical articles.",
      posts: {
        create: [
          {
            blogPostTitle: "The Future of Headless CMS",
            blogPostSlug: "future-of-headless-cms",
            blogPostExcerpt: "Explore how API-first CMS architectures are taking over...",
            blogPostAuthor: "John Doe",
            blogPostDate: new Date()
          },
          {
            blogPostTitle: "Scaling Prisma in Production",
            blogPostSlug: "scaling-prisma",
            blogPostExcerpt: "Best practices for database performance at scale...",
            blogPostAuthor: "Jane Smith",
            blogPostDate: new Date()
          }
        ]
      }
    }
  });

  console.log("Seeding Contact Page CMS...");

  // 4. Contact Hero
  await prisma.heroSection.create({
    data: {
      pageIdentifier: "contact",
      heroTitle: "Let's Connect",
      heroSubtitle: "Contact Us",
      heroDescription: "Have a project in mind? Or just want to say hi? Reach out to us through any of the channels below.",
      heroBackgroundImage: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107",
      seoMeta: {
        create: {
          seoTitle: "Contact Us | Herank",
          seoDescription: "Reach out to the Herank team for inquiries and support.",
        }
      }
    }
  });

  // 5. Contact Info
  await prisma.contactSection.create({
    data: {
      pageIdentifier: "contact",
      contactSectionTitle: "Our Headquarters",
      contactSectionDescription: "Visit us at our main office or drop us a line.",
      contactEmail: "hello@herank.com",
      contactPhone: "+1 (555) 000-1234",
      contactWhatsapp: "+15550001234",
      contactAddress: "123 Tech Avenue, Silicon Valley, CA 94025",
      contactCity: "Menlo Park",
      contactCountry: "USA",
      contactMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.63929062!2d-122.1459163!3d37.48437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbc9a!2sSilicon%20Valley!5e0!3m2!1sen!2sus!4v123456789",
    }
  });

  // 6. Working Hours
  await prisma.workingHoursSection.create({
    data: {
      pageIdentifier: "contact",
      workingHoursTitle: "Office Hours",
      workingHours: "Monday - Friday: 9:00 AM - 6:00 PM (PST)\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed",
      supportHours: "24/7 Priority Support for Enterprise Clients"
    }
  });

  // 7. Inquiry Form
  await prisma.inquiryFormSection.create({
    data: {
      pageIdentifier: "contact",
      formTitle: "Start a Conversation",
      formDescription: "Please fill out the form below and we'll get back to you within 24 hours.",
      servicesDropdown: ["Web Development", "App Development", "SEO Strategy", "Cloud Infrastructure"],
      formButtonLabel: "Send Message",
      formSuccessMessage: "Got it! We'll be in touch soon.",
      formErrorMessage: "Oops, something went wrong. Please try again or email us directly."
    }
  });

  // 8. FAQ (Contact Page context)
  await prisma.faqSection.create({
    data: {
      pageIdentifier: "contact",
      faqSectionTitle: "Frequently Asked Questions",
      items: {
        create: [
          {
            faqQuestion: "How long does a typical project take?",
            faqAnswer: "Most projects take between 4-8 weeks depending on complexity."
          },
          {
            faqQuestion: "Do you offer maintenance plans?",
            faqAnswer: "Yes, we have monthly support packages for security updates and features."
          },
          {
            faqQuestion: "Can I migrate my existing site?",
            faqAnswer: "Absolutely, we specialize in seamless migrations from legacy systems."
          }
        ]
      }
    }
  });

  // 9. Social Media
  await prisma.socialMediaSection.create({
    data: {
      pageIdentifier: "contact",
      socialFacebookUrl: "https://facebook.com/herank",
      socialInstagramUrl: "https://instagram.com/herank",
      socialLinkedinUrl: "https://linkedin.com/company/herank",
      socialYoutubeUrl: "https://youtube.com/c/herank"
    }
  });

  console.log("Seeding complete! 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
