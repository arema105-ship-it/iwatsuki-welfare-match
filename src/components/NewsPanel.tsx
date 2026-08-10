const SAMPLE_NEWS = [
  {
    id: '1',
    date: '2026.08.01',
    title: '夏の見学会のお知らせ',
    body: '8月に事業所見学会を開催予定です。詳細は後日掲載します。',
  },
  {
    id: '2',
    date: '2026.07.15',
    title: 'マッチングデモを公開しました',
    body: '条件から事業所を探すデモページを公開しました。',
  },
  {
    id: '3',
    date: '2026.07.01',
    title: 'WAM NETデータを反映',
    body: '岩槻区の就労継続支援B型事業所情報を一覧に登録しています。',
  },
] as const;

export function NewsPanel() {
  return (
    <section className="tab-panel">
      <div className="results-header">
        <h2>お知らせ</h2>
        <p className="results-subtitle">デモ用のサンプルお知らせです</p>
      </div>

      <ul className="news-list">
        {SAMPLE_NEWS.map((item) => (
          <li key={item.id} className="news-card">
            <time className="news-date" dateTime={item.date.replace(/\./g, '-')}>
              {item.date}
            </time>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
