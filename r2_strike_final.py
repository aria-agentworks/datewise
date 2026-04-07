import boto3
import requests
import sys

ACCESS_KEY = 'a970eb068f3a6e1001defd42696cd440'
SECRET_KEY = 'afd7dba583ae4a2225f5c0feede764ada51d69dddad1dc8507d3e3c578dc4ef7'
ENDPOINT = 'https://a970eb068f3a6e1001defd42696cd440.r2.cloudflarestorage.com'
BUCKET = 'qte2wq7f5yx91i2k4uoye3u8pln544fp'
VIDEO_URL = 'https://videos.pexels.com/video-files/8733007/8733007-uhd_2560_1440_30fps.mp4'
DST_KEY = 'RECORDINGS'

def main():
    try:
        print(f"Downloading video from {VIDEO_URL}...")
        response = requests.get(VIDEO_URL, stream=True, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()

        with open('video.mp4', 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)

        print(f"Uploading to R2 bucket '{BUCKET}' as key '{DST_KEY}'...")
        s3 = boto3.client(
            's3',
            endpoint_url=ENDPOINT,
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY,
            region_name='auto'
        )
        s3.upload_file('video.mp4', BUCKET, DST_KEY)
        print("UPLOAD SUCCESS")
        with open('SUCCESS.txt', 'w') as f:
            f.write('SUCCESS')
        print("SUCCESS.txt written")
    except Exception as e:
        print(f"FAILURE: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()