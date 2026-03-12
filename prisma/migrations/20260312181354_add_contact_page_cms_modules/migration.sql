-- AlterTable
ALTER TABLE "blog_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "client_logos_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "contact_sections" ADD COLUMN     "contactCity" TEXT,
ADD COLUMN     "contactCountry" TEXT,
ADD COLUMN     "contactMapEmbedUrl" TEXT,
ADD COLUMN     "contactSectionDescription" TEXT,
ADD COLUMN     "contactWhatsapp" TEXT,
ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "cta_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "features_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "hero_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "pricing_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "services_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "stats_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE "testimonials_sections" ADD COLUMN     "pageIdentifier" TEXT NOT NULL DEFAULT 'home';

-- CreateTable
CREATE TABLE "working_hours_sections" (
    "id" SERIAL NOT NULL,
    "workingHoursTitle" TEXT NOT NULL,
    "workingHours" TEXT NOT NULL,
    "supportHours" TEXT,
    "seoMetaId" INTEGER,
    "pageIdentifier" TEXT NOT NULL DEFAULT 'contact',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "working_hours_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiry_form_sections" (
    "id" SERIAL NOT NULL,
    "formTitle" TEXT NOT NULL,
    "formDescription" TEXT,
    "servicesDropdown" TEXT[],
    "formButtonLabel" TEXT,
    "formSuccessMessage" TEXT,
    "formErrorMessage" TEXT,
    "seoMetaId" INTEGER,
    "pageIdentifier" TEXT NOT NULL DEFAULT 'contact',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiry_form_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_sections" (
    "id" SERIAL NOT NULL,
    "faqSectionTitle" TEXT NOT NULL,
    "seoMetaId" INTEGER,
    "pageIdentifier" TEXT NOT NULL DEFAULT 'contact',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_items" (
    "id" SERIAL NOT NULL,
    "faqQuestion" TEXT NOT NULL,
    "faqAnswer" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "faq_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media_sections" (
    "id" SERIAL NOT NULL,
    "socialFacebookUrl" TEXT,
    "socialInstagramUrl" TEXT,
    "socialLinkedinUrl" TEXT,
    "socialTiktokUrl" TEXT,
    "socialYoutubeUrl" TEXT,
    "seoMetaId" INTEGER,
    "pageIdentifier" TEXT NOT NULL DEFAULT 'contact',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_media_sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "working_hours_sections_seoMetaId_key" ON "working_hours_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "inquiry_form_sections_seoMetaId_key" ON "inquiry_form_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "faq_sections_seoMetaId_key" ON "faq_sections"("seoMetaId");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_sections_seoMetaId_key" ON "social_media_sections"("seoMetaId");

-- AddForeignKey
ALTER TABLE "working_hours_sections" ADD CONSTRAINT "working_hours_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inquiry_form_sections" ADD CONSTRAINT "inquiry_form_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faq_sections" ADD CONSTRAINT "faq_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faq_items" ADD CONSTRAINT "faq_items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "faq_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_media_sections" ADD CONSTRAINT "social_media_sections_seoMetaId_fkey" FOREIGN KEY ("seoMetaId") REFERENCES "seo_meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
