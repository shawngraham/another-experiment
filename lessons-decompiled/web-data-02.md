---
id: web-data-02
title: Web Scraping Ethics and Best Practices
moduleId: web-data-collection
prerequisites:
  - web-data-01
estimatedTimeMinutes: 25
difficulty: beginner
learningObjectives:
  - Locate and interpret a robots.txt file
  - Understand "Rate Limiting" and the impact of scraping on small archives
  - Differentiate between public data and copyrighted or sensitive data
  - Implement "polite" scraping practices using Python
keywords:
  - ethics
  - robots.txt
  - copyright
  - politeness
  - rate limiting
---

# The Ethical Scraper: Citizenship in the Digital Archive

  ## Just because you can, doesn't mean you should.
  Web scraping is a powerful tool, but in Digital Humanities, we often work with the websites of libraries, small museums, and university archives. Unlike Google or Amazon, these sites may run on limited budgets and small servers. If you send 10,000 requests per second, you could accidentally perform a "Denial of Service" (DoS) attack, crashing the very archive you are trying to study.

  ---

  ## 1. The `robots.txt` Protocol
  Before scraping, always check `website.com/robots.txt`. This is a plain text file where site owners define their rules for automated bots.

  **Common Terms:**
  - **User-agent**: Who the rule applies to (`*` means everyone).
  - **Disallow**: Paths that bots are **not** allowed to visit.
  - **Allow**: Specific paths bots **are** allowed to visit within a disallowed folder.

  ---

  ## 2. Being a "Polite" Guest
  A polite scraper "acts like a human." Humans take a few seconds to read a page before clicking the next one. You can mimic this using the `time` library.

  ```python
  import time

  pages = ["/page1", "/page2", "/page3"]

  for page in pages:
      # [Your scraping code here]
      print(f"Scraped {page}")
      
      # Wait for 2 seconds before the next request
      time.sleep(2) 
  ```

  ---

  ## 3. Identify Yourself (The User-Agent)
  When your script visits a site, it sends a "User-Agent" string. By default, this says "Python-requests." It is best practice to change this to include your email address. This way, if your script causes trouble, the web admin can email you instead of simply blocking your IP address.

  ---

  ## 4. Copyright and "Data Sovereignty"
  - **Public vs. Private**: Just because data is visible doesn't mean it's "Public Domain." 
  - **Fair Use**: In many regions, scraping for non-commercial scholarly research is "Fair Use," but re-publishing that data (e.g., putting the full text of a copyrighted novel on your own site) is a violation.
  - **Indigenous Data**: Be extra cautious with archives of Indigenous materials. Stop, and consider materials like [The First Nations Principles of OCAP \[link\]](https://fnigc.ca/ocap-training/) first.

  :::tip
  **The Golden Rule of Scraping**: Always look for a "Download Data" button or an API (Application Programming Interface) first. Scraping should be your last resort!
  :::

  :::challenge
  In the challenge at right, you are given a string that represents a `robots.txt` file. Your goal is to find the line that starts with "Disallow" and extract the path.
  :::

---challenges---
