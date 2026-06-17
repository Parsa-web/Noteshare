import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import Section from '../components/common/Section'
import FileGrid from '../components/file/FileGrid'
import RecentlyViewed from '../components/file/RecentlyViewed'
import SearchBar from '../components/search/SearchBar'
import SubjectCard from '../components/search/SubjectCard'
import { subjects } from '../data/options'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFiles } from '../hooks/useFiles'
import { getSubjectFileCount } from '../utils/fileUtils'

const HomePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const files = useFiles()
  const [query, setQuery] = useState('')
  useDocumentTitle(t('home.title'))

  const latestFiles = useMemo(() => [...files].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).slice(0, 6), [files])
  const popularFiles = useMemo(() => [...files].sort((a, b) => b.downloads - a.downloads).slice(0, 6), [files])

  const submitSearch = (event) => {
    event.preventDefault()
    const search = query.trim()
    navigate(search ? `/search?q=${encodeURIComponent(search)}` : '/search')
  }

  return (
    <>
      <section className="hero-section">
        <Container>
          <div className="hero-section__content">
            <BadgeLine />
            <h1>{t('home.heroHeadline')}</h1>
            <p>{t('home.heroSubheadline')}</p>
            <SearchBar value={query} onChange={setQuery} placeholder={t('home.searchPlaceholder')} onSubmit={submitSearch} />
            <div className="hero-section__actions">
              <Button to="/search">{t('home.primaryCta')}</Button>
              <Button to="/upload" variant="secondary">{t('home.secondaryCta')}</Button>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <Section title={t('home.subjectsTitle')} subtitle={t('home.subjectsSubtitle')}>
          <div className="subject-grid">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} count={getSubjectFileCount(files, subject.id)} />
            ))}
          </div>
        </Section>

        <Section title={t('home.recentTitle')} subtitle={t('home.recentSubtitle')} action={<Button to="/search" variant="ghost">{t('actions.viewAll')}</Button>}>
          <FileGrid files={latestFiles} />
        </Section>

        <Section title={t('home.popularTitle')} subtitle={t('home.popularSubtitle')}>
          <FileGrid files={popularFiles} badge={t('home.popularBadge')} />
        </Section>

        <Section title={t('home.featuresTitle')} subtitle={t('home.featuresSubtitle')}>
          <div className="feature-grid">
            {['fastSearch', 'pdfPreview', 'favorites'].map((feature, index) => (
              <article className="feature-card" key={feature}>
                <span aria-hidden="true">{['⌕', '▤', '★'][index]}</span>
                <h3>{t(`features.${feature}.title`)}</h3>
                <p>{t(`features.${feature}.description`)}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section title={t('home.recentlyViewedTitle')} subtitle={t('home.recentlyViewedSubtitle')}>
          <RecentlyViewed files={files} />
        </Section>
      </Container>
    </>
  )
}

const BadgeLine = () => {
  const { t } = useTranslation()
  return <p className="hero-section__badge">{t('app.tagline')}</p>
}

export default HomePage
