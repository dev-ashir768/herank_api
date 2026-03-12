import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { cmsService } from "../services/cms.service";
import { ApiRes } from "../utils/apiResponse.util";
import { ApiResponse } from "../types";

// Factory to dynamically generate CRUD controller methods for any CMS module
const makeController = (
  modelName: string,
  methods: {
    getMany: string;
    getOne: string;
    create: string;
    update: string;
    del: string;
  },
) => {
  const service = cmsService as any;

  return {
    getAll: asyncHandler(async (_req: Request, res: Response<ApiResponse>) => {
      const data = await service[methods.getMany]();
      ApiRes.success(res, `${modelName} fetched successfully`, data);
    }),

    getById: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
      const id = Number(req.params.id);
      const data = await service[methods.getOne](id);
      if (!data) {
        throw new Error(`${modelName} not found`);
      }
      ApiRes.success(res, `${modelName} fetched successfully`, data);
    }),

    create: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
      const data = await service[methods.create](req.body);
      ApiRes.success(res, `${modelName} created successfully`, data, 201);
    }),

    update: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
      const id = Number(req.params.id);
      const data = await service[methods.update](id, req.body);
      ApiRes.success(res, `${modelName} updated successfully`, data);
    }),

    delete: asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
      const id = Number(req.params.id);
      await service[methods.del](id);
      ApiRes.success(res, `${modelName} deleted successfully`, null);
    }),
  };
};

// Export all the configured controllers for each section
export const cmsController = {
  hero: makeController("Hero Section", {
    getMany: "getHeroSections",
    getOne: "getHeroSectionById",
    create: "createHeroSection",
    update: "updateHeroSection",
    del: "deleteHeroSection",
  }),
  clientLogos: makeController("Client Logos Section", {
    getMany: "getClientLogosSections",
    getOne: "getClientLogosSectionById",
    create: "createClientLogosSection",
    update: "updateClientLogosSection",
    del: "deleteClientLogosSection",
  }),
  services: makeController("Services Section", {
    getMany: "getServicesSections",
    getOne: "getServicesSectionById",
    create: "createServicesSection",
    update: "updateServicesSection",
    del: "deleteServicesSection",
  }),
  features: makeController("Features Section", {
    getMany: "getFeaturesSections",
    getOne: "getFeaturesSectionById",
    create: "createFeaturesSection",
    update: "updateFeaturesSection",
    del: "deleteFeaturesSection",
  }),
  stats: makeController("Statistics Section", {
    getMany: "getStatsSections",
    getOne: "getStatsSectionById",
    create: "createStatsSection",
    update: "updateStatsSection",
    del: "deleteStatsSection",
  }),
  testimonials: makeController("Testimonials Section", {
    getMany: "getTestimonialsSections",
    getOne: "getTestimonialsSectionById",
    create: "createTestimonialsSection",
    update: "updateTestimonialsSection",
    del: "deleteTestimonialsSection",
  }),
  pricing: makeController("Pricing Section", {
    getMany: "getPricingSections",
    getOne: "getPricingSectionById",
    create: "createPricingSection",
    update: "updatePricingSection",
    del: "deletePricingSection",
  }),
  blog: makeController("Blog Section", {
    getMany: "getBlogSections",
    getOne: "getBlogSectionById",
    create: "createBlogSection",
    update: "updateBlogSection",
    del: "deleteBlogSection",
  }),
  cta: makeController("CTA Section", {
    getMany: "getCtaSections",
    getOne: "getCtaSectionById",
    create: "createCtaSection",
    update: "updateCtaSection",
    del: "deleteCtaSection",
  }),
  contact: makeController("Contact Section", {
    getMany: "getContactSections",
    getOne: "getContactSectionById",
    create: "createContactSection",
    update: "updateContactSection",
    del: "deleteContactSection",
  }),
  footer: makeController("Footer Section", {
    getMany: "getFooterSections",
    getOne: "getFooterSectionById",
    create: "createFooterSection",
    update: "updateFooterSection",
    del: "deleteFooterSection",
  }),

  // Contact Page Specific
  workingHours: makeController("Working Hours Section", {
    getMany: "getWorkingHoursSections",
    getOne: "getWorkingHoursSectionById",
    create: "createWorkingHoursSection",
    update: "updateWorkingHoursSection",
    del: "deleteWorkingHoursSection",
  }),
  inquiryForm: makeController("Inquiry Form Section", {
    getMany: "getInquiryFormSections",
    getOne: "getInquiryFormSectionById",
    create: "createInquiryFormSection",
    update: "updateInquiryFormSection",
    del: "deleteInquiryFormSection",
  }),
  faq: makeController("FAQ Section", {
    getMany: "getFaqSections",
    getOne: "getFaqSectionById",
    create: "createFaqSection",
    update: "updateFaqSection",
    del: "deleteFaqSection",
  }),
  socialMedia: makeController("Social Media Section", {
    getMany: "getSocialMediaSections",
    getOne: "getSocialMediaSectionById",
    create: "createSocialMediaSection",
    update: "updateSocialMediaSection",
    del: "deleteSocialMediaSection",
  }),
};
