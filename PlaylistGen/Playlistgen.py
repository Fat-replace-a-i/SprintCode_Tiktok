from googleapiclient.discovery import build
import random

api_key = "votreclefapi"
youtube = build("youtube", "v3", developerKey=api_key)

def search_video(keywords, max_results=50):
    try:
        search_reasponse = youtube.search().list(
            q=keywords,
            part="id,snippet",
            maxResults=max_results,
            type="video",
            videoDefinition="high",
            fields="items(id(videoId),snippet(publishedAt,channelId,channelTitle,title,description))"
        ).execute()
    except Exception as e:
        print(e)
        return[]
    
    video_ids = [item["id"]["videoId"] for item in search_reasponse["items"]]
    return video_ids

def generate_playlist(artists, genres):
    video_ids = []

    for artist in artists:
        video_ids.extend(search_video(artist, max_results=50))
    
    for genre in genres:
        video_ids.extend(search_video(genre, max_results=50))

    random.shuffle(video_ids)

    playlist = f"https://www.youtube.com/watch_videos?video_ids={','.join(video_ids)}"
    return playlist

artist = ["Sefa", "DrPeacock", "Jack Black"]

genre = ["HardStyle", "Rock", "Phonk"]

playlist = generate_playlist(artist, genre)

print(playlist)