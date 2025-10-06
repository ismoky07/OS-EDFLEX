"""
Custom tools for Path Recommender Agent (Agent 2.2)

This module contains tools for generating personalized content recommendations,
building adaptive learning paths, and optimizing content discovery for learners.
"""

from agno.tools import tool
from typing import Dict, List, Optional
import json
from datetime import datetime, timedelta


# =============================================================================
# TOOL 1: Get Learner Profile
# =============================================================================

@tool(show_result=True)
def get_learner_profile(user_id: str) -> Dict:
    """
    Retrieve the complete learner profile for recommendation purposes.

    This is the PRIMARY input for all recommendations. It provides the Path Recommender
    with comprehensive insights about the learner's preferences, skill gaps, and behavior.

    Args:
        user_id: Unique identifier for the learner

    Returns:
        Complete learner profile including preferences, skill gaps, learning style

    Example:
        >>> get_learner_profile(user_id="User123")
        {
            'user_id': 'User123',
            'content_preferences': {'preferred_format': 'video', ...},
            'skill_gaps': [{'skill': 'Data Analytics', 'priority': 'high'}, ...],
            'learning_style': {'dominant_style': 'visual', ...},
            'behavioral_patterns': {'peak_learning_hours': ['18:00-20:00'], ...}
        }
    """
    # TODO: Query learner profile from database
    # This retrieves the profile built by Agent 2.1 (Learner Profiler)

    # Placeholder - in production, this would call get_learner_profile_from_db
    sample_profile = {
        "user_id": user_id,
        "content_preferences": {
            "preferred_format": "video",
            "optimal_duration_minutes": 15,
            "preferred_difficulty": "intermediate",
            "preferred_language": "English"
        },
        "skill_gaps": [
            {"skill": "Data Analytics", "priority": "high"},
            {"skill": "SEO Strategy", "priority": "medium"}
        ],
        "learning_style": {
            "dominant_style": "visual",
            "scores": {"visual": 85, "auditory": 45}
        },
        "behavioral_patterns": {
            "peak_learning_hours": ["18:00-20:00"],
            "sessions_per_week": 4.2,
            "learning_pace": "moderate"
        },
        "engagement_metrics": {
            "engagement_score": 72,
            "completion_rate_percent": 68
        }
    }

    return sample_profile


# =============================================================================
# TOOL 2: Search Content Catalog
# =============================================================================

@tool(show_result=True)
def search_content_catalog(
    query: Optional[str] = None,
    skills: Optional[List[str]] = None,
    format: Optional[str] = None,
    difficulty: Optional[str] = None,
    language: Optional[str] = None,
    duration_max_minutes: Optional[int] = None,
    limit: int = 10
) -> List[Dict]:
    """
    Search Edflex's 100k+ content catalog with advanced filters.

    Supports semantic search by query text and filtering by multiple criteria.
    Returns ranked results based on relevance and quality scores.

    Args:
        query: Text search query (semantic search on title, description, tags)
        skills: List of skills to filter by (e.g., ["Data Analytics", "Python"])
        format: Content format (video, article, podcast, interactive)
        difficulty: Difficulty level (beginner, intermediate, advanced)
        language: Content language (e.g., "English", "French")
        duration_max_minutes: Maximum content duration in minutes
        limit: Maximum number of results to return (default: 10)

    Returns:
        List of matching content items with metadata

    Example:
        >>> search_content_catalog(
        ...     skills=["Data Analytics"],
        ...     format="video",
        ...     difficulty="beginner",
        ...     duration_max_minutes=20,
        ...     limit=5
        ... )
        [
            {
                'content_id': 'V456',
                'title': 'Introduction to Data Analytics',
                'description': 'Learn the fundamentals...',
                'format': 'video',
                'duration_minutes': 15,
                'difficulty': 'beginner',
                'skills_covered': ['Data Analytics', 'Statistics'],
                'publisher': 'LinkedIn Learning',
                'quality_score': 92,
                'average_rating': 4.7
            },
            ...
        ]
    """
    # TODO: Implement semantic search + filtering on content database
    # This would use vector embeddings for semantic search and SQL filters

    # Placeholder implementation with sample results
    sample_results = [
        {
            "content_id": "V456",
            "title": "Introduction to Data Analytics",
            "description": "Learn the fundamentals of data analytics including data collection, cleaning, and visualization",
            "format": "video",
            "duration_minutes": 15,
            "difficulty": "beginner",
            "language": "English",
            "skills_covered": ["Data Analytics", "Statistics Basics"],
            "publisher": "LinkedIn Learning",
            "instructor": "John Data",
            "quality_score": 92,
            "average_rating": 4.7,
            "total_reviews": 1240,
            "prerequisites": [],
            "learning_objectives": [
                "Understand what data analytics is",
                "Learn basic statistical concepts",
                "Create simple data visualizations"
            ],
            "created_at": "2024-06-15",
            "updated_at": "2025-09-01"
        },
        {
            "content_id": "V789",
            "title": "Data Analytics with Excel",
            "description": "Master data analytics using Excel's powerful features",
            "format": "video",
            "duration_minutes": 18,
            "difficulty": "beginner",
            "language": "English",
            "skills_covered": ["Data Analytics", "Excel", "Pivot Tables"],
            "publisher": "Coursera",
            "instructor": "Sarah Excel",
            "quality_score": 88,
            "average_rating": 4.5,
            "total_reviews": 890,
            "prerequisites": [],
            "learning_objectives": [
                "Use Excel for data analysis",
                "Create pivot tables and charts",
                "Apply formulas for analytics"
            ],
            "created_at": "2024-08-20",
            "updated_at": "2025-08-15"
        }
    ]

    # Apply filters (simplified for placeholder)
    filtered_results = sample_results

    if format:
        filtered_results = [r for r in filtered_results if r["format"] == format]

    if difficulty:
        filtered_results = [r for r in filtered_results if r["difficulty"] == difficulty]

    if duration_max_minutes:
        filtered_results = [r for r in filtered_results if r["duration_minutes"] <= duration_max_minutes]

    return filtered_results[:limit]


# =============================================================================
# TOOL 3: Calculate Content Relevance Score
# =============================================================================

@tool(show_result=True)
def calculate_content_relevance_score(
    user_profile: Dict,
    content_id: str
) -> float:
    """
    Calculate how relevant a content item is for a specific learner.

    Uses a multi-factor scoring algorithm that considers:
    - Skill gap match (40% weight)
    - Learning preference match (30% weight)
    - Engagement likelihood (30% weight)

    Args:
        user_profile: Learner's complete profile (from get_learner_profile)
        content_id: ID of the content to score

    Returns:
        Relevance score from 0-100

    Example:
        >>> calculate_content_relevance_score(
        ...     user_profile={'skill_gaps': [{'skill': 'Data Analytics'}], ...},
        ...     content_id='V456'
        ... )
        92.5
    """
    # TODO: Implement ML-based relevance scoring
    # This would use a trained model considering multiple factors

    # Placeholder implementation with weighted scoring
    base_score = 70  # Base relevance

    # Factor 1: Skill gap match (40% weight)
    skill_gap_match = 0.9  # 90% match to user's skill gaps
    skill_score = skill_gap_match * 40

    # Factor 2: Preference match (30% weight)
    # Check format, difficulty, duration preferences
    preference_match = 0.85  # 85% match to preferences
    preference_score = preference_match * 30

    # Factor 3: Engagement likelihood (30% weight)
    # Based on similar content engagement
    engagement_likelihood = 0.80  # 80% likely to engage
    engagement_score = engagement_likelihood * 30

    # Calculate total score
    total_score = skill_score + preference_score + engagement_score

    return round(total_score, 1)


# =============================================================================
# TOOL 4: Build Learning Path
# =============================================================================

@tool(show_result=True)
def build_learning_path(
    skill_target: str,
    user_id: str,
    max_content_items: int = 20
) -> Dict:
    """
    Generate a complete, sequenced learning path for a target skill.

    Creates a structured path with:
    - Proper prerequisite ordering
    - Difficulty progression (beginner → intermediate → advanced)
    - Checkpoints and assessments
    - Estimated completion time

    Args:
        skill_target: The skill to build a path for (e.g., "Python Programming")
        user_id: Learner's ID (to personalize path)
        max_content_items: Maximum content items in path (default: 20)

    Returns:
        Structured learning path with phases and content items

    Example:
        >>> build_learning_path(
        ...     skill_target="Python Programming",
        ...     user_id="User123",
        ...     max_content_items=15
        ... )
        {
            'skill_target': 'Python Programming',
            'user_id': 'User123',
            'total_content_items': 12,
            'estimated_duration_hours': 24,
            'phases': [
                {
                    'phase': 1,
                    'phase_name': 'Foundations',
                    'content_items': [...],
                    'phase_duration_hours': 8
                },
                ...
            ]
        }
    """
    # TODO: Implement learning path generation algorithm
    # This would:
    # 1. Query content for the skill
    # 2. Build dependency graph
    # 3. Sequence based on prerequisites
    # 4. Personalize based on user profile

    # Placeholder implementation
    sample_path = {
        "skill_target": skill_target,
        "user_id": user_id,
        "path_generated_at": datetime.utcnow().isoformat() + "Z",
        "total_content_items": 12,
        "estimated_total_duration_hours": 24,
        "estimated_completion_date": (datetime.utcnow() + timedelta(days=35)).isoformat()[:10],
        "difficulty_progression": "beginner_to_advanced",

        "phases": [
            {
                "phase": 1,
                "phase_name": "Foundations",
                "phase_duration_hours": 8,
                "checkpoint": "Quiz: Foundations of " + skill_target,
                "content_items": [
                    {
                        "sequence": 1,
                        "content_id": "V001",
                        "title": skill_target + " Basics",
                        "type": "content",
                        "format": "video",
                        "duration_minutes": 20,
                        "difficulty": "beginner",
                        "skills_covered": [skill_target],
                        "why_included": "Introduction to core concepts"
                    },
                    {
                        "sequence": 2,
                        "content_id": "A002",
                        "title": skill_target + " Setup Guide",
                        "type": "content",
                        "format": "article",
                        "duration_minutes": 15,
                        "difficulty": "beginner",
                        "skills_covered": [skill_target],
                        "why_included": "Hands-on environment setup"
                    }
                ]
            },
            {
                "phase": 2,
                "phase_name": "Core Concepts",
                "phase_duration_hours": 10,
                "checkpoint": "Project: Build a simple application",
                "content_items": [
                    {
                        "sequence": 3,
                        "content_id": "V003",
                        "title": "Intermediate " + skill_target,
                        "type": "content",
                        "format": "video",
                        "duration_minutes": 45,
                        "difficulty": "intermediate",
                        "skills_covered": [skill_target],
                        "why_included": "Building on foundations"
                    }
                ]
            }
        ],

        "prerequisites": [],
        "certification_available": skill_target + " Certification",
        "personalization_notes": "Path adapted to your visual learning preference with 70% video content"
    }

    return sample_path


# =============================================================================
# TOOL 5: Get Next Best Content
# =============================================================================

@tool(show_result=True)
def get_next_best_content(
    user_id: str,
    count: int = 5
) -> List[Dict]:
    """
    Real-time recommendation of the next best content for a learner.

    This is the CORE recommendation function. It considers:
    - Current learning path progress
    - Recent activity and momentum
    - Skill priorities (gaps + business goals)
    - Engagement patterns and preferences
    - Time of day and availability

    Args:
        user_id: Unique identifier for the learner
        count: Number of recommendations to return (default: 5)

    Returns:
        List of recommended content items with scores and reasoning

    Example:
        >>> get_next_best_content(user_id="User123", count=3)
        [
            {
                'content_id': 'V456',
                'title': 'Introduction to Data Analytics',
                'relevance_score': 92,
                'recommendation_reason': 'skill_gap_high_priority',
                'context': 'Addresses your top skill gap'
            },
            ...
        ]
    """
    # TODO: Implement real-time recommendation algorithm
    # This would use collaborative filtering + content-based filtering

    # Placeholder implementation
    sample_recommendations = [
        {
            "content_id": "V456",
            "title": "Introduction to Data Analytics",
            "format": "video",
            "duration_minutes": 15,
            "difficulty": "beginner",
            "skills_covered": ["Data Analytics", "Statistics"],
            "relevance_score": 92,
            "recommendation_reason": "skill_gap_high_priority",
            "context": "Addresses your top skill gap (Data Analytics)",
            "estimated_value": "high",
            "engagement_prediction": 0.88
        },
        {
            "content_id": "A123",
            "title": "Excel for Data Analysis",
            "format": "article",
            "duration_minutes": 10,
            "difficulty": "beginner",
            "skills_covered": ["Excel", "Data Analytics"],
            "relevance_score": 85,
            "recommendation_reason": "complementary_skill_format_diversity",
            "context": "Complements Data Analytics with practical Excel skills",
            "estimated_value": "medium",
            "engagement_prediction": 0.82
        }
    ]

    return sample_recommendations[:count]


# =============================================================================
# TOOL 6: Log Recommendation
# =============================================================================

@tool(show_result=False)
def log_recommendation(
    user_id: str,
    content_id: str,
    recommendation_reason: str,
    context: Dict
) -> Dict:
    """
    Log why a recommendation was made for A/B testing and improvement.

    Tracks:
    - What was recommended
    - Why it was recommended
    - Context (position, score, user state)
    - Timestamp

    Args:
        user_id: Learner who received the recommendation
        content_id: Content that was recommended
        recommendation_reason: Why this was recommended (e.g., "skill_gap_match")
        context: Additional context (position in list, relevance score, etc.)

    Returns:
        Confirmation of logged recommendation

    Example:
        >>> log_recommendation(
        ...     user_id="User123",
        ...     content_id="V456",
        ...     recommendation_reason="skill_gap_high_priority",
        ...     context={"position": 1, "relevance_score": 92}
        ... )
        {'status': 'logged', 'recommendation_id': 'rec_12345'}
    """
    # TODO: Store in recommendations log database

    recommendation_id = f"rec_{hash(user_id + content_id + str(datetime.utcnow())) % 100000}"

    log_entry = {
        "recommendation_id": recommendation_id,
        "user_id": user_id,
        "content_id": content_id,
        "recommendation_reason": recommendation_reason,
        "context": context,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "clicked": None,  # Will be updated if user clicks
        "completed": None  # Will be updated if user completes
    }

    # Database insertion would happen here
    # db.insert("recommendation_logs", log_entry)

    return {
        "status": "logged",
        "recommendation_id": recommendation_id,
        "message": f"Logged recommendation of {content_id} to {user_id}"
    }


# =============================================================================
# TOOL 7: Check Prerequisite Completion
# =============================================================================

@tool(show_result=True)
def check_prerequisite_completion(
    user_id: str,
    content_id: str
) -> Dict:
    """
    Verify if a learner has completed prerequisites for content.

    Prevents recommending advanced content when foundational knowledge is missing.

    Args:
        user_id: Learner's ID
        content_id: Content to check prerequisites for

    Returns:
        Dict with completion status and missing prerequisites

    Example:
        >>> check_prerequisite_completion(
        ...     user_id="User123",
        ...     content_id="V999"
        ... )
        {
            'content_id': 'V999',
            'prerequisites_met': False,
            'missing_prerequisites': [
                {'content_id': 'V001', 'title': 'Python Basics'},
                {'content_id': 'V002', 'title': 'Python Functions'}
            ],
            'completion_percentage': 0.5
        }
    """
    # TODO: Query content prerequisites and user completion status

    # Placeholder implementation
    sample_check = {
        "content_id": content_id,
        "user_id": user_id,
        "prerequisites_met": True,
        "missing_prerequisites": [],
        "completion_percentage": 1.0,
        "ready_to_start": True,
        "recommended_next_step": "You can start this content now"
    }

    return sample_check


# =============================================================================
# TOOL 8: Get Content Metadata
# =============================================================================

@tool(show_result=True)
def get_content_metadata(content_id: str) -> Dict:
    """
    Get detailed metadata about a specific content item.

    Returns comprehensive information to explain WHY content was recommended.

    Args:
        content_id: Unique identifier for the content

    Returns:
        Complete content metadata

    Example:
        >>> get_content_metadata(content_id="V456")
        {
            'content_id': 'V456',
            'title': 'Introduction to Data Analytics',
            'description': 'Learn the fundamentals...',
            'format': 'video',
            'duration_minutes': 15,
            'difficulty': 'beginner',
            'skills_covered': ['Data Analytics'],
            'prerequisites': [],
            'learning_objectives': [...],
            'publisher': 'LinkedIn Learning',
            'instructor': 'John Data',
            'quality_score': 92
        }
    """
    # TODO: Query content database for full metadata

    # Placeholder implementation
    sample_metadata = {
        "content_id": content_id,
        "title": "Introduction to Data Analytics",
        "description": "Learn the fundamentals of data analytics including data collection, cleaning, and visualization techniques",
        "format": "video",
        "duration_minutes": 15,
        "difficulty": "beginner",
        "language": "English",
        "skills_covered": ["Data Analytics", "Statistics Basics", "Data Visualization"],
        "prerequisites": [],
        "learning_objectives": [
            "Understand what data analytics is and its applications",
            "Learn basic statistical concepts",
            "Create simple data visualizations"
        ],
        "publisher": "LinkedIn Learning",
        "instructor": "John Data",
        "instructor_bio": "20+ years experience in data science",
        "quality_score": 92,
        "average_rating": 4.7,
        "total_reviews": 1240,
        "completion_rate": 0.78,
        "tags": ["data", "analytics", "beginner", "statistics"],
        "created_at": "2024-06-15",
        "updated_at": "2025-09-01",
        "url": "https://edflex.com/content/V456"
    }

    return sample_metadata
