const viewingDetail=new URLSearchParams(location.search).has('slug');const chosenTemplate=document.getElementById(viewingDetail?'project-template':'home-template');const fragment=chosenTemplate.content.cloneNode(true);document.body.replaceChildren(fragment);document.body.dataset.page=viewingDetail?'project':'home';
/* 프로젝트 데이터: 텍스트만 수정하면 카드와 상세 페이지에 함께 반영됩니다. */

(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const projects = data?.projects || [];
  const $ = (selector) => document.querySelector(selector);
  const html = (val) => String(val ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  const badges = (arr) => (arr || []).map(t => `<span>${html(t)}</span>`).join('');
  const detailLink = (project) => `index.html?slug=${encodeURIComponent(project.slug)}`;

  function projectCard(p, idx, featured) {
    const tagHTML = `<div class="stack-tags">${badges(p.tags)}</div>`;
    const cardTop = `<div class="project-card-top"><div class="category-line"><span class="mini-label">${html(p.category)}</span>${featured ? '<span class="featured-word">FEATURED</span>' : ''}</div><span class="card-index">${String(idx + 1).padStart(2, '0')}</span></div>`;
    const left = `<div class="card-col">${cardTop}<h3><a href="${detailLink(p)}">${html(p.title)}</a></h3><span class="period">${html(p.period)}</span><p class="summary">${html(p.summary)}</p>${featured && p.award ? `<div class="award-line">◇ &nbsp;${html(p.award)}</div>` : ''}${featured ? '' : `<ul class="highlights">${p.highlights.map(t=>`<li>${html(t)}</li>`).join('')}</ul>${tagHTML}`}</div>`;
    const right = featured ? `<div class="card-col"><ul class="highlights">${p.highlights.map(t=>`<li>${html(t)}</li>`).join('')}</ul>${tagHTML}</div>` : '';
    const evidence = data?.technicalDetails?.[p.slug];
    const referenceLink = evidence?.github ? `<a class="github-profile-link" href="${html(evidence.github)}" target="_blank" rel="noopener noreferrer">⌘ 관련 GitHub 코드</a>` : (evidence?.source ? `<a class="github-profile-link" href="${html(evidence.source)}" target="_blank" rel="noopener noreferrer">↗ Notion 원본 기록</a>` : "");
    const bottom = `<div class="project-card-footer"><a class="case-link" href="${detailLink(p)}">케이스 스터디 보기 &nbsp;→</a>${referenceLink}</div>`;
    return `<article class="project-card ${featured ? 'featured-card' : ''}">${left}${right}${bottom}</article>`;
  }

  function setupCards(){
    const featured = $('#featured-projects');
    const others = $('#other-projects');
    if (!featured || !others) return;
    const buttons = [...document.querySelectorAll('[data-filter]')];
    const status = $('#filter-status');
    const empty = $('#empty-state');
    function render(filter){
      const matches = projects.filter(p => filter === 'all' || p.filter === filter || (Array.isArray(p.filters) && p.filters.includes(filter)));
      const primary = matches.filter(p => p.featured);
      const secondary = matches.filter(p => !p.featured);
      featured.innerHTML = primary.map(p => projectCard(p,projects.indexOf(p),true)).join('');
      others.innerHTML = secondary.map(p => projectCard(p,projects.indexOf(p),false)).join('');
      featured.hidden = !primary.length;
      others.hidden = !secondary.length;
      empty.hidden = !!matches.length;
      status.textContent = `${matches.length}개의 프로젝트가 표시됩니다.`;
      buttons.forEach(b => { const active = b.dataset.filter === filter; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active)); });
    }
    buttons.forEach(b => b.addEventListener('click', () => render(b.dataset.filter)));
    const requestedFilter = new URLSearchParams(location.search).get('filter');
    const validFilters = new Set(buttons.map(b => b.dataset.filter));
    render(validFilters.has(requestedFilter) ? requestedFilter : 'all');
  }

  function setupMenu(){
    const button = $('.mobile-menu-button');
    const menu = $('#mobile-menu');
    if (!button || !menu) return;
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded',String(!expanded));
      button.setAttribute('aria-label',expanded?'메뉴 열기':'메뉴 닫기');
      menu.hidden = expanded;
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.hidden = true;
      button.setAttribute('aria-expanded','false');
    }));
  }

  function setupCopy(){
    const toast = $('#toast');
    let toastHandle = 0;
    document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
      const val = button.dataset.copy;
      let success = false;
      try{ if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(val);success = true;} }
      catch(error){ success = false; }
      if(!success){ const ta = document.createElement('textarea');ta.value=val;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{success=document.execCommand('copy');}catch(error){}ta.remove(); }
      if(toast){toast.textContent=success?'클립보드에 복사했습니다.':'복사할 수 없습니다. 주소를 직접 선택해 주세요.';toast.classList.add('show');window.clearTimeout(toastHandle);toastHandle=window.setTimeout(()=>toast.classList.remove('show'),2200);}
    }));
  }



  function renderWaveformGallery(p){
    const g=window.PORTFOLIO?.waveforms?.[p.slug];
    if(!g)return;
    const images=(g.images||[]).map((v,i)=>'<figure class="waveform-card" id="waveform-'+i+'"><a class="waveform-image-link" href="'+html(v.src)+'" target="_blank" rel="noopener noreferrer" title="파형 원본을 새 창에서 확대"><img src="'+html(v.src)+'" alt="'+html(v.title)+'" loading="lazy" decoding="async"><span class="waveform-zoom">원본 파형 확대 ↗</span></a><figcaption><span class="waveform-number">FIG '+String(i+1).padStart(2,'0')+'</span><strong>'+html(v.title)+'</strong><p>'+html(v.caption)+'</p></figcaption></figure>').join('');
    const links=(g.links||[]).map(v=>'<a class="waveform-link" href="'+html(v.url)+'" target="_blank" rel="noopener noreferrer">'+html(v.title)+' <span aria-hidden="true">↗</span></a>').join('');
    const txt=g.note?'<p class="waveform-note">'+html(g.note)+'</p>':'';
    const intro=images ? '<p>기존 프로젝트 저장소에 보관된 실제 회로 구조도, 시뮬레이션 파형, Logic Analyzer·Coverage 결과 및 실보드 사진입니다. 이미지를 클릭하면 원본을 확인할 수 있습니다.</p>' : '<p>CAN 원본 파형은 아래 Notion 자료 링크에서 확인할 수 있습니다. 임의 생성 파형으로 대체하지 않았습니다.</p>';
    const content='<section class="section waveform-section" id="waveform-evidence"><div class="container"><div class="section-intro"><span class="section-num">04.6 <span></span> ACTUAL VERIFICATION MATERIAL</span><h2>원본 설계 자료 · 검증 파형 · 실보드 사진</h2>'+intro+'</div>'+(images?'<div class="waveform-grid">'+images+'</div>':'')+txt+(links?'<div class="waveform-source-links">'+links+'</div>':'')+'</div></section>';
    const engineering=document.querySelector('#engineering-detail');
    if(engineering)engineering.insertAdjacentHTML('afterend',content);
  }

  function renderEngineeringDetails(p){
    const d=window.PORTFOLIO?.technicalDetails?.[p.slug];
    if(!d)return;
    const itemList=(values)=>'<ul class="engineering-list">'+(values||[]).map(v=>'<li>'+html(v)+'</li>').join('')+'</ul>';
    const specs=d.spec?.length?'<div class="engineering-table-wrap"><table class="engineering-table"><thead><tr><th>설계 항목</th><th>설정 / 구현</th><th>확인 목적</th></tr></thead><tbody>'+d.spec.map(row=>'<tr>'+row.map(v=>'<td>'+html(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':'';
    const implementations=(d.implementation||[]).map((b,i)=>'<article class="engineering-module"><div class="engineering-module-no">'+String(i+1).padStart(2,'0')+'</div><div><h3>'+html(b.title)+'</h3>'+itemList(b.items)+'</div></article>').join('');
    const debugs=d.debug?.length?'<div class="engineering-subhead"><span>ROOT CAUSE ANALYSIS</span><h3>트러블슈팅: 원인부터 검증까지</h3></div><div class="debug-grid">'+d.debug.map((v,i)=>'<article class="debug-card"><div class="debug-index">ISSUE '+String(i+1).padStart(2,'0')+'</div><h4>'+html(v.issue)+'</h4><dl><div><dt>발견 / 원인</dt><dd>'+html(v.cause)+'</dd></div><div><dt>설계 수정</dt><dd>'+html(v.action)+'</dd></div><div><dt>확인 결과</dt><dd>'+html(v.result)+'</dd></div></dl>'+(v.evidenceIndices?.length?'<div class="debug-evidence-links">'+v.evidenceIndices.map((n,j)=>'<a href="#waveform-'+Number(n)+'">관련 원본 자료 '+String(j+1)+' 확인 ↗</a>').join('')+'</div>':'')+'</article>').join('')+'</div>':'';
    const checks=d.checks?.length?'<div class="engineering-subhead"><span>VERIFICATION EVIDENCE</span><h3>무엇으로 확인했는가</h3></div><div class="engineering-table-wrap"><table class="engineering-table"><thead><tr><th>검증 항목</th><th>확인 결과</th><th>확인 범위</th></tr></thead><tbody>'+d.checks.map(row=>'<tr>'+row.map(v=>'<td>'+html(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':'';
    const links=(d.source?'<a class="evidence-link" target="_blank" rel="noopener noreferrer" href="'+html(d.source)+'">Notion 상세 기록 ↗</a>':'')+(d.github?'<a class="evidence-link" target="_blank" rel="noopener noreferrer" href="'+html(d.github)+'">관련 GitHub 코드 ↗</a>':'');
    const content='<section class="section section-alt engineering-section" id="engineering-detail"><div class="container"><div class="section-intro"><span class="section-num">04.5 <span></span> ENGINEERING DETAILS</span><h2>설계의 근거와 검증을 남겼습니다</h2><p>단순 기능 나열보다 구현 조건, 판단 근거, 원인 분석, 검증 범위를 우선해 정리했습니다.</p></div><div class="engineering-focus"><span>DESIGN FOCUS</span><p>'+html(d.focus)+'</p></div>'+specs+'<div class="engineering-subhead"><span>IMPLEMENTATION</span><h3>주요 구현 내용</h3></div><div class="engineering-modules">'+implementations+'</div>'+debugs+checks+(d.scope?'<p class="engineering-scope"><strong>검증 범위 / 한계</strong> '+html(d.scope)+'</p>':'')+(links?'<div class="evidence-links">'+links+'</div>':'')+'</div></section>';
    const deep=$('#deep-content');
    const deepSection=deep?.closest('section');
    if(deepSection)deepSection.insertAdjacentHTML('afterend',content);
    if(d.github){
      const heroGithub=document.querySelector('.project-actions a[href="'+html(window.PORTFOLIO.github)+'"]');
      if(heroGithub){heroGithub.href=d.github;heroGithub.textContent='⌘ 관련 GitHub 코드';}
    }
  }

  function setupProjectDetail(){
    if(document.body.dataset.page !== 'project') return;
    const slug = new URLSearchParams(window.location.search).get('slug') || 'can-adas';
    const p = projects.find(entry => entry.slug === slug);
    if(!p){
      document.title='프로젝트를 찾을 수 없습니다 | 이찬미';
      $('#main').innerHTML='<section class="section"><div class="container"><h1>프로젝트를 찾을 수 없습니다.</h1><p>목록에서 프로젝트를 다시 선택해 주세요.</p><a class="btn btn-green" href="index.html#projects">프로젝트 목록으로</a></div></section>';
      return;
    }
    document.title=`${p.title} | 이찬미`;
    $('#project-category').textContent=p.category;
    $('#featured-word').hidden=!p.featured;
    $('#project-period').textContent=p.period;
    $('#project-period-secondary').textContent=p.period;
    $('#project-title').textContent=p.title;
    $('#project-summary').textContent=p.summary;
    $('#project-role').textContent=p.role;
    $('#file-index').textContent=String(projects.indexOf(p)+1).padStart(2,'0');
    $('#project-award').innerHTML=p.award?`<div class="award-badge">◇ &nbsp;${html(p.award)}</div>`:'';
    $('#project-stack').innerHTML=badges(p.tags);
    const projectActions = document.querySelector('.project-actions');
    if(projectActions && window.PORTFOLIO?.technicalDetails?.[p.slug]){
      projectActions.insertAdjacentHTML('beforeend','<a class="btn btn-outline" href="#engineering-detail">주요 구현 내용 ↓</a>');
    }
    if(projectActions && window.PORTFOLIO?.waveforms?.[p.slug]){
      projectActions.insertAdjacentHTML('beforeend','<a class="btn btn-outline" href="#waveform-evidence">검증 파형·자료 ↓</a>');
    }
    $('#context-tags').innerHTML=badges(p.tags.slice(0,5));
    $('#project-context').textContent=p.context;
    const probs = p.problems && p.problems.length?p.problems : [{label:'핵심 설계 과제',text:p.summary},{label:'검증 관점',text:p.highlights[0]}];
    $('#problem-heading').textContent=p.problems?.length?'부딪힌 문제':'주요 설계 과제';
    $('#project-problems').innerHTML=probs.map((item,i)=>`<div class="problem-item"><span>${String(i+1).padStart(2,'0')}</span><div><strong>${html(item.label)}</strong>${html(item.text)}</div></div>`).join('');
    $('#project-steps').innerHTML=p.steps.map((step,i)=>`<article class="step-card"><div class="step-number">STEP ${String(i+1).padStart(2,'0')}</div><h3>${html(step.heading)}</h3><p>${html(step.text)}</p></article>`).join('');
    const flow = p.architecture || [];
    $('#project-graphic').innerHTML=`<div class="graphic-top"><span>SYSTEM / DATA PATH</span><span>${html(p.tags[0] || 'RTL')}</span></div><div class="graphic-trace"></div><div class="flow-diagram">${flow.map((v,i) => `${i?'<span class="flow-arrow" aria-hidden="true">›</span>':''}<div class="flow-node">${html(v)}</div>`).join('')}</div><div class="graphic-caption">SYSTEM ARCHITECTURE OVERVIEW</div>`;
    const deep=$('#deep-content');
    if(p.comparisons?.length && p.layers?.length){
      deep.innerHTML=`<div class="deep-grid"><article class="deep-card"><div class="deep-card-head"><h3>${html(p.deepLeftTitle)}</h3><p>${html(p.deepLeftIntro)}</p></div><div>${p.comparisons.map(row=>`<div class="compare-row"><span>${html(row[0])}</span><span class="compare-old">${html(row[1])}</span><span class="compare-new">${html(row[2])}</span></div>`).join('')}</div></article><article class="deep-card"><div class="deep-card-head"><h3>${html(p.deepRightTitle)}</h3><p>하드웨어 제어와 애플리케이션 판단의 책임을 구분했습니다.</p></div>${p.layers.map(row=>`<div class="layer-row"><div class="layer-name"><span>${html(row[0])}</span>${html(row[1])}</div><p>${html(row[2])}</p></div>`).join('')}</article></div>`;
    }else{
      deep.innerHTML=`<div class="verification-panel"><article class="module-architecture"><h3>SYSTEM ARCHITECTURE</h3><div class="arch-steps">${flow.map((v,i)=>`${i?'<b aria-hidden="true">→</b>':''}<span>${html(v)}</span>`).join('')}</div></article><article class="design-note"><h3>주요 구현 내용</h3><ul class="check-list">${(p.highlights||[]).map(t=>`<li>${html(t)}</li>`).join('')}</ul></article></div>`;
      $('#deep-intro').textContent='프로젝트의 데이터 경로와 주요 구현 기능을 중심으로 정리했습니다.';
    }
    $('#verification-list').innerHTML=(p.verification||[]).map(v=>`<li>${html(v)}</li>`).join('');
    const results = p.results || window.PORTFOLIO?.technicalDetails?.[p.slug]?.metrics || [{value:'구현',label:'주요 기능',detail:p.highlights?.[0]||''}];
    $('#project-results').innerHTML=results.map(item=>`<div><strong>${html(item.value)}</strong><span>${html(item.label)}</span><small>${html(item.detail)}</small></div>`).join('');
    renderEngineeringDetails(p);
    renderWaveformGallery(p);
    $('#project-takeaway').textContent=p.takeaway;
    const next=projects[(projects.indexOf(p)+1)%projects.length];
    $('#next-project-link').href=detailLink(next);
    $('#next-project-name').textContent=next.title;
  }

  setupMenu();
  setupCards();
  setupCopy();
  setupProjectDetail();
  if (location.hash && (viewingDetail || new Set(['#about','#featured','#projects','#experience','#capabilities','#education','#contact']).has(location.hash))) {
    requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({block:'start'}));
  }
})();

