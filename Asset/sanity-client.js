;(() => {
  const defaults = {
    projectId: '<PROJECT_ID>',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
  }

  const cfg = {...defaults, ...(window.SANITY_CONFIG || {})}
  const apiHost = cfg.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io'

  const buildQueryUrl = (query, params = {}) => {
    const usp = new URLSearchParams({query})
    Object.entries(params).forEach(([key, value]) => {
      usp.append(`$${key}`, JSON.stringify(value))
    })
    return `https://${cfg.projectId}.${apiHost}/v${cfg.apiVersion}/data/query/${cfg.dataset}?${usp.toString()}`
  }

  async function sanityFetch(query, params = {}) {
    if (!cfg.projectId || cfg.projectId.startsWith('<')) {
      throw new Error('Configura SANITY_CONFIG.projectId in Asset/sanity-config.js')
    }
    const url = buildQueryUrl(query, params)
    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Sanity fetch error (${res.status}): ${text}`)
    }
    const json = await res.json()
    return json.result || []
  }

  function imageUrlFromRef(ref, {width} = {}) {
    if (!ref || !cfg.projectId || cfg.projectId.startsWith('<')) return ''
    const [, id, size, format] = ref.split('-') // image-<id>-<width>x<height>-<fmt>
    if (!id || !size || !format) return ''
    if (!width) {
      return `https://cdn.sanity.io/images/${cfg.projectId}/${cfg.dataset}/${id}-${size}.${format}`
    }
    const [origW, origH] = size.split('x').map(Number)
    const height = Math.round((width / origW) * origH)
    return `https://cdn.sanity.io/images/${cfg.projectId}/${cfg.dataset}/${id}-${width}x${height}.${format}`
  }

  function portableTextToHtml(blocks = []) {
    return blocks
      .map((block) => {
        if (!block || block._type !== 'block' || !block.children) return ''
        const text = block.children.map((span) => span.text || '').join('')
        if (!text) return ''
        const tag = block.style === 'h2' ? 'h2' : 'p'
        return `<${tag}>${text}</${tag}>`
      })
      .join('')
  }

  window.SanityClient = {
    config: cfg,
    fetch: sanityFetch,
    imageUrlFromRef,
    portableTextToHtml,
  }
})()
