import { AD_CLIENT, ADS_ENABLED } from '@/lib/shared';

export function GET() {
  // Không có NEXT_PUBLIC_AD_CLIENT thì đừng sinh dòng sai định dạng.
  // Trước đây route luôn trả về `google.com, pub-, DIRECT, f08c47fec0942fa0`
  // (thiếu publisher ID) khi build không có env — Google từ chối file đó và
  // AdSense bị mất xác minh domain. Trả body rỗng an toàn hơn: Google coi
  // ads.txt rỗng = "không khai báo seller", không phải "khai báo sai".
  const body = ADS_ENABLED
    ? `google.com, pub-${AD_CLIENT}, DIRECT, f08c47fec0942fa0`
    : '';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    status: 200,
  });
}

export const dynamic = 'force-static';
