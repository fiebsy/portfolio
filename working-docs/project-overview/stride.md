OVERVIEW OF CONTENT REWARDS

Project 1
bnocs.com

Bnocs
For the Pickaxe project, I built an analytics platform called Bnocs.com for a crypto project named Stride.
The problem I solved was that there wasn’t a clean or unified way for community members to analyze staking activity or track core KPIs for Stride. If you buy the STRD token, you earn yield based on how much value the core protocol is locking up—this is known as Total Value Locked (TVL). The more TVL the protocol has, the more fees it earns, which increases token yield and, in turn, boosts your earnings.
Before Bnocs, users had to visit multiple sites to check the token price, current TVL, and stay updated on what the team or community was saying. It was a fragmented and frustrating experience.
I received a $10,000 grant for creating Bnocs.
The platform introduces a fully custom line chart for TVL and a custom bar chart for inflows and outflows. Another well-received feature was the LLM-powered news summary, which uses the OpenAI API. It pulls from raw protocol data via Firebase and BigQuery—covering metrics like TVL and inflows—and organizes insights into three sections:

1. Protocol Performance – shows key data from the blockchain.
2. Team Activity – summarizes the latest tweets from the core team.
3. Community Discussion – scrapes the last ~100 Discord messages and summarizes what admins and users are talking about.
   I created scrapers and formatted prompts to output daily summaries. Each section is populated into a modal that answers key questions:

- How is the protocol performing?
- What’s the team doing?
- What’s the latest community buzz?
  Together, these features offer a holistic view of the project in real time.
  Stack: React, Tailwind, Firebase, BigQuery, OpenAI LLMs.
