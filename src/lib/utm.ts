const EDITORIAL_DOMAINS = [
  'wikipedia.org',
  'github.com',
];

export function withUtm(href: string, campaign: string): string {
  try {
    const url = new URL(href);
    const hostname = url.hostname.toLowerCase();

    if (EDITORIAL_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`))) {
      return href;
    }

    url.searchParams.set('utm_source', 'cuisine-airfryer.fr');
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', campaign);
    return url.toString();
  } catch {
    return href;
  }
}
