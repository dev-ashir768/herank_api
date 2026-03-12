import { Router } from "express";
import { cmsController } from "../controllers/cms.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  HeroSectionSchema,
  ClientLogosSectionSchema,
  ServicesSectionSchema,
  FeaturesSectionSchema,
  StatsSectionSchema,
  TestimonialsSectionSchema,
  PricingSectionSchema,
  BlogSectionSchema,
  CtaSectionSchema,
  ContactSectionSchema,
  FooterSectionSchema,
  WorkingHoursSectionSchema,
  InquiryFormSectionSchema,
  FaqSectionSchema,
  SocialMediaSectionSchema,
} from "../schemas/cms.schema";

const router = Router();

// Helper to configure routes for a specific section
const setupCrudRoutes = (
  path: string,
  controller: any,
  validationSchema: any,
) => {
  router.get(path, controller.getAll);
  router.get(`${path}/:id`, controller.getById);
  router.post(path, validate(validationSchema), controller.create);
  router.put(
    `${path}/:id`,
    validate(validationSchema.partial()),
    controller.update,
  );
  router.delete(`${path}/:id`, controller.delete);
};

// 1. Hero Section
setupCrudRoutes("/hero", cmsController.hero, HeroSectionSchema);

// 2. Client Logos Section
setupCrudRoutes(
  "/client-logos",
  cmsController.clientLogos,
  ClientLogosSectionSchema,
);

// 3. Services Section
setupCrudRoutes("/services", cmsController.services, ServicesSectionSchema);

// 4. Features Section
setupCrudRoutes("/features", cmsController.features, FeaturesSectionSchema);

// 5. Stats Section
setupCrudRoutes("/stats", cmsController.stats, StatsSectionSchema);

// 6. Testimonials Section
setupCrudRoutes(
  "/testimonials",
  cmsController.testimonials,
  TestimonialsSectionSchema,
);

// 7. Pricing Section
setupCrudRoutes("/pricing", cmsController.pricing, PricingSectionSchema);

// 8. Blog Section
setupCrudRoutes("/blog", cmsController.blog, BlogSectionSchema);

// 9. CTA Section
setupCrudRoutes("/cta", cmsController.cta, CtaSectionSchema);

// 10. Contact Section
setupCrudRoutes("/contact", cmsController.contact, ContactSectionSchema);

// 11. Footer Section
setupCrudRoutes("/footer", cmsController.footer, FooterSectionSchema);

// -------------------------------------------------------------
// Contact Page Specific Routes
// -------------------------------------------------------------

// 12. Working Hours Section
setupCrudRoutes("/working-hours", cmsController.workingHours, WorkingHoursSectionSchema);

// 13. Inquiry Form Section
setupCrudRoutes("/inquiry-form", cmsController.inquiryForm, InquiryFormSectionSchema);

// 14. FAQ Section
setupCrudRoutes("/faq", cmsController.faq, FaqSectionSchema);

// 15. Social Media Section
setupCrudRoutes("/social-media", cmsController.socialMedia, SocialMediaSectionSchema);

export default router;
