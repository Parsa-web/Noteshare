import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SubjectCard = ({ subject, count }) => {
  const { t } = useTranslation()

  return (
    <Link className="subject-card" to={`/search?subject=${subject.id}`}>
      <span className="subject-card__icon" aria-hidden="true">{subject.icon}</span>
      <strong>{t(`subjects.${subject.id}`)}</strong>
      <span>{t('meta.files', { count })}</span>
    </Link>
  )
}

export default SubjectCard
