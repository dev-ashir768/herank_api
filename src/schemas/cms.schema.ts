import { z } from "zod";

export const SeoMetaSchema = z.object({
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
  seoKeywords: z.string().optional(),
  seoCanonicalUrl: z.string().url().optional().or(z.literal("")),
  seoMetaImage: z.string().optional(),
  seoRobots: z.string().optional(),
  seoSchema: z.any().optional(), // JSON
  openGraphTitle: z.string().optional(),
  openGraphDescription: z.string().optional(),
  openGraphImage: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
});

// -------------------------------------------------------------
// 1. Hero Section
// -------------------------------------------------------------
export const HeroSectionSchema = z.object({
  heroTitle: z.string().min(1, "Title is required"),
  heroSubtitle: z.string().optional(),
  heroDescription: z.string().min(1, "Description is required"),
  heroBackgroundImage: z.string().optional(),
  heroPrimaryButtonLabel: z.string().optional(),
  heroPrimaryButtonLink: z.string().optional(),
  heroSecondaryButtonLabel: z.string().optional(),
  heroSecondaryButtonLink: z.string().optional(),
  heroTrustedByText: z.string().optional(),
  heroTrustedLogos: z.array(z.string()).optional(),
  heroVideo: z.string().optional(),
  heroAnimation: z.string().optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateHeroSectionInput = z.infer<typeof HeroSectionSchema>;

// -------------------------------------------------------------
// 2. Client Logos Section
// -------------------------------------------------------------
export const ClientLogoSchema = z.object({
  logoImage: z.string().min(1, "Logo image is required"),
  logoLink: z.string().optional(),
});

export const ClientLogosSectionSchema = z.object({
  clientsSectionTitle: z.string().min(1, "Title is required"),
  clientsDescription: z.string().optional(),
  logos: z.array(ClientLogoSchema).optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateClientLogosSectionInput = z.infer<
  typeof ClientLogosSectionSchema
>;

// -------------------------------------------------------------
// 3. Services Section
// -------------------------------------------------------------
export const ServiceItemSchema = z.object({
  serviceTitle: z.string().min(1, "Service title is required"),
  serviceDescription: z.string().min(1, "Description is required"),
  serviceIcon: z.string().optional(),
  serviceImage: z.string().optional(),
  serviceLink: z.string().optional(),
});

export const ServicesSectionSchema = z.object({
  servicesSectionTitle: z.string().min(1, "Title is required"),
  servicesSectionSubtitle: z.string().optional(),
  services: z.array(ServiceItemSchema).optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateServicesSectionInput = z.infer<typeof ServicesSectionSchema>;

// -------------------------------------------------------------
// 4. Features Section
// -------------------------------------------------------------
export const FeatureItemSchema = z.object({
  featureTitle: z.string().min(1, "Feature title is required"),
  featureDescription: z.string().min(1, "Description is required"),
  featureIcon: z.string().optional(),
  featureImage: z.string().optional(),
  featureCtaLabel: z.string().optional(),
  featureCtaLink: z.string().optional(),
});

export const FeaturesSectionSchema = z.object({
  featuresSectionTitle: z.string().min(1, "Title is required"),
  featuresSectionSubtitle: z.string().optional(),
  features: z.array(FeatureItemSchema).optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateFeaturesSectionInput = z.infer<typeof FeaturesSectionSchema>;

// -------------------------------------------------------------
// 5. Agency Statistics Section
// -------------------------------------------------------------
export const StatItemSchema = z.object({
  statNumber: z.string().min(1, "Stat number is required"),
  statLabel: z.string().min(1, "Stat label is required"),
  statIcon: z.string().optional(),
});

export const StatsSectionSchema = z.object({
  statsSectionTitle: z.string().min(1, "Title is required"),
  stats: z.array(StatItemSchema).optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateStatsSectionInput = z.infer<typeof StatsSectionSchema>;

// -------------------------------------------------------------
// 6. Testimonials Section
// -------------------------------------------------------------
export const TestimonialItemSchema = z.object({
  testimonialName: z.string().min(1, "Name is required"),
  testimonialCompany: z.string().optional(),
  testimonialPosition: z.string().optional(),
  testimonialReview: z.string().min(1, "Review is required"),
  testimonialRating: z.number().min(1).max(5).optional(),
  testimonialImage: z.string().optional(),
});

export const TestimonialsSectionSchema = z.object({
  testimonialsSectionTitle: z.string().min(1, "Title is required"),
  testimonials: z.array(TestimonialItemSchema).optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateTestimonialsSectionInput = z.infer<
  typeof TestimonialsSectionSchema
>;

// -------------------------------------------------------------
// 7. Pricing Section
// -------------------------------------------------------------
export const PricingPlanSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  planPrice: z.string().min(1, "Plan price is required"),
  planDescription: z.string().optional(),
  planFeatures: z.array(z.string()).optional(),
  planCtaLabel: z.string().optional(),
  planCtaLink: z.string().optional(),
  planPopularBadge: z.boolean().optional(),
});

export const PricingSectionSchema = z.object({
  pricingSectionTitle: z.string().min(1, "Title is required"),
  plans: z.array(PricingPlanSchema).optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreatePricingSectionInput = z.infer<typeof PricingSectionSchema>;

// -------------------------------------------------------------
// 8. Blog Section
// -------------------------------------------------------------
export const BlogPostSchema = z.object({
  blogPostTitle: z.string().min(1, "Title is required"),
  blogPostExcerpt: z.string().optional(),
  blogPostImage: z.string().optional(),
  blogPostSlug: z.string().min(1, "Slug is required"),
  blogPostAuthor: z.string().optional(),
  blogPostDate: z.string().datetime().optional().or(z.date().optional()),
});

export const BlogSectionSchema = z.object({
  blogSectionTitle: z.string().min(1, "Title is required"),
  blogSectionDescription: z.string().optional(),
  posts: z.array(BlogPostSchema).optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateBlogSectionInput = z.infer<typeof BlogSectionSchema>;

// -------------------------------------------------------------
// 9. CTA Section
// -------------------------------------------------------------
export const CtaSectionSchema = z.object({
  ctaSectionTitle: z.string().min(1, "Title is required"),
  ctaSectionDescription: z.string().optional(),
  ctaButtonLabel: z.string().optional(),
  ctaButtonLink: z.string().optional(),
  ctaBackgroundImage: z.string().optional(),
  ctaFormEnabled: z.boolean().optional(),
  ctaFormFields: z.any().optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateCtaSectionInput = z.infer<typeof CtaSectionSchema>;

// -------------------------------------------------------------
// 10. Contact Section
// -------------------------------------------------------------
export const ContactSectionSchema = z.object({
  contactSectionTitle: z.string().min(1, "Title is required"),
  contactSectionDescription: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  contactAddress: z.string().optional(),
  contactCity: z.string().optional(),
  contactCountry: z.string().optional(),
  contactMapEmbedUrl: z.string().url().optional().or(z.literal("")),
  contactForm: z.string().optional(),
  contactFormFields: z.any().optional(),
  pageIdentifier: z.string().optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateContactSectionInput = z.infer<typeof ContactSectionSchema>;

// -------------------------------------------------------------
// 11. Footer Section
// -------------------------------------------------------------
export const FooterMenuLinkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  url: z.string().min(1, "URL is required"),
});

export const FooterSocialLinkSchema = z.object({
  icon: z.string().min(1, "Icon is required"),
  url: z.string().min(1, "URL is required"),
});

export const FooterSectionSchema = z.object({
  footerLogo: z.string().optional(),
  footerDescription: z.string().optional(),
  footerCopyright: z.string().optional(),
  footerPrivacyPolicyLink: z.string().optional(),
  footerTermsLink: z.string().optional(),
  footerNewsletterEnabled: z.boolean().optional(),
  footerNewsletterTitle: z.string().optional(),
  menuLinks: z.array(FooterMenuLinkSchema).optional(),
  socialLinks: z.array(FooterSocialLinkSchema).optional(),
  pageIdentifier: z.string().optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateFooterSectionInput = z.infer<typeof FooterSectionSchema>;

// -------------------------------------------------------------
// NEW: Working Hours Section
// -------------------------------------------------------------
export const WorkingHoursSectionSchema = z.object({
  workingHoursTitle: z.string().min(1, "Title is required"),
  workingHours: z.string().min(1, "Hours are required"),
  supportHours: z.string().optional(),
  pageIdentifier: z.string().optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateWorkingHoursSectionInput = z.infer<typeof WorkingHoursSectionSchema>;

// -------------------------------------------------------------
// NEW: Inquiry Form Section
// -------------------------------------------------------------
export const InquiryFormSectionSchema = z.object({
  formTitle: z.string().min(1, "Form title is required"),
  formDescription: z.string().optional(),
  servicesDropdown: z.array(z.string()).optional(),
  formButtonLabel: z.string().optional(),
  formSuccessMessage: z.string().optional(),
  formErrorMessage: z.string().optional(),
  pageIdentifier: z.string().optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateInquiryFormSectionInput = z.infer<typeof InquiryFormSectionSchema>;

// -------------------------------------------------------------
// NEW: FAQ Section
// -------------------------------------------------------------
export const FaqItemSchema = z.object({
  faqQuestion: z.string().min(1, "Question is required"),
  faqAnswer: z.string().min(1, "Answer is required"),
});

export const FaqSectionSchema = z.object({
  faqSectionTitle: z.string().min(1, "Title is required"),
  items: z.array(FaqItemSchema).optional(),
  pageIdentifier: z.string().optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateFaqSectionInput = z.infer<typeof FaqSectionSchema>;

// -------------------------------------------------------------
// NEW: Social Media Links Section
// -------------------------------------------------------------
export const SocialMediaSectionSchema = z.object({
  socialFacebookUrl: z.string().url().optional().or(z.literal("")),
  socialInstagramUrl: z.string().url().optional().or(z.literal("")),
  socialLinkedinUrl: z.string().url().optional().or(z.literal("")),
  socialTiktokUrl: z.string().url().optional().or(z.literal("")),
  socialYoutubeUrl: z.string().url().optional().or(z.literal("")),
  pageIdentifier: z.string().optional(),
  seoMeta: SeoMetaSchema.optional(),
});

export type CreateSocialMediaSectionInput = z.infer<typeof SocialMediaSectionSchema>;
