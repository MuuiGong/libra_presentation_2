import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import rebalanceFlowImage from "./image 1.png";

function Button({ children, className = "", variant = "primary", disabled = false, ...props }) {
  const baseClassName = "nav-button";
  const variantClassName = variant === "secondary" ? "nav-button secondary" : "nav-button primary";

  return (
    <button
      type="button"
      className={`${baseClassName} ${variantClassName} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

const slides = [
  {
    type: "hero",
    eyebrow: "Agentic AI 기반",
    title: "다이렉트 인덱싱\n포트폴리오 자동 리밸런싱\n및 비용 최적화 시스템",
    subtitle: "",
  },
  {
    type: "problem",
    kicker: "문제 정의",
    title: "왜 이 시스템이 필요한가",
    quote:
      "\"투자 철학이 있는 직장인 개인 투자자는 시장 변동으로 포트폴리오 비중이 지속적으로 틀어지지만, 이를 스스로 관리할 시간과 전문성이 부족하고 기존 자동화 도구는 개인의 철학을 반영하지 못한다.\"",
    cards: [
      {
        title: "시간 제약",
        body: "KRX 거래 시간(09:00~15:30)은 직장인 근무 시간과 완전히 겹친다.",
      },
      {
        title: "감정적 편향",
        body: "공포와 탐욕에 의한 패닉셀과 뇌동매매로 리밸런싱 기회를 스스로 놓치기 쉽다.",
      },
      {
        title: "비용 판단 불가",
        body: "수수료와 슬리피지를 계산하지 않으면 리밸런싱이 오히려 손해가 될 수 있다.",
      },
    ],
  },
  {
    type: "compare",
    kicker: "문제 정의",
    title: "기존 자동화 도구의 한계",
    headers: ["구분", "개인화", "자동화", "비용 최적화", "핵심 한계 / 특징"],
    gridTemplateColumns: "1.15fr 0.8fr 0.8fr 0.95fr 1.7fr",
    rows: [
      ["ETF\nBuy & Hold", "X", "✓", "✓", "운용사 전략 강제\n개인 철학 반영 불가"],
      ["로보어드바이저", "X", "✓", "△", "전략 설계 불가\n블랙박스 의사결정"],
      ["다이렉트\n인덱싱", "✓", "✓", "X", "단순 비중 이탈 기준\n비용 최적화 없음"],
      ["LIBRA OS", "✓", "✓", "✓", "E[ΔU] > C 검증\nMulti-Agent AI 판단"],
    ],
  },
  {
    type: "contrast",
    kicker: "문제 정의",
    title: "왜 지금인가 - Agentic AI의 등장",
    leftTitle: "1세대 로보어드바이저의 실패",
    leftItems: [
      {
        title: "낮은 수익률",
        body: "연환산 3~4%대, 코스피200 하회",
      },
      {
        title: "반쪽 자동화",
        body: "AI 추천만, 실행은 수동",
      },
      {
        title: "수익 구조 문제",
        body: "낮은 수수료 -> 기술 투자 불가 -> 적자",
      },
      {
        title: "타이밍 미스",
        body: "금투세 폐지, 직접 투자 선호 트렌드",
      },
    ],
    rightTitle: "Agentic AI로 처음 가능해진 것들",
    rightItems: [
      {
        title: "자연어 시장 해석",
        body: "뉴스와 공시를 LLM이 직접 분석해 투자 판단에 실시간 반영",
      },
      {
        title: "다중 에이전트 교차 검증",
        body: "Signal, Risk, Sentiment 에이전트가 독립적으로 판단한 뒤 합의",
      },
      {
        title: "설명 가능한 AI",
        body: "판단 근거를 텍스트 로그로 저장해 블랙박스 문제를 줄임",
      },
    ],
  },
  {
    type: "compare",
    kicker: "Difference",
    title: "그래서 LIBRA OS는 무엇이 다른가",
    description: "우리는 추천 시스템이 아니라, 비용 계산과 검증을 포함한 자동 운용 시스템을 만든다.",
    headers: ["비교 항목", "기존 자동화", "현재 다이렉트 인덱싱", "LIBRA OS"],
    rows: [
      ["판단 방식", "규칙 중심", "알고리즘 + 사람 판단", "AI 분석 + 리밸런싱 + 검증"],
      ["실행 기준", "정해진 규칙에 따라 실행", "비중 이탈 중심", "비용과 위험을 먼저 계산"],
      ["판단 설명", "제한적", "제한적", "판단 이유와 차단 이유를 로그로 저장"],
      ["시장 정보 반영", "정형 데이터 위주", "전문가 개입 중심", "뉴스·공시·시세를 함께 반영"],
      ["세금·수수료 고려", "약함", "일부 반영", "실행 전 순이득 기준으로 판단"],
    ],
  },
  {
    type: "split",
    kicker: "Value",
    title: "우리가 만드는 것과 사용자가 얻는 것",
    description: "목표는 시장을 이기는 것이 아니라, 개인 포트폴리오를 더 효율적이고 투명하게 운용하게 만드는 것이다.",
    leftTitle: "우리가 만드는 것",
    leftItems: [
      "사용자가 고른 5~15개 종목 포트폴리오",
      "정기 실행과 비중 이탈 감지 기반 리밸런싱",
      "비용이 이득보다 클 때는 실행하지 않는 구조",
      "판단, 차단, 주문 결과가 모두 기록되는 시스템",
    ],
    rightTitle: "사용자가 얻는 것",
    rightItems: [
      "반복적인 관리 부담 감소",
      "감정 개입이 줄어든 실행",
      "세후 수익률과 비용 관리 개선",
      "왜 실행했는지 사후 확인 가능",
    ],
  },
  {
    type: "flow",
    kicker: "Service Flow",
    title: "서비스는 이렇게 동작한다",
    description: "설정에서 끝나지 않고, 판단과 실행과 기록까지 한 흐름으로 연결한다.",
    steps: [
      {
        title: "포트폴리오 설정",
        body: "종목, 목표 비중, 거래비용, 실행 기준을 입력한다.",
      },
      {
        title: "시장 데이터 수집",
        body: "시세, 뉴스, 공시, 지표를 모아 판단 재료를 만든다.",
      },
      {
        title: "AI 판단",
        body: "분석, 리밸런싱, 검증 에이전트가 순서대로 판단한다.",
      },
      {
        title: "비용·안전 확인",
        body: "순이득 계산과 가드레일을 통과한 경우만 실행한다.",
      },
      {
        title: "주문·기록",
        body: "주문 결과와 판단 로그를 대시보드에 남긴다.",
      },
    ],
  },
  {
    type: "feature",
    kicker: "Feature 1",
    title: "포트폴리오 설정",
    description: "자동 운용의 시작점이다. 사용자가 종목과 목표 비중을 직접 정한다.",
    input: "종목 검색어, 선택 종목 5~15개, 목표 비중",
    process: "종목 수와 비중 합계 100%를 검증하고 포트폴리오를 저장한다.",
    output: "포트폴리오 ID와 자동 실행 대기 상태가 만들어진다.",
  },
  {
    type: "feature",
    kicker: "Feature 1",
    title: "거래비용 설정",
    description: "수수료와 슬리피지 기준이 있어야 실행이 이득인지 판단할 수 있다.",
    input: "수수료, 슬리피지, 포트폴리오 ID",
    process: "음수나 허용 한도를 벗어난 값을 막고 즉시 판단 기준에 반영한다.",
    output: "비용 정책이 저장되고 총 거래비용 기준이 정해진다.",
  },
  {
    type: "feature",
    kicker: "Feature 1",
    title: "실행 조건 설정",
    description: "언제 자동으로 돌릴지와 얼마나 벗어났을 때 움직일지를 정한다.",
    input: "정기 실행 시간, 비중 이탈 임계치, 쿨다운 조건",
    process: "스케줄러와 임계치 감시 기준을 시스템에 등록한다.",
    output: "월별 자동 실행과 이벤트 실행 기준이 준비된다.",
  },
  {
    type: "feature",
    kicker: "Feature 2",
    title: "AI 판단 합의",
    description: "세 에이전트가 같은 결정을 다른 관점에서 확인한다.",
    input: "실시간 시세, 뉴스·공시, 시장 지표",
    process:
      "분석 에이전트가 시장을 읽고, 리밸런싱 에이전트가 수량을 계산하고, 검증 에이전트가 최종 승인 여부를 결정한다.",
    output: "실행 모드와 종목별 판단 결과가 만들어진다.",
  },
  {
    type: "feature",
    kicker: "Feature 2",
    title: "비용 대비 효익 판단",
    description: "비용보다 이득이 클 때만 움직이도록 막아주는 핵심 기준이다.",
    input: "포트폴리오 정보, 거래비용, 세금 반영값",
    process: "예상 효익이 거래비용보다 충분히 큰지 계산한다.",
    output: "실행 또는 보류 결정이 내려진다.",
  },
  {
    type: "feature",
    kicker: "Feature 2",
    title: "가드레일과 주문 처리",
    description: "판단이 끝나도 바로 주문하지 않고, 마지막 안전 검사를 거친다.",
    input: "후보 주문, 가드레일 규칙, 증권사 API",
    process: "위험 주문을 차단하고 통과한 주문만 모의 매수·매도로 전송한다.",
    output: "주문 결과와 차단 이력, 판단 로그가 함께 저장된다.",
  },
  {
    type: "architecture",
    kicker: "Architecture",
    title: "전체 아키텍처",
    compactHeader: true,
  },
  {
    type: "image",
    kicker: "Execution",
    title: "리밸런싱 실행 흐름",
    compactHeader: true,
    image: rebalanceFlowImage,
    alt: "리밸런싱 실행 흐름",
    notes: [
      "현재 상태와 목표 비중 차이를 먼저 계산한다.",
      "실행 전 비용과 위험을 다시 확인한다.",
      "검증을 통과한 주문만 실제 실행으로 넘어간다.",
    ],
  },
  {
    type: "split",
    kicker: "Interfaces",
    title: "외부와 내부는 이렇게 연결된다",
    leftTitle: "외부 연결",
    leftItems: [
      "KIS Open API: 시세 수신, 모의 주문 실행",
      "Google Gemini API: 뉴스와 텍스트 추론",
      "뉴스 RSS / 공시 / 크롤러: 판단용 텍스트 수집",
    ],
    rightTitle: "내부 연결",
    rightItems: [
      "Spring API ↔ Python 오케스트레이션: HTTP POST",
      "Spring ↔ Kafka: 이벤트 발행과 후속 처리",
      "Python ↔ MySQL: 판단과 로그 저장",
      "사용자 화면 ↔ 백엔드: 설정, 대시보드, 기록 조회",
    ],
  },
  {
    type: "dual",
    kicker: "Scope",
    title: "어디까지 자동화하고, 어디서 멈추는가",
    leftTitle: "자동화하는 범위",
    leftItems: [
      "포트폴리오 구성, 비용 정책, 세금 계산 자동화",
      "드리프트 감지, AI 판단, 주문 실행",
      "판단 로그 저장, 재현 테스트, 차단 이력 조회",
      "운영자 화면으로 상태 추적",
    ],
    rightTitle: "이번 단계에서 하지 않는 것",
    rightItems: [
      "종목 자동 추천과 투자 철학 생성",
      "모든 예외 상황까지 포함한 절세 전략 전체 최적화",
      "수익률 보장이나 시장 초과 수익 약속",
      "해외 거래소와 다중 증권사 연동",
    ],
  },
  {
    type: "dashboard",
    kicker: "Standards",
    title: "시스템은 이 정도 수준으로 동작해야 한다",
    items: [
      {
        title: "전체 실행 시간",
        value: "120초 이내",
        note: "시세 수집부터 저장까지 한 번의 자동 실행 기준",
      },
      {
        title: "에이전트 한 단계",
        value: "30초 이내",
        note: "분석, 리밸런싱, 검증 각각 측정",
      },
      {
        title: "정기 실행 성공률",
        value: "99% 이상",
        note: "30일 기준 자동 실행 성공률",
      },
      {
        title: "같은 입력 재현",
        value: "100% 일치",
        note: "과거 판단을 다시 돌려도 결과가 같아야 함",
      },
      {
        title: "가드레일 누락",
        value: "0건",
        note: "막아야 할 주문이 통과하면 안 됨",
      },
      {
        title: "기록 보호",
        value: "해시 보장",
        note: "판단 로그를 위변조할 수 없게 저장",
      },
    ],
    footer: "추가로 투자자와 운영자 권한을 분리하고, 실패 상황은 실시간 알림과 재처리로 복구한다.",
  },
  {
    type: "split",
    kicker: "Validation",
    title: "어떻게 검증하고, 무엇을 조심하는가",
    leftTitle: "검증 방식",
    leftItems: [
      "2019년부터 2024년까지 백테스트",
      "같은 종목 방치와 AI 리밸런싱 결과 비교",
      "샤프 비율, MDD, 세후 수익률로 평가",
      "학습 구간과 검증 구간을 분리해 과적합 방지",
    ],
    rightTitle: "주의할 한계",
    rightItems: [
      "투자 철학이 없는 사용자에게는 ETF가 더 나을 수 있다",
      "LLM 환각을 막기 위해 단독 판단을 금지한다",
      "백테스트와 실제 차이는 out-of-sample로 일부 방어한다",
      "합의 실패 시 재시도 후 보류로 종료한다",
    ],
  },
  {
    type: "team",
    kicker: "Team",
    title: "팀 역할",
    members: [
      {
        name: "종원",
        role: "AI 설계 및 리드",
        body: "AI 판단 근거 설계, 프롬프트 구조화, 코드 품질 총괄",
      },
      {
        name: "재용",
        role: "AI 구현 및 인프라",
        body: "Python 서버, Gemini 연동, 응답 속도 최적화, 배포 안정화",
      },
      {
        name: "현지",
        role: "백엔드",
        body: "포트폴리오 관리, 주문 전송, 가드레일, 스케줄러, 판단 로그 저장",
      },
      {
        name: "은채",
        role: "프론트엔드 + 디자인",
        body: "대시보드, 설정 UI, 시각화, 판단 기록 화면, 시연 UX 완성",
      },
    ],
  },
  {
    type: "dual",
    kicker: "Monthly Plan",
    title: "월별 일정",
    leftTitle: "4월",
    leftItems: [
      "AI 구조와 수식 확정",
      "서버, 백엔드, 프론트 뼈대 구축",
      "증권 API와 Gemini 연결",
      "대시보드 기본 화면 완성",
    ],
    rightTitle: "5월",
    rightItems: [
      "가드레일, 로그, 재현성 검증",
      "속도 최적화와 배포 자동화",
      "차트, 판단 기록, 차단 이력 화면 완성",
      "발표용 데이터와 시연 동선 마무리",
    ],
  },
  {
    type: "roadmap",
    kicker: "April Plan",
    title: "4월 주차별 일정",
    columns: [
      {
        title: "종원",
        items: [
          "1주차: 3단계 에이전트 흐름 확정",
          "2주차: 비용 대비 효익 수식과 점수 계산 방식 구체화",
          "3주차: 뉴스·공시 기반 프롬프트 설계",
          "4주차: Python·Spring 핵심 코드 리뷰",
        ],
      },
      {
        title: "재용",
        items: [
          "1주차: AWS, DB, Docker, Python 환경 구축",
          "2주차: Python 서버 뼈대 및 Gemini 연동 테스트",
          "3주차: 뉴스 분석 AI 구현 및 백엔드 연결",
          "4주차: 수량 계산과 최종 검증 로직 통합",
        ],
      },
      {
        title: "현지",
        items: [
          "1주차: Spring Boot와 포트폴리오 DB 구조 설계",
          "2주차: 한국투자증권 API 시세 연동 및 종목·비중 저장 기능 구현",
          "3주차: 정기 스케줄러와 비중 이탈 감지 기능 개발",
          "4주차: Kafka 뼈대 구성 및 AI 결정 DB 저장 로직 작성",
        ],
      },
      {
        title: "은채",
        items: [
          "1주차: 대시보드 구조와 와이어프레임 설계",
          "2주차: 로그인·회원가입과 종목/비중 입력 화면 개발",
          "3주차: 포트폴리오 현황 메인 대시보드 구현",
          "4주차: 거래 정책 설정 화면과 백엔드 연동 완성",
        ],
      },
    ],
  },
  {
    type: "roadmap",
    kicker: "May Plan",
    title: "5월 주차별 일정",
    columns: [
      {
        title: "종원",
        items: [
          "1주차: 판단 기록 해싱 저장 구조 점검",
          "2주차: 동일 입력 재실행 재현성 테스트",
          "3주차: 환각 방어 로직과 프롬프트 개선",
          "4주차: 응답 속도와 성능 검증, 발표용 데이터 추출",
        ],
      },
      {
        title: "재용",
        items: [
          "1주차: AI 결과를 읽기 쉬운 JSON으로 정리",
          "2주차: 체감 지연을 줄이기 위한 응답 속도 최적화",
          "3주차: 자동 배포와 로그 모니터링 환경 구축",
          "4주차: 병목 구간 점검과 서버 안정화",
        ],
      },
      {
        title: "현지",
        items: [
          "1주차: 7단계 가드레일과 차단 이력 기록 기능 구현",
          "2주차: 모의 매수·매도 주문 API 연동 완성",
          "3주차: 판단 로그·입력값·가드레일 결과 해싱 저장",
          "4주차: 스케줄러·가드레일 통합 테스트",
        ],
      },
      {
        title: "은채",
        items: [
          "1주차: 차단 이력과 투자 심리 지표 화면 구현",
          "2주차: 비중 이탈·수익률 시각화 차트 연동",
          "3주차: AI 판단 기록 상세 보기 화면 완성",
          "4주차: 로딩 상태와 시연 동선 포함 UX 최종 점검",
        ],
      },
    ],
  },
  {
    type: "dual",
    kicker: "Budget",
    title: "예산과 사용 계획",
    leftTitle: "예산",
    leftItems: [
      "교육자료 구입비: 30만 원",
      "정보수집비: 70만 원",
      "서버는 EC2, RDS, S3 기준으로 사용",
      "AI API 비용은 추론 호출량 기준으로 집행",
    ],
    rightTitle: "사용 원칙",
    rightItems: [
      "개발과 검증에 직접 필요한 비용부터 집행한다.",
      "서버와 API 사용량은 시연 준비 시점까지 관리한다.",
      "학습 자료는 실제 구현과 검증에 필요한 것만 구매한다.",
      "불필요한 지출보다 시연 완성도와 안정성 확보를 우선한다.",
    ],
  },
];

function SlideHeader({ kicker, title, description, compact = false }) {
  return (
    <div className={`slide-header ${compact ? "compact" : ""}`.trim()}>
      {kicker ? <p className="slide-kicker">{kicker}</p> : null}
      <h2 className={`slide-title ${compact ? "compact" : ""}`.trim()}>{title}</h2>
      {description ? <p className="slide-description">{description}</p> : null}
    </div>
  );
}

function HeroSlide({ slide }) {
  return (
    <div className="slide hero-slide">
      <div className="hero-block">
        {slide.eyebrow ? <p className="hero-eyebrow">{slide.eyebrow}</p> : null}
        <h1 className="hero-title">{slide.title}</h1>
        {slide.subtitle ? <p className="hero-subtitle">{slide.subtitle}</p> : null}
      </div>
    </div>
  );
}

function ProblemSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} />
      <div className="problem-quote">{slide.quote}</div>
      <div className="problem-grid">
        {slide.cards.map((card) => (
          <article key={card.title} className="problem-card">
            <h3 className="problem-card-title">{card.title}</h3>
            <p className="problem-card-body">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function StatementSlide({ slide }) {
  return (
    <div className="slide statement-slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} />
      <p className="statement-body">{slide.body}</p>
      <div className="statement-points">
        {slide.points.map((point) => (
          <article key={point} className="statement-point">
            {point}
          </article>
        ))}
      </div>
    </div>
  );
}

function ContrastSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} />
      <div className="contrast-grid">
        <section className="contrast-panel">
          <div className="contrast-band">{slide.leftTitle}</div>
          <div className="contrast-items">
            {slide.leftItems.map((item) => (
              <article key={item.title} className="contrast-item">
                <h3 className="contrast-item-title">{item.title}</h3>
                <p className="contrast-item-body">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="contrast-panel">
          <div className="contrast-band">{slide.rightTitle}</div>
          <div className="contrast-items">
            {slide.rightItems.map((item) => (
              <article key={item.title} className="contrast-item">
                <h3 className="contrast-item-title">{item.title}</h3>
                <p className="contrast-item-body">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SplitSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} />
      <div className="split-grid">
        <section className="panel">
          <h3 className="panel-title">{slide.leftTitle}</h3>
          <ul className="panel-list">
            {slide.leftItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="panel">
          <h3 className="panel-title">{slide.rightTitle}</h3>
          <ul className="panel-list">
            {slide.rightItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function FeatureSlide({ slide }) {
  return (
    <div className="slide feature-slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} compact />
      <div className="feature-grid">
        <article className="feature-box">
          <p className="spec-label">입력</p>
          <p className="feature-text">{slide.input}</p>
        </article>
        <article className="feature-box">
          <p className="spec-label">처리</p>
          <p className="feature-text">{slide.process}</p>
        </article>
        <article className="feature-box">
          <p className="spec-label">결과</p>
          <p className="feature-text">{slide.output}</p>
        </article>
      </div>
    </div>
  );
}

function FlowSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} />
      <div className="flow-grid">
        {slide.steps.map((step, index) => (
          <article key={step.title} className="flow-card">
            <div className="flow-index">{index + 1}</div>
            <h3 className="card-title">{step.title}</h3>
            <p className="card-body">{step.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SpecSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} />
      <div className="spec-stack">
        {slide.items.map((item) => (
          <article key={item.title} className="spec-card">
            <h3 className="spec-title">{item.title}</h3>
            <div className="spec-grid">
              <div className="spec-box">
                <p className="spec-label">입력</p>
                <p className="spec-text">{item.input}</p>
              </div>
              <div className="spec-box">
                <p className="spec-label">처리</p>
                <p className="spec-text">{item.process}</p>
              </div>
              <div className="spec-box">
                <p className="spec-label">결과</p>
                <p className="spec-text">{item.output}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ArchitectureSlide({ slide }) {
  return (
    <div className="slide architecture-slide">
      <SlideHeader
        kicker={slide.kicker}
        title={slide.title}
        description={slide.description}
        compact={slide.compactHeader}
      />
      <div className="architecture-shell">
        <svg viewBox="0 0 1200 760" className="architecture-svg" role="img" aria-label="LIBRA OS architecture">
          <defs>
            <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="#6b7280" />
            </marker>
          </defs>

          <path d="M310 200 L430 200" className="arch-arrow" />
          <path d="M770 200 L890 200" className="arch-arrow" />
          <path d="M1010 320 L1010 520 L830 520" className="arch-arrow" />
          <path d="M600 520 L600 620" className="arch-arrow dashed" />
          <path d="M370 560 L520 360" className="arch-arrow dashed" />

          <g className="arch-panel">
            <rect x="40" y="90" width="270" height="230" rx="30" />
            <text x="70" y="138" className="arch-panel-title">
              데이터 수집 계층
            </text>
            <rect x="70" y="162" width="210" height="42" rx="16" className="arch-node" />
            <text x="88" y="189" className="arch-node-text">
              KIS 시세 / 환율 / 변동성 지표
            </text>
            <rect x="70" y="216" width="210" height="42" rx="16" className="arch-node" />
            <text x="88" y="243" className="arch-node-text">
              뉴스 RSS / KRX 공시
            </text>
            <rect x="70" y="270" width="210" height="42" rx="16" className="arch-node" />
            <text x="88" y="297" className="arch-node-text">
              종토방 / 텍스트 크롤링
            </text>
          </g>

          <g className="arch-panel">
            <rect x="430" y="60" width="340" height="300" rx="34" />
            <text x="460" y="108" className="arch-panel-title">
              Agentic AI 코어
            </text>
            <rect x="460" y="132" width="280" height="46" rx="16" className="arch-node strong" />
            <text x="478" y="161" className="arch-node-text strong">
              분석 에이전트
            </text>
            <rect x="460" y="188" width="280" height="46" rx="16" className="arch-node" />
            <text x="478" y="217" className="arch-node-text">
              리밸런싱 에이전트
            </text>
            <rect x="460" y="244" width="280" height="46" rx="16" className="arch-node" />
            <text x="478" y="273" className="arch-node-text">
              검증 에이전트
            </text>
            <rect x="460" y="300" width="280" height="36" rx="14" className="arch-node muted" />
            <text x="478" y="323" className="arch-node-text small">
              비용·세금·가드레일 판단
            </text>
          </g>

          <g className="arch-panel">
            <rect x="890" y="90" width="270" height="230" rx="30" />
            <text x="920" y="138" className="arch-panel-title">
              백엔드 실행 계층
            </text>
            <rect x="920" y="162" width="210" height="42" rx="16" className="arch-node" />
            <text x="938" y="189" className="arch-node-text">
              Spring Boot API
            </text>
            <rect x="920" y="216" width="210" height="42" rx="16" className="arch-node" />
            <text x="938" y="243" className="arch-node-text">
              Kafka / 이벤트 처리
            </text>
            <rect x="920" y="270" width="210" height="42" rx="16" className="arch-node" />
            <text x="938" y="297" className="arch-node-text">
              MySQL / KIS 주문 실행
            </text>
          </g>

          <g className="arch-panel">
            <rect x="120" y="470" width="250" height="128" rx="28" />
            <text x="150" y="516" className="arch-panel-title">
              백테스팅 엔진
            </text>
            <text x="150" y="552" className="arch-copy">
              Python + Backtrader
            </text>
            <text x="150" y="584" className="arch-copy">
              학습/검증 구간 분리
            </text>
          </g>

          <g className="arch-panel">
            <rect x="420" y="620" width="420" height="94" rx="30" />
            <text x="450" y="662" className="arch-panel-title">
              사용자 화면
            </text>
            <text x="450" y="694" className="arch-copy">
              포트폴리오 설정 · 대시보드 · Decision Trace · 차단 이력
            </text>
          </g>

          <text x="330" y="188" className="arch-link-label">
            시장 데이터
          </text>
          <text x="790" y="188" className="arch-link-label">
            판단 결과
          </text>
          <text x="854" y="540" className="arch-link-label">
            실행 결과
          </text>
          <text x="625" y="592" className="arch-link-label">
            사용자에게 제공
          </text>
          <text x="312" y="452" className="arch-link-label">
            검증 피드백
          </text>
        </svg>
      </div>
    </div>
  );
}

function ImageSlide({ slide }) {
  return (
    <div className="slide image-focus-slide">
      <SlideHeader
        kicker={slide.kicker}
        title={slide.title}
        description={slide.description}
        compact={slide.compactHeader}
      />
      <div className="image-layout image-layout-focus">
        <div className="image-frame">
          <img src={slide.image} alt={slide.alt} className="slide-image" />
        </div>
        <div className="image-notes image-notes-inline">
          {slide.notes.map((note) => (
            <article key={note} className="card note-card">
              <p className="card-body">{note}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompareSlide({ slide }) {
  const gridTemplateColumns = slide.gridTemplateColumns || `repeat(${slide.headers.length}, minmax(0, 1fr))`;

  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} />
      <div className="compare-table">
        <div className="compare-row compare-header" style={{ gridTemplateColumns }}>
          {slide.headers.map((header) => (
            <div key={header} className="compare-cell compare-heading">
              {header}
            </div>
          ))}
        </div>
        {slide.rows.map((row) => (
          <div key={row[0]} className="compare-row" style={{ gridTemplateColumns }}>
            {row.map((cell, index) => (
              <div key={`${row[0]}-${index}`} className={`compare-cell ${index === 0 ? "compare-label" : ""}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} />
      <div className="dashboard-grid">
        {slide.items.map((item) => (
          <article key={item.title} className="dashboard-card">
            <p className="dashboard-label">{item.title}</p>
            <p className="dashboard-value">{item.value}</p>
            <p className="dashboard-note">{item.note}</p>
          </article>
        ))}
      </div>
      {slide.footer ? <p className="dashboard-footer">{slide.footer}</p> : null}
    </div>
  );
}

function TeamSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} />
      <div className="cards-grid cards-2">
        {slide.members.map((member) => (
          <article key={member.name} className="card">
            <div className="member-head">
              <h3 className="card-title">{member.name}</h3>
              <span className="member-role">{member.role}</span>
            </div>
            <p className="card-body">{member.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function RoadmapSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} />
      <div className="roadmap-table">
        {slide.columns.map((column) => (
          <section key={column.title} className="roadmap-column">
            <h3 className="roadmap-title">{column.title}</h3>
            <div className="roadmap-items">
              {column.items.map((item) => (
                <p key={item} className="roadmap-item">
                  {item}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function DualSlide({ slide }) {
  return (
    <div className="slide">
      <SlideHeader kicker={slide.kicker} title={slide.title} description={slide.description} />
      <div className="split-grid">
        <section className="panel">
          <h3 className="panel-title">{slide.leftTitle}</h3>
          <ul className="panel-list">
            {slide.leftItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="panel">
          <h3 className="panel-title">{slide.rightTitle}</h3>
          <ul className="panel-list">
            {slide.rightItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function renderSlide(slide) {
  switch (slide.type) {
    case "hero":
      return <HeroSlide slide={slide} />;
    case "problem":
      return <ProblemSlide slide={slide} />;
    case "statement":
      return <StatementSlide slide={slide} />;
    case "contrast":
      return <ContrastSlide slide={slide} />;
    case "split":
      return <SplitSlide slide={slide} />;
    case "feature":
      return <FeatureSlide slide={slide} />;
    case "flow":
      return <FlowSlide slide={slide} />;
    case "spec":
      return <SpecSlide slide={slide} />;
    case "architecture":
      return <ArchitectureSlide slide={slide} />;
    case "image":
      return <ImageSlide slide={slide} />;
    case "compare":
      return <CompareSlide slide={slide} />;
    case "dashboard":
      return <DashboardSlide slide={slide} />;
    case "team":
      return <TeamSlide slide={slide} />;
    case "roadmap":
      return <RoadmapSlide slide={slide} />;
    case "dual":
      return <DualSlide slide={slide} />;
    default:
      return null;
  }
}

export default function SlidePresentation() {
  const [index, setIndex] = useState(0);
  const wheelLockRef = useRef(0);

  const next = () => setIndex((current) => Math.min(current + 1, slides.length - 1));
  const prev = () => setIndex((current) => Math.max(current - 1, 0));

  const handleWheel = (event) => {
    const now = Date.now();
    if (now - wheelLockRef.current < 500) return;
    if (Math.abs(event.deltaY) < 18) return;

    wheelLockRef.current = now;
    if (event.deltaY > 0) next();
    else prev();
  };

  const handleSurfaceClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;

    if (x < rect.width * 0.18) prev();
    if (x > rect.width * 0.82) next();
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") next();
      if (event.key === "ArrowLeft" || event.key === "PageUp") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <main className="slide-surface" onWheel={handleWheel} onClick={handleSurfaceClick}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="slide-motion"
        >
          {renderSlide(slides[index])}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
