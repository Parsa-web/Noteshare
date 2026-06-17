import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../common/Button'
import Input from '../common/Input'
import Select from '../common/Select'
import Badge from '../common/Badge'
import { grades, subjects } from '../../data/options'
import { saveUploadedFile } from '../../utils/storage'

const acceptedTypes = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'image/png': 'png',
  'image/jpeg': 'jpg',
}

const UploadForm = () => {
  const { i18n, t } = useTranslation()
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [form, setForm] = useState({ title: '', subject: '', grade: '', description: '', file: null })
  const [errors, setErrors] = useState({})
  const [uploadedFile, setUploadedFile] = useState(null)

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
  }

  const validateFile = (file) => {
    if (!file) return t('upload.errors.file')
    if (!acceptedTypes[file.type]) return t('upload.errors.type')
    if (file.size > 20 * 1024 * 1024) return t('upload.errors.size')
    return ''
  }

  const handleFile = (file) => {
    const error = validateFile(file)
    setErrors((current) => ({ ...current, file: error }))
    if (!error) setField('file', file)
  }

  const validate = () => {
    const nextErrors = {
      title: form.title.trim() ? '' : t('upload.errors.title'),
      subject: form.subject ? '' : t('upload.errors.subject'),
      grade: form.grade ? '' : t('upload.errors.grade'),
      description: form.description.trim() ? '' : t('upload.errors.description'),
      file: validateFile(form.file),
    }

    setErrors(nextErrors)
    return Object.values(nextErrors).every((error) => !error)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const fileType = acceptedTypes[form.file.type]
    const savedFile = {
      id: `upload-${Date.now()}`,
      title: { en: form.title.trim(), fa: form.title.trim() },
      subject: form.subject,
      grade: form.grade,
      description: { en: form.description.trim(), fa: form.description.trim() },
      fileType,
      size: `${(form.file.size / (1024 * 1024)).toFixed(1)} MB`,
      downloads: 0,
      uploadDate: new Date().toISOString(),
      author: { en: 'Local student', fa: 'دانش‌آموز محلی' },
      thumbnail: 'document-5',
      previewUrl: '',
      localFileName: form.file.name,
    }

    saveUploadedFile(savedFile)
    setUploadedFile(savedFile)
    setForm({ title: '', subject: '', grade: '', description: '', file: null })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="upload-layout">
      <form className="upload-form" onSubmit={handleSubmit} noValidate>
        <Input id="upload-title" label={t('upload.titleLabel')} value={form.title} onChange={(event) => setField('title', event.target.value)} placeholder={t('upload.titlePlaceholder')} error={errors.title} />
        <div className="form-grid">
          <Select id="upload-subject" label={t('upload.subjectLabel')} value={form.subject} onChange={(event) => setField('subject', event.target.value)} error={errors.subject} options={[{ value: '', label: t('search.allSubjects') }, ...subjects.map((subject) => ({ value: subject.id, label: t(`subjects.${subject.id}`) }))]} />
          <Select id="upload-grade" label={t('upload.gradeLabel')} value={form.grade} onChange={(event) => setField('grade', event.target.value)} error={errors.grade} options={[{ value: '', label: t('search.allGrades') }, ...grades.map((grade) => ({ value: grade, label: t(`grades.${grade}`) }))]} />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="upload-description">{t('upload.descriptionLabel')}</label>
          <textarea id="upload-description" className="field__control field__textarea" value={form.description} onChange={(event) => setField('description', event.target.value)} placeholder={t('upload.descriptionPlaceholder')} aria-invalid={Boolean(errors.description)} />
          {errors.description && <p className="field__error">{errors.description}</p>}
        </div>
        <div className="field">
          <span className="field__label">{t('upload.fileLabel')}</span>
          <div className={`drop-zone ${dragActive ? 'is-active' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragActive(true) }} onDragLeave={() => setDragActive(false)} onDrop={(event) => { event.preventDefault(); setDragActive(false); handleFile(event.dataTransfer.files[0]) }}>
            <input ref={fileInputRef} id="upload-file" type="file" accept=".pdf,.docx,.png,.jpg,.jpeg" onChange={(event) => handleFile(event.target.files[0])} />
            <label htmlFor="upload-file">
              <strong>{t('upload.dropTitle')}</strong>
              <span>{t('upload.dropSubtitle')}</span>
              <em>{form.file ? t('actions.changeFile') : t('actions.chooseFile')}</em>
            </label>
          </div>
          {form.file && <p className="upload-form__selected">{t('upload.selectedFile')}: {form.file.name}</p>}
          {errors.file && <p className="field__error">{errors.file}</p>}
        </div>
        <Button type="submit">{t('actions.submitUpload')}</Button>
      </form>

      <aside className="upload-summary">
        {uploadedFile ? (
          <>
            <Badge tone="success">{t('upload.successTitle')}</Badge>
            <h2>{t('upload.summary')}</h2>
            <p>{t('upload.successDescription')}</p>
            <dl>
              <div><dt>{t('upload.titleLabel')}</dt><dd>{uploadedFile.title[i18n.language]}</dd></div>
              <div><dt>{t('search.subject')}</dt><dd>{t(`subjects.${uploadedFile.subject}`)}</dd></div>
              <div><dt>{t('search.fileType')}</dt><dd>{t(`types.${uploadedFile.fileType}`)}</dd></div>
            </dl>
          </>
        ) : (
          <>
            <h2>{t('upload.summary')}</h2>
            <p>{t('upload.subtitle')}</p>
          </>
        )}
      </aside>
    </div>
  )
}

export default UploadForm
