/**
 * Example: Create and publish a post
 *
 * Run with: npx tsx examples/create-post.ts
 */

import Late, { LateApiError } from 'late';

async function main() {
  // Initialize the client (uses LATE_API_KEY env var by default)
  const late = new Late();

  try {
    // First, list available accounts
    const { data: accountsData } = await late.accounts.list();
    console.log('Connected accounts:');
    for (const account of accountsData.accounts) {
      console.log(`  - ${account.platform}: @${account.username} (${account._id})`);
    }

    // Find a Twitter account
    const twitterAccount = accountsData.accounts.find((a) => a.platform === 'twitter');
    if (!twitterAccount) {
      console.log('No Twitter account connected. Skipping post creation.');
      return;
    }

    // Create a post (publish immediately)
    const { data: post } = await late.posts.create({
      body: {
        content: 'Hello from the Late SDK! This is a test post. 🚀',
        platforms: [
          {
            platform: 'twitter',
            accountId: twitterAccount._id,
          },
        ],
        publishNow: true,
      },
    });

    console.log('\nPost created successfully!');
    console.log(`  ID: ${post._id}`);
    console.log(`  Status: ${post.status}`);
  } catch (error) {
    if (error instanceof LateApiError) {
      console.error(`API Error (${error.statusCode}): ${error.message}`);
      if (error.code) {
        console.error(`  Code: ${error.code}`);
      }
    } else {
      throw error;
    }
  }
}

main();
