import { prisma } from "../config/db";
import {
  CreateHeroSectionInput,
  CreateClientLogosSectionInput,
  CreateServicesSectionInput,
  CreateFeaturesSectionInput,
  CreateStatsSectionInput,
  CreateTestimonialsSectionInput,
  CreatePricingSectionInput,
  CreateBlogSectionInput,
  CreateCtaSectionInput,
  CreateContactSectionInput,
  CreateFooterSectionInput,
  CreateWorkingHoursSectionInput,
  CreateInquiryFormSectionInput,
  CreateFaqSectionInput,
  CreateSocialMediaSectionInput,
} from "../schemas/cms.schema";

// Helper to structure nested seoMeta creation/update
const prepareSeoMeta = (seoMeta?: any) => {
  if (!seoMeta) return undefined;
  return {
    create: seoMeta,
  };
};

export const cmsService = {
  // -------------------------------------------------------------
  // 1. Hero Section
  // -------------------------------------------------------------
  async getHeroSections() {
    return prisma.heroSection.findMany({ include: { seoMeta: true } });
  },
  async getHeroSectionById(id: number) {
    return prisma.heroSection.findUnique({
      where: { id },
      include: { seoMeta: true },
    });
  },
  async createHeroSection(data: CreateHeroSectionInput) {
    const { seoMeta, ...rest } = data;
    return prisma.heroSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
      },
      include: { seoMeta: true },
    });
  },
  async updateHeroSection(id: number, data: Partial<CreateHeroSectionInput>) {
    const { seoMeta, ...rest } = data;
    const existing = await prisma.heroSection.findUnique({ where: { id } });

    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      if (existing?.seoMetaId) {
        seoMetaUpdate = { update: seoMeta };
      } else {
        seoMetaUpdate = { create: seoMeta };
      }
    }

    return prisma.heroSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
      },
      include: { seoMeta: true },
    });
  },
  async deleteHeroSection(id: number) {
    return prisma.heroSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 2. Client Logos Section
  // -------------------------------------------------------------
  async getClientLogosSections() {
    return prisma.clientLogosSection.findMany({
      include: { logos: true, seoMeta: true },
    });
  },
  async getClientLogosSectionById(id: number) {
    return prisma.clientLogosSection.findUnique({
      where: { id },
      include: { logos: true, seoMeta: true },
    });
  },
  async createClientLogosSection(data: CreateClientLogosSectionInput) {
    const { seoMeta, logos, ...rest } = data;
    return prisma.clientLogosSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        logos: logos ? { create: logos } : undefined,
      },
      include: { logos: true, seoMeta: true },
    });
  },
  async updateClientLogosSection(
    id: number,
    data: Partial<CreateClientLogosSectionInput>,
  ) {
    const { seoMeta, logos, ...rest } = data;
    const existing = await prisma.clientLogosSection.findUnique({
      where: { id },
    });

    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      if (existing?.seoMetaId) {
        seoMetaUpdate = { update: seoMeta };
      } else {
        seoMetaUpdate = { create: seoMeta };
      }
    }

    return prisma.clientLogosSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        // For lists, it's easier to delete and recreate them all for replacement
        ...(logos && {
          logos: {
            deleteMany: {},
            create: logos,
          },
        }),
      },
      include: { logos: true, seoMeta: true },
    });
  },
  async deleteClientLogosSection(id: number) {
    return prisma.clientLogosSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 3. Services Section
  // -------------------------------------------------------------
  async getServicesSections() {
    return prisma.servicesSection.findMany({
      include: { services: true, seoMeta: true },
    });
  },
  async getServicesSectionById(id: number) {
    return prisma.servicesSection.findUnique({
      where: { id },
      include: { services: true, seoMeta: true },
    });
  },
  async createServicesSection(data: CreateServicesSectionInput) {
    const { seoMeta, services, ...rest } = data;
    return prisma.servicesSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        services: services ? { create: services } : undefined,
      },
      include: { services: true, seoMeta: true },
    });
  },
  async updateServicesSection(
    id: number,
    data: Partial<CreateServicesSectionInput>,
  ) {
    const { seoMeta, services, ...rest } = data;
    const existing = await prisma.servicesSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.servicesSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        ...(services && {
          services: { deleteMany: {}, create: services },
        }),
      },
      include: { services: true, seoMeta: true },
    });
  },
  async deleteServicesSection(id: number) {
    return prisma.servicesSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 4. Features Section
  // -------------------------------------------------------------
  async getFeaturesSections() {
    return prisma.featuresSection.findMany({
      include: { features: true, seoMeta: true },
    });
  },
  async getFeaturesSectionById(id: number) {
    return prisma.featuresSection.findUnique({
      where: { id },
      include: { features: true, seoMeta: true },
    });
  },
  async createFeaturesSection(data: CreateFeaturesSectionInput) {
    const { seoMeta, features, ...rest } = data;
    return prisma.featuresSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        features: features ? { create: features } : undefined,
      },
      include: { features: true, seoMeta: true },
    });
  },
  async updateFeaturesSection(
    id: number,
    data: Partial<CreateFeaturesSectionInput>,
  ) {
    const { seoMeta, features, ...rest } = data;
    const existing = await prisma.featuresSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.featuresSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        ...(features && {
          features: { deleteMany: {}, create: features },
        }),
      },
      include: { features: true, seoMeta: true },
    });
  },
  async deleteFeaturesSection(id: number) {
    return prisma.featuresSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 5. Stats Section
  // -------------------------------------------------------------
  async getStatsSections() {
    return prisma.statsSection.findMany({
      include: { stats: true, seoMeta: true },
    });
  },
  async getStatsSectionById(id: number) {
    return prisma.statsSection.findUnique({
      where: { id },
      include: { stats: true, seoMeta: true },
    });
  },
  async createStatsSection(data: CreateStatsSectionInput) {
    const { seoMeta, stats, ...rest } = data;
    return prisma.statsSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        stats: stats ? { create: stats } : undefined,
      },
      include: { stats: true, seoMeta: true },
    });
  },
  async updateStatsSection(id: number, data: Partial<CreateStatsSectionInput>) {
    const { seoMeta, stats, ...rest } = data;
    const existing = await prisma.statsSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.statsSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        ...(stats && {
          stats: { deleteMany: {}, create: stats },
        }),
      },
      include: { stats: true, seoMeta: true },
    });
  },
  async deleteStatsSection(id: number) {
    return prisma.statsSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 6. Testimonials Section
  // -------------------------------------------------------------
  async getTestimonialsSections() {
    return prisma.testimonialsSection.findMany({
      include: { testimonials: true, seoMeta: true },
    });
  },
  async getTestimonialsSectionById(id: number) {
    return prisma.testimonialsSection.findUnique({
      where: { id },
      include: { testimonials: true, seoMeta: true },
    });
  },
  async createTestimonialsSection(data: CreateTestimonialsSectionInput) {
    const { seoMeta, testimonials, ...rest } = data;
    return prisma.testimonialsSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        testimonials: testimonials ? { create: testimonials } : undefined,
      },
      include: { testimonials: true, seoMeta: true },
    });
  },
  async updateTestimonialsSection(
    id: number,
    data: Partial<CreateTestimonialsSectionInput>,
  ) {
    const { seoMeta, testimonials, ...rest } = data;
    const existing = await prisma.testimonialsSection.findUnique({
      where: { id },
    });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.testimonialsSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        ...(testimonials && {
          testimonials: { deleteMany: {}, create: testimonials },
        }),
      },
      include: { testimonials: true, seoMeta: true },
    });
  },
  async deleteTestimonialsSection(id: number) {
    return prisma.testimonialsSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 7. Pricing Section
  // -------------------------------------------------------------
  async getPricingSections() {
    return prisma.pricingSection.findMany({
      include: { plans: true, seoMeta: true },
    });
  },
  async getPricingSectionById(id: number) {
    return prisma.pricingSection.findUnique({
      where: { id },
      include: { plans: true, seoMeta: true },
    });
  },
  async createPricingSection(data: CreatePricingSectionInput) {
    const { seoMeta, plans, ...rest } = data;
    return prisma.pricingSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        plans: plans ? { create: plans } : undefined,
      },
      include: { plans: true, seoMeta: true },
    });
  },
  async updatePricingSection(
    id: number,
    data: Partial<CreatePricingSectionInput>,
  ) {
    const { seoMeta, plans, ...rest } = data;
    const existing = await prisma.pricingSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.pricingSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        ...(plans && {
          plans: { deleteMany: {}, create: plans },
        }),
      },
      include: { plans: true, seoMeta: true },
    });
  },
  async deletePricingSection(id: number) {
    return prisma.pricingSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 8. Blog Section
  // -------------------------------------------------------------
  async getBlogSections() {
    return prisma.blogSection.findMany({
      include: { posts: true, seoMeta: true },
    });
  },
  async getBlogSectionById(id: number) {
    return prisma.blogSection.findUnique({
      where: { id },
      include: { posts: true, seoMeta: true },
    });
  },
  async createBlogSection(data: CreateBlogSectionInput) {
    const { seoMeta, posts, ...rest } = data;
    return prisma.blogSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        posts: posts ? { create: posts } : undefined,
      },
      include: { posts: true, seoMeta: true },
    });
  },
  async updateBlogSection(id: number, data: Partial<CreateBlogSectionInput>) {
    const { seoMeta, posts, ...rest } = data;
    const existing = await prisma.blogSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.blogSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        ...(posts && {
          posts: { deleteMany: {}, create: posts },
        }),
      },
      include: { posts: true, seoMeta: true },
    });
  },
  async deleteBlogSection(id: number) {
    return prisma.blogSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 9. CTA Section
  // -------------------------------------------------------------
  async getCtaSections() {
    return prisma.ctaSection.findMany({ include: { seoMeta: true } });
  },
  async getCtaSectionById(id: number) {
    return prisma.ctaSection.findUnique({
      where: { id },
      include: { seoMeta: true },
    });
  },
  async createCtaSection(data: CreateCtaSectionInput) {
    const { seoMeta, ...rest } = data;
    return prisma.ctaSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
      },
      include: { seoMeta: true },
    });
  },
  async updateCtaSection(id: number, data: Partial<CreateCtaSectionInput>) {
    const { seoMeta, ...rest } = data;
    const existing = await prisma.ctaSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.ctaSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
      },
      include: { seoMeta: true },
    });
  },
  async deleteCtaSection(id: number) {
    return prisma.ctaSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 10. Contact Section
  // -------------------------------------------------------------
  async getContactSections() {
    return prisma.contactSection.findMany({ include: { seoMeta: true } });
  },
  async getContactSectionById(id: number) {
    return prisma.contactSection.findUnique({
      where: { id },
      include: { seoMeta: true },
    });
  },
  async createContactSection(data: CreateContactSectionInput) {
    const { seoMeta, ...rest } = data;
    return prisma.contactSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
      },
      include: { seoMeta: true },
    });
  },
  async updateContactSection(
    id: number,
    data: Partial<CreateContactSectionInput>,
  ) {
    const { seoMeta, ...rest } = data;
    const existing = await prisma.contactSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.contactSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
      },
      include: { seoMeta: true },
    });
  },
  async deleteContactSection(id: number) {
    return prisma.contactSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // 11. Footer Section
  // -------------------------------------------------------------
  async getFooterSections() {
    return prisma.footerSection.findMany({
      include: { menuLinks: true, socialLinks: true, seoMeta: true },
    });
  },
  async getFooterSectionById(id: number) {
    return prisma.footerSection.findUnique({
      where: { id },
      include: { menuLinks: true, socialLinks: true, seoMeta: true },
    });
  },
  async createFooterSection(data: CreateFooterSectionInput) {
    const { seoMeta, menuLinks, socialLinks, ...rest } = data;
    return prisma.footerSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        menuLinks: menuLinks ? { create: menuLinks } : undefined,
        socialLinks: socialLinks ? { create: socialLinks } : undefined,
      },
      include: { menuLinks: true, socialLinks: true, seoMeta: true },
    });
  },
  async updateFooterSection(
    id: number,
    data: Partial<CreateFooterSectionInput>,
  ) {
    const { seoMeta, menuLinks, socialLinks, ...rest } = data;
    const existing = await prisma.footerSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.footerSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        ...(menuLinks && {
          menuLinks: { deleteMany: {}, create: menuLinks },
        }),
        ...(socialLinks && {
          socialLinks: { deleteMany: {}, create: socialLinks },
        }),
      },
      include: { menuLinks: true, socialLinks: true, seoMeta: true },
    });
  },
  async deleteFooterSection(id: number) {
    return prisma.footerSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // NEW: Working Hours Section (Contact Page)
  // -------------------------------------------------------------
  async getWorkingHoursSections() {
    return prisma.workingHoursSection.findMany({ include: { seoMeta: true } });
  },
  async getWorkingHoursSectionById(id: number) {
    return prisma.workingHoursSection.findUnique({
      where: { id },
      include: { seoMeta: true },
    });
  },
  async createWorkingHoursSection(data: CreateWorkingHoursSectionInput) {
    const { seoMeta, ...rest } = data;
    return prisma.workingHoursSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
      },
      include: { seoMeta: true },
    });
  },
  async updateWorkingHoursSection(
    id: number,
    data: Partial<CreateWorkingHoursSectionInput>,
  ) {
    const { seoMeta, ...rest } = data;
    const existing = await prisma.workingHoursSection.findUnique({
      where: { id },
    });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.workingHoursSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
      },
      include: { seoMeta: true },
    });
  },
  async deleteWorkingHoursSection(id: number) {
    return prisma.workingHoursSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // NEW: Inquiry Form Section (Contact Page)
  // -------------------------------------------------------------
  async getInquiryFormSections() {
    return prisma.inquiryFormSection.findMany({ include: { seoMeta: true } });
  },
  async getInquiryFormSectionById(id: number) {
    return prisma.inquiryFormSection.findUnique({
      where: { id },
      include: { seoMeta: true },
    });
  },
  async createInquiryFormSection(data: CreateInquiryFormSectionInput) {
    const { seoMeta, ...rest } = data;
    return prisma.inquiryFormSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
      },
      include: { seoMeta: true },
    });
  },
  async updateInquiryFormSection(
    id: number,
    data: Partial<CreateInquiryFormSectionInput>,
  ) {
    const { seoMeta, ...rest } = data;
    const existing = await prisma.inquiryFormSection.findUnique({
      where: { id },
    });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.inquiryFormSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
      },
      include: { seoMeta: true },
    });
  },
  async deleteInquiryFormSection(id: number) {
    return prisma.inquiryFormSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // NEW: FAQ Section
  // -------------------------------------------------------------
  async getFaqSections() {
    return prisma.faqSection.findMany({
      include: { items: true, seoMeta: true },
    });
  },
  async getFaqSectionById(id: number) {
    return prisma.faqSection.findUnique({
      where: { id },
      include: { items: true, seoMeta: true },
    });
  },
  async createFaqSection(data: CreateFaqSectionInput) {
    const { seoMeta, items, ...rest } = data;
    return prisma.faqSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
        items: items ? { create: items } : undefined,
      },
      include: { items: true, seoMeta: true },
    });
  },
  async updateFaqSection(
    id: number,
    data: Partial<CreateFaqSectionInput>,
  ) {
    const { seoMeta, items, ...rest } = data;
    const existing = await prisma.faqSection.findUnique({ where: { id } });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.faqSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
        ...(items && {
          items: { deleteMany: {}, create: items },
        }),
      },
      include: { items: true, seoMeta: true },
    });
  },
  async deleteFaqSection(id: number) {
    return prisma.faqSection.delete({ where: { id } });
  },

  // -------------------------------------------------------------
  // NEW: Social Media Links Section
  // -------------------------------------------------------------
  async getSocialMediaSections() {
    return prisma.socialMediaSection.findMany({ include: { seoMeta: true } });
  },
  async getSocialMediaSectionById(id: number) {
    return prisma.socialMediaSection.findUnique({
      where: { id },
      include: { seoMeta: true },
    });
  },
  async createSocialMediaSection(data: CreateSocialMediaSectionInput) {
    const { seoMeta, ...rest } = data;
    return prisma.socialMediaSection.create({
      data: {
        ...rest,
        seoMeta: prepareSeoMeta(seoMeta),
      },
      include: { seoMeta: true },
    });
  },
  async updateSocialMediaSection(
    id: number,
    data: Partial<CreateSocialMediaSectionInput>,
  ) {
    const { seoMeta, ...rest } = data;
    const existing = await prisma.socialMediaSection.findUnique({
      where: { id },
    });
    let seoMetaUpdate: any = undefined;
    if (seoMeta) {
      seoMetaUpdate = existing?.seoMetaId
        ? { update: seoMeta }
        : { create: seoMeta };
    }
    return prisma.socialMediaSection.update({
      where: { id },
      data: {
        ...rest,
        ...(seoMetaUpdate && { seoMeta: seoMetaUpdate }),
      },
      include: { seoMeta: true },
    });
  },
  async deleteSocialMediaSection(id: number) {
    return prisma.socialMediaSection.delete({ where: { id } });
  },
};
