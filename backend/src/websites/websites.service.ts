import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Website, WebsiteDocument } from './schemas/website.schema';

@Injectable()
export class WebsitesService {
  constructor(@InjectModel(Website.name) private websiteModel: Model<WebsiteDocument>) {}

  private sectionPool = [
    'Hero',
    'Features',
    'Benefits',
    'How It Works',
    'Testimonials',
    'Use Cases',
    'Pricing',
    'FAQ',
    'Call To Action',
    'Metrics',
    'Integrations',
    'Security',
    'Roadmap',
    'Case Studies',
    'Onboarding',
    'Customization',
    'Sustainability',
  ];

  private pickThree(): string[] {
    const shuffled = [...this.sectionPool].sort(() => Math.random() - 0.5);
    const heroIndex = shuffled.indexOf('Hero');
    if (heroIndex !== -1) {
      const [hero] = shuffled.splice(heroIndex, 1);
      return [hero, ...shuffled.slice(0, 2)];
    }
    return shuffled.slice(0, 3);
  }

  generateDummySections(idea: string) {
  const chosen = this.pickThree();
    // Use deterministic picsum.photos seeds for open placeholder images.
    function pickImg(seed: number) {
      const normalized = Math.abs(seed * 2654435761) % 1000; // pseudo-hash
      return `https://picsum.photos/seed/${normalized}/960/640`;
    }
    return chosen.map((name, idx) => {
      let content: string;
      switch (name) {
        case 'Hero':
          content = `Introducing ${idea}: a bold, human-centered approach reshaping daily workflows. A crisp promise, an emotional hook, and a confident action path.`;
          break;
        case 'Features':
          content = `Key capabilities powering ${idea}: adaptive automation, real-time insight surfaces, frictionless onboarding, and sensible defaults that scale.`;
          break;
        case 'Benefits':
          content = `Why teams adopt ${idea}: reclaim hours, reduce cognitive load, align stakeholders faster, and convert strategy into measurable momentum.`;
          break;
        case 'How It Works':
          content = `${idea} unfolds in three intuitive phases: 1) Capture intent, 2) Orchestrate intelligent flows, 3) Surface progress & next best actions.`;
          break;
        case 'Testimonials':
          content = `Early champions of ${idea} report 40% faster delivery cycles and a palpable lift in cross-functional clarity— social proof fueling trust.`;
          break;
        case 'Use Cases':
          content = `${idea} adapts across domains: product discovery, launch coordination, creator monetization, and lightweight client delivery frameworks.`;
          break;
        case 'Pricing':
          content = `A transparent model: Explore for free, unlock acceleration with Pro, or tailor governance, scale, and data residency under Enterprise.`;
          break;
        case 'FAQ':
          content = `Common questions: onboarding time, data boundaries, integrations roadmap, support SLAs, export options, and account portability.`;
          break;
        case 'Call To Action':
          content = `Momentum starts now— pilot ${idea} with a focused use case and compound wins into a durable operating advantage.`;
          break;
        case 'Metrics':
          content = `Impact snapshots: cycle time ↓32%, activation ↑21%, retention lift 14% after adopting ${idea} across core teams.`;
          break;
        case 'Integrations':
          content = `${idea} plugs into existing stack: Slack, Notion, GitHub, Jira, HubSpot, and lightweight webhooks for custom flows.`;
          break;
        case 'Security':
          content = `Enterprise-grade posture: least-privilege access, encrypted at rest & in transit, regional data residency options, audit trails.`;
          break;
        case 'Roadmap':
          content = `Near term: deeper analytics & adaptive suggestions. Mid term: marketplace extensions. Long term: autonomous orchestration around ${idea}.`;
          break;
        case 'Case Studies':
          content = `Teams scaling with ${idea}: product org unblocked specs 2x faster; agency streamlined client launch ops; startup closed pilots sooner.`;
          break;
        case 'Onboarding':
          content = `Get value in under 5 minutes: guided template selection, data import assists, contextual tips, and a progressive expansion model.`;
          break;
        case 'Customization':
          content = `Tailor ${idea}: flexible schema extensions, conditional automation blocks, and themable surfaces respecting brand tokens.`;
          break;
        case 'Sustainability':
          content = `${idea} optimizes compute usage, minimizing redundant tasks— lowering operational overhead and environmental footprint.`;
          break;
        default:
          content = `${idea} narrative expansion for ${name}.`;
      }
      const image = pickImg(idx + idea.length);
      return { title: name, content, order: idx, image };
    });
  }

  async create(idea: string) {
    try {
      const sections = this.generateDummySections(idea);
      const created = new this.websiteModel({ idea, sections });
      const saved = await created.save();
      return {
        id: saved._id.toString(),
        idea: saved.idea,
        sections: saved.sections,
        createdAt: saved.createdAt,
      };
    } catch (err) {
      throw new InternalServerErrorException('Failed to create website');
    }
  }

  async findById(id: string) {
    return this.websiteModel.findById(id).lean().exec();
  }

  async list(limit = 20) {
    const docs = await this.websiteModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
    return docs.map((d: any) => ({
      id: d._id.toString(),
      idea: d.idea,
      sections: d.sections,
      createdAt: d.createdAt,
    }));
  }

  async deleteOne(id: string) {
    try {
      const res = await this.websiteModel.findByIdAndDelete(id).lean().exec();
      return res ? true : false;
    } catch {
      return false;
    }
  }

  async deleteAll() {
    const result = await this.websiteModel.deleteMany({}).exec();
    return result.deletedCount || 0;
  }
}
