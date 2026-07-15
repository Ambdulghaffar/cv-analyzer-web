export type SkillStatus = "found" | "missing" | "partial"
export type SkillWeight = "required" | "preferred"

export interface ScoreBreakdown {
  skills_required: number
  skills_preferred: number
  experience: number
  education: number
  presentation: number
}

export interface SkillAnalysis {
  skill: string
  status: SkillStatus
  weight: SkillWeight
}

export interface AnalysisResult {
  global_score: number
  breakdown: ScoreBreakdown
  skills_analysis: SkillAnalysis[]
  strengths: string[]
  improvements: string[]
}

export interface AnalysisHistoryItem {
  id: string
  job_title: string | null
  global_score: number
  created_at: string
}

export interface CandidateRanking {
  filename: string
  analysis: AnalysisResult
}

export interface RankingResult {
  job_title: string | null
  candidates: CandidateRanking[]
}

export interface RankingHistoryItem {
  id: string
  job_title: string | null
  candidate_count: number
  created_at: string
}
