import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.tenant.findFirst();
  if (existing) {
    console.log("Tenant already exists, skipping seed.");
    return;
  }

  const tenant = await prisma.tenant.create({
    data: {
      name: "OrenGen",
      slug: "orengen",
      brandColor: "#6366f1",
      domain: "app.orengen.io",
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "admin@orengen.io",
      name: "Andre",
      role: "OWNER",
      tenantId: tenant.id,
    },
  });

  const pipeline = await prisma.pipeline.create({
    data: {
      name: "Sales Pipeline",
      tenantId: tenant.id,
      stages: {
        create: [
          { name: "New Lead", order: 0, color: "#6366f1" },
          { name: "Contacted", order: 1, color: "#3b82f6" },
          { name: "Discovery", order: 2, color: "#f59e0b" },
          { name: "Proposal", order: 3, color: "#a855f7" },
          { name: "Negotiation", order: 4, color: "#ec4899" },
          { name: "Closed Won", order: 5, color: "#22c55e" },
        ],
      },
    },
    include: { stages: true },
  });

  const stages = pipeline.stages.sort((a, b) => a.order - b.order);

  const contacts = await Promise.all([
    prisma.contact.create({
      data: { name: "Marcus Lee", email: "marcus@apex.co", phone: "+1 305-555-0101", company: "Apex Corp", source: "Inbound", tenantId: tenant.id },
    }),
    prisma.contact.create({
      data: { name: "Sarah Chen", email: "sarah@lunawell.com", phone: "+1 786-555-0202", company: "Luna Wellness", source: "Referral", tenantId: tenant.id },
    }),
    prisma.contact.create({
      data: { name: "James Rodriguez", email: "james@devhouse.io", phone: "+1 954-555-0303", company: "DevHouse Inc", source: "Website", tenantId: tenant.id },
    }),
    prisma.contact.create({
      data: { name: "Emily Park", email: "emily@brightdental.com", phone: "+1 561-555-0404", company: "Bright Dental", source: "Cold Outreach", tenantId: tenant.id },
    }),
    prisma.contact.create({
      data: { name: "David Kim", email: "david@techflow.co", phone: "+1 407-555-0505", company: "TechFlow", source: "LinkedIn", tenantId: tenant.id },
    }),
    prisma.contact.create({
      data: { name: "Ana Martinez", email: "ana@greenscale.io", phone: "+1 305-555-0606", company: "GreenScale", source: "Conference", tenantId: tenant.id },
    }),
  ]);

  await Promise.all([
    prisma.deal.create({
      data: { title: "AI Chatbot Build", value: 8500, stageId: stages[0].id, pipelineId: pipeline.id, contactId: contacts[0].id, ownerId: user.id, tenantId: tenant.id },
    }),
    prisma.deal.create({
      data: { title: "Website Redesign", value: 12000, stageId: stages[0].id, pipelineId: pipeline.id, contactId: contacts[1].id, tenantId: tenant.id },
    }),
    prisma.deal.create({
      data: { title: "CRM Integration", value: 25000, stageId: stages[1].id, pipelineId: pipeline.id, contactId: contacts[0].id, ownerId: user.id, tenantId: tenant.id },
    }),
    prisma.deal.create({
      data: { title: "Booking System", value: 6200, stageId: stages[2].id, pipelineId: pipeline.id, contactId: contacts[1].id, tenantId: tenant.id },
    }),
    prisma.deal.create({
      data: { title: "Full Stack App", value: 45000, stageId: stages[3].id, pipelineId: pipeline.id, contactId: contacts[2].id, ownerId: user.id, tenantId: tenant.id },
    }),
    prisma.deal.create({
      data: { title: "SMS Automation", value: 3800, stageId: stages[5].id, pipelineId: pipeline.id, contactId: contacts[3].id, tenantId: tenant.id },
    }),
  ]);

  await Promise.all([
    prisma.task.create({ data: { title: "Set up Twilio SMS workflows", priority: "HIGH", status: "TODO", assigneeId: user.id, tenantId: tenant.id } }),
    prisma.task.create({ data: { title: "Design client onboarding flow", priority: "MEDIUM", status: "TODO", tenantId: tenant.id } }),
    prisma.task.create({ data: { title: "Configure Stripe subscription plans", priority: "HIGH", status: "TODO", tenantId: tenant.id } }),
    prisma.task.create({ data: { title: "Build landing page for AI SMS", priority: "URGENT", status: "IN_PROGRESS", assigneeId: user.id, tenantId: tenant.id } }),
    prisma.task.create({ data: { title: "CrewAI agent for lead scoring", priority: "MEDIUM", status: "IN_PROGRESS", tenantId: tenant.id } }),
    prisma.task.create({ data: { title: "VAPI voice bot script", priority: "MEDIUM", status: "REVIEW", assigneeId: user.id, tenantId: tenant.id } }),
    prisma.task.create({ data: { title: "Deploy CRM to Coolify", priority: "HIGH", status: "DONE", assigneeId: user.id, tenantId: tenant.id } }),
    prisma.task.create({ data: { title: "Connect Cal.com webhook", priority: "LOW", status: "DONE", tenantId: tenant.id } }),
  ]);

  await Promise.all([
    prisma.workflow.create({
      data: { name: "New Lead → SMS + CRM", trigger: "contact.created", actions: ["Add to CRM pipeline", "Send Twilio SMS welcome", "Trigger n8n lead score"], active: true, tenantId: tenant.id },
    }),
    prisma.workflow.create({
      data: { name: "Booking Confirmed → Prep", trigger: "calcom.booking.created", actions: ["Create task in CRM", "Send SMS reminder", "Notify Slack"], active: true, tenantId: tenant.id },
    }),
    prisma.workflow.create({
      data: { name: "Deal Won → Invoice", trigger: "deal.closed_won", actions: ["Create Stripe invoice", "Send welcome email", "Update analytics"], active: true, tenantId: tenant.id },
    }),
    prisma.workflow.create({
      data: { name: "VAPI Call → Follow Up", trigger: "vapi.call.completed", actions: ["Log call in CRM", "CrewAI sentiment analysis", "Schedule follow-up task"], active: false, tenantId: tenant.id },
    }),
    prisma.workflow.create({
      data: { name: "Lead Score → Assign", trigger: "crewai.score.complete", actions: ["Update contact score", "Auto-assign to rep", "Send personalized SMS"], active: true, tenantId: tenant.id },
    }),
  ]);

  console.log("Seed complete: tenant, user, pipeline, 6 stages, 6 contacts, 6 deals, 8 tasks, 5 workflows");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
