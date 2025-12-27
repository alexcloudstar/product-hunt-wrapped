import { db } from '@/db';
import { suggestions } from '@/db/schema';

import { desc } from 'drizzle-orm';
import Roadmap from './Roadmap';

export default async function RoadmapPage() {
  const features = await db.query.suggestions.findMany({
    with: {
      upvotes: {
        columns: {
          id: true,
        },
      },
    },
    orderBy: [desc(suggestions.createdAt)],
  });

  return <Roadmap initialFeatures={features} />;
}
