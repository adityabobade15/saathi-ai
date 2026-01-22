from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

sentiment_analyzer = None

def load_sentiment_model():
    """
    Lazy-load sentiment analyzer (loads only once)
    """
    global sentiment_analyzer
    if sentiment_analyzer is None:
        sentiment_analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(text: str) -> float:
    """
    Analyze sentiment score of text.
    Returns compound score between -1 and 1.
    """
    load_sentiment_model()

    scores = sentiment_analyzer.polarity_scores(text)
    return scores["compound"]
