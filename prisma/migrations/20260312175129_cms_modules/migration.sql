-- CreateTable
CREATE TABLE "seo_meta" (
    "id" SERIAL NOT NULL,
    "seoTitle" VARCHAR(60),
    "seoDescription" VARCHAR(160),
    "seoKeywords" TEXT,
    "seoCanonicalUrl" TEXT,
    "seoMetaImage" TEXT,
    "seoRobots" TEXT,
    "seoSchema" JSONB,
    "openGraphTitle" TEXT,
    "openGraphDescription" TEXT,
    "openGraphImage" TEXT,
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_sections" (
    "id" SERIAL NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT,
    "heroDescription" TEXT NOT NULL,
    "heroBackgroundImage" TEXT,
    "heroPrimaryButtonLabel" TEXT,
    "heroPrimaryButtonLink" TEXT,
    "heroSecondaryButtonLabel" TEXT,
    "heroSecondaryButtonLink" TEXT,
    "heroTrustedByText" TEXT,
    "heroTrustedLogos" TEXT[],
    "heroVideo" TEXT,
    "heroAnimation" TEXT,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hero_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_logos_sections" (
    "id" SERIAL NOT NULL,
    "clientsSectionTitle" TEXT NOT NULL,
    "clientsDescription" TEXT,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_logos_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_logos" (
    "id" SERIAL NOT NULL,
    "logoImage" TEXT NOT NULL,
    "logoLink" TEXT,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "client_logos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services_sections" (
    "id" SERIAL NOT NULL,
    "servicesSectionTitle" TEXT NOT NULL,
    "servicesSectionSubtitle" TEXT,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_items" (
    "id" SERIAL NOT NULL,
    "serviceTitle" TEXT NOT NULL,
    "serviceDescription" TEXT NOT NULL,
    "serviceIcon" TEXT,
    "serviceImage" TEXT,
    "serviceLink" TEXT,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "service_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features_sections" (
    "id" SERIAL NOT NULL,
    "featuresSectionTitle" TEXT NOT NULL,
    "featuresSectionSubtitle" TEXT,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "features_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_items" (
    "id" SERIAL NOT NULL,
    "featureTitle" TEXT NOT NULL,
    "featureDescription" TEXT NOT NULL,
    "featureIcon" TEXT,
    "featureImage" TEXT,
    "featureCtaLabel" TEXT,
    "featureCtaLink" TEXT,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "feature_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats_sections" (
    "id" SERIAL NOT NULL,
    "statsSectionTitle" TEXT NOT NULL,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stats_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stat_items" (
    "id" SERIAL NOT NULL,
    "statNumber" TEXT NOT NULL,
    "statLabel" TEXT NOT NULL,
    "statIcon" TEXT,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "stat_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials_sections" (
    "id" SERIAL NOT NULL,
    "testimonialsSectionTitle" TEXT NOT NULL,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonial_items" (
    "id" SERIAL NOT NULL,
    "testimonialName" TEXT NOT NULL,
    "testimonialCompany" TEXT,
    "testimonialPosition" TEXT,
    "testimonialReview" TEXT NOT NULL,
    "testimonialRating" INTEGER NOT NULL DEFAULT 5,
    "testimonialImage" TEXT,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "testimonial_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_sections" (
    "id" SERIAL NOT NULL,
    "pricingSectionTitle" TEXT NOT NULL,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_plans" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "planPrice" TEXT NOT NULL,
    "planDescription" TEXT,
    "planFeatures" TEXT[],
    "planCtaLabel" TEXT,
    "planCtaLink" TEXT,
    "planPopularBadge" BOOLEAN NOT NULL DEFAULT false,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "pricing_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_sections" (
    "id" SERIAL NOT NULL,
    "blogSectionTitle" TEXT NOT NULL,
    "blogSectionDescription" TEXT,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" SERIAL NOT NULL,
    "blogPostTitle" TEXT NOT NULL,
    "blogPostExcerpt" TEXT,
    "blogPostImage" TEXT,
    "blogPostSlug" TEXT NOT NULL,
    "blogPostAuthor" TEXT,
    "blogPostDate" TIMESTAMP(3),
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cta_sections" (
    "id" SERIAL NOT NULL,
    "ctaSectionTitle" TEXT NOT NULL,
    "ctaSectionDescription" TEXT,
    "ctaButtonLabel" TEXT,
    "ctaButtonLink" TEXT,
    "ctaBackgroundImage" TEXT,
    "ctaFormEnabled" BOOLEAN NOT NULL DEFAULT false,
    "ctaFormFields" JSONB,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cta_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_sections" (
    "id" SERIAL NOT NULL,
    "contactSectionTitle" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "contactAddress" TEXT,
    "contactForm" TEXT,
    "contactFormFields" JSONB,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_sections" (
    "id" SERIAL NOT NULL,
    "footerLogo" TEXT,
    "footerDescription" TEXT,
    "footerCopyright" TEXT,
    "footerPrivacyPolicyLink" TEXT,
    "footerTermsLink" TEXT,
    "footerNewsletterEnabled" BOOLEAN NOT NULL DEFAULT false,
    "footerNewsletterTitle" TEXT,
    "seoMetaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_menu_links" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "footer_menu_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_social_links" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "footer_social_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hero_sections_seoMetaId_key" ON "hero_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "client_logos_sections_seoMetaId_key" ON "client_logos_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "services_sections_seoMetaId_key" ON "services_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "features_sections_seoMetaId_key" ON "features_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "stats_sections_seoMetaId_key" ON "stats_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "testimonials_sections_seoMetaId_key" ON "testimonials_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_sections_seoMetaId_key" ON "pricing_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "blog_sections_seoMetaId_key" ON "blog_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_blogPostSlug_key" ON "blog_posts"("blogPostSlug");

-- CreateIndex
CREATE UNIQUE INDEX "cta_sections_seoMetaId_key" ON "cta_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_sections_seoMetaId_key" ON "contact_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "footer_sections_seoMetaId_key" ON "footer_sections"("seoMetaId");

-- AddForeignKey
ALTER TABLE "hero_sections" ADD CONSTRAINT "hero_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_logos_sections" ADD CONSTRAINT "client_logos_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_logos" ADD CONSTRAINT "client_logos_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "client_logos_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_sections" ADD CONSTRAINT "services_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_items" ADD CONSTRAINT "service_items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "services_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "features_sections" ADD CONSTRAINT "features_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature_items" ADD CONSTRAINT "feature_items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "features_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats_sections" ADD CONSTRAINT "stats_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stat_items" ADD CONSTRAINT "stat_items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "stats_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials_sections" ADD CONSTRAINT "testimonials_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonial_items" ADD CONSTRAINT "testimonial_items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "testimonials_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_sections" ADD CONSTRAINT "pricing_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_plans" ADD CONSTRAINT "pricing_plans_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "pricing_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_sections" ADD CONSTRAINT "blog_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "blog_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cta_sections" ADD CONSTRAINT "cta_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_sections" ADD CONSTRAINT "contact_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footer_sections" ADD CONSTRAINT "footer_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footer_menu_links" ADD CONSTRAINT "footer_menu_links_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "footer_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "footer_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
