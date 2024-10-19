import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  exampleNews = [
    {
        "title": "Prostate cancer diagnosis missed by GP after PSA test, but caught during visit for a 'crook tooth' - ABC News",
        "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxONF9xMzRuS3RadV9xVGxDa29MT190YXhYNjZBQ0w0OHk1eTkyTVhJZllLSVRRNDFzSTNMZWhxWTAyakRWaXRrTnVBWktvR2p4a1RxNFI2aXRrNzhHS3pxcC04Q0k5R0JMMklfWU1GREhjX1BqNkNRYzZrMkFnWnZadm1IbktkbnI3bDBhS25KM3ozSGQzX1lRWE5aYkpkNnhyOGFYMkd6NFRSR01jX1N4MkRLSdIBUkFVX3lxTFBpSFR3SVZheGxhc3Q2MHhZOWkxalhTODMwaUpxVmJGVVBJSkc3ODlaSXI5QVlkRlhSeU03ekdJZXhCZVdzTzkwamZKaGhsaDhiUFE?oc=5",
        "pubDate": "Mon, 14 Oct 2024 23:54:50 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiswFBVV95cUxONF9xMzRuS3RadV9xVGxDa29MT190YXhYNjZBQ0w0OHk1eTkyTVhJZllLSVRRNDFzSTNMZWhxWTAyakRWaXRrTnVBWktvR2p4a1RxNFI2aXRrNzhHS3pxcC04Q0k5R0JMMklfWU1GREhjX1BqNkNRYzZrMkFnWnZadm1IbktkbnI3bDBhS25KM3ozSGQzX1lRWE5aYkpkNnhyOGFYMkd6NFRSR01jX1N4MkRLSdIBUkFVX3lxTFBpSFR3SVZheGxhc3Q2MHhZOWkxalhTODMwaUpxVmJGVVBJSkc3ODlaSXI5QVlkRlhSeU03ekdJZXhCZVdzTzkwamZKaGhsaDhiUFE?oc=5\" target=\"_blank\">Prostate cancer diagnosis missed by GP after PSA test, but caught during visit for a 'crook tooth'</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">ABC News</font>"
    },
    {
        "title": "Prostate cancer test shown to 'reduce number of deaths' - as charity calls for change - Sky News",
        "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQekZCb292Z05jZmdfcms1MzRTbTJfODBvVElMb0dDLWNwQjduQk5TX1hwd1dnTFl2dnVKRXZ4OWRNZHNBaUdadWp2MmN5WDBpeWN2T3BjaTBlLW1GWXBLcno4akxFdldTTFp1bno5ekxHZnk1T3Y4T1k4UncySTZOeE90NzdqaW1vbVR0S1FuRmpRZldGY215NmZPV2lhY2VpS3lycnhYOU9DZlBWeUxLeGVsTG42ZzVn0gG-AUFVX3lxTE5zY2xFV2R5eWY0OTRFMmNXN29WVnZmSHZrNWxNbzZ6TzQzTjdIb1VSWEZEQUlPNmx6a1NjLUtHanlPTnJLMDNYYUl2UjNyc2hXdnozY1Q5THJvUXJEM240MV9DaHczbl9kNjhleXB3akY0SjlVVGZqRVpJY1Q2TGxpNzRIRnhLdWpPdG85T2U0M3RyWmFKVWFydGlnVjNyR0tOa1kyNF9peThad1hBckNPYjRVUlVtMnlLbTZCSkE?oc=5",
        "pubDate": "Mon, 14 Oct 2024 08:43:52 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiuAFBVV95cUxQekZCb292Z05jZmdfcms1MzRTbTJfODBvVElMb0dDLWNwQjduQk5TX1hwd1dnTFl2dnVKRXZ4OWRNZHNBaUdadWp2MmN5WDBpeWN2T3BjaTBlLW1GWXBLcno4akxFdldTTFp1bno5ekxHZnk1T3Y4T1k4UncySTZOeE90NzdqaW1vbVR0S1FuRmpRZldGY215NmZPV2lhY2VpS3lycnhYOU9DZlBWeUxLeGVsTG42ZzVn0gG-AUFVX3lxTE5zY2xFV2R5eWY0OTRFMmNXN29WVnZmSHZrNWxNbzZ6TzQzTjdIb1VSWEZEQUlPNmx6a1NjLUtHanlPTnJLMDNYYUl2UjNyc2hXdnozY1Q5THJvUXJEM240MV9DaHczbl9kNjhleXB3akY0SjlVVGZqRVpJY1Q2TGxpNzRIRnhLdWpPdG85T2U0M3RyWmFKVWFydGlnVjNyR0tOa1kyNF9peThad1hBckNPYjRVUlVtMnlLbTZCSkE?oc=5\" target=\"_blank\">Prostate cancer test shown to 'reduce number of deaths' - as charity calls for change</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Sky News</font>"
    },
    {
        "title": "London scientists pioneer at-home 'spit test' for prostate cancer - Evening Standard",
        "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPSFNPa3FBdGx0NGtabmlfMXdUMlVDNUk2MFNueEdCYThmVGdyYzlBQkFNNVRIUmZxM1BuTDZRM2o0Y1lWNkhENnliNl9IR0swV1BLSS1EbUNSVnQwRXg1TzhsNUlSRlIwRFpQSkJyR3BOZGVjNW5yT0hvLXVLal9zRVpsY2N0QWVJMWlBX3dvYW5GNFNaSC1ydzM0TGtwNFZmRnpR?oc=5",
        "pubDate": "Mon, 14 Oct 2024 17:28:51 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiowFBVV95cUxPSFNPa3FBdGx0NGtabmlfMXdUMlVDNUk2MFNueEdCYThmVGdyYzlBQkFNNVRIUmZxM1BuTDZRM2o0Y1lWNkhENnliNl9IR0swV1BLSS1EbUNSVnQwRXg1TzhsNUlSRlIwRFpQSkJyR3BOZGVjNW5yT0hvLXVLal9zRVpsY2N0QWVJMWlBX3dvYW5GNFNaSC1ydzM0TGtwNFZmRnpR?oc=5\" target=\"_blank\">London scientists pioneer at-home 'spit test' for prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Evening Standard</font>"
    },
    {
        "title": "NHS guidance on prostate cancer tests slammed for being 'outdated' and costing thousands of lives each year - Daily Mail",
        "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQQ25XQ05aM3NKdjVjQzhmRGk0X0JKSGxfVlZSbnhPZnQzQjlVMkplcWZZVDBUSXh4cW9uanBvMklGZWxSWmVVbDB5QkRzSXY5TDJOMEVPNHBPSXU0bHVTclJfenFHTktWVk9ZZ2xXSVZOemdTN2w3MmEydVBZNmtlX3czbXBfaHBJNXdlR0tKdTdSbU90WXF3RmQtSkw0Sy1GZTZReNIBqgFBVV95cUxPeThzLUI4RFE3NHFBbHlnVlNMVEdIdVdBRGlhVkRjZVdFWXhCbGhSSXhxVzhzclFzUnQxd2tHOEludUZTUnU4M1VnSWhSbVNzSnZ1YXlERzRkbXV2RmxCZjNUTmctUlJVZTZCMEEwQk1mYW5FWUVPUkkydWdSa0YwOXQzUzBRT0dfSHFaN0ZVVmtpSjJEU3lEck56T3NZSDlVOHZjS2pPR2lqQQ?oc=5",
        "pubDate": "Mon, 14 Oct 2024 00:09:27 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMipAFBVV95cUxQQ25XQ05aM3NKdjVjQzhmRGk0X0JKSGxfVlZSbnhPZnQzQjlVMkplcWZZVDBUSXh4cW9uanBvMklGZWxSWmVVbDB5QkRzSXY5TDJOMEVPNHBPSXU0bHVTclJfenFHTktWVk9ZZ2xXSVZOemdTN2w3MmEydVBZNmtlX3czbXBfaHBJNXdlR0tKdTdSbU90WXF3RmQtSkw0Sy1GZTZReNIBqgFBVV95cUxPeThzLUI4RFE3NHFBbHlnVlNMVEdIdVdBRGlhVkRjZVdFWXhCbGhSSXhxVzhzclFzUnQxd2tHOEludUZTUnU4M1VnSWhSbVNzSnZ1YXlERzRkbXV2RmxCZjNUTmctUlJVZTZCMEEwQk1mYW5FWUVPUkkydWdSa0YwOXQzUzBRT0dfSHFaN0ZVVmtpSjJEU3lEck56T3NZSDlVOHZjS2pPR2lqQQ?oc=5\" target=\"_blank\">NHS guidance on prostate cancer tests slammed for being 'outdated' and costing thousands of lives each year</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Daily Mail</font>"
    },
    {
        "title": "Spit test to predict which men will get prostate cancer being hailed as 'holy-grail of healthcare' - The Mirror",
        "link": "https://news.google.com/rss/articles/CBMiggFBVV95cUxNODJnaldNeXlHNThFdURnOFJPOF82ekFNQ1VTX0NjQ0tPVmZrQUJNSkpQNU9JaVZ5TFpBX2xFdGRmMEV4UGQyMUFIY01wbTI1NVVLMFpvN3NKN1JvcV9CTExJZ1B2ZHUtVk9Pc2VzQ1BEby1EUGk2bWdkUEt6ek5CR0VR0gGHAUFVX3lxTE1wSEJRcFRsZi1lTHdCNW16MXM5SzhENzduT2VlbVJZRENyRmFNS1hXZjMzY3N0MUJROHp4ZVdrRVVVN1MtNjdoaEhabkliczlFYmtCcEYtOHB2MUR5SUtYWUJsSjRzWnpXNlczb25YeUhlWHUwYklSYVRpOHMwZkxlbzh0aWJKYw?oc=5",
        "pubDate": "Sat, 12 Oct 2024 16:46:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiggFBVV95cUxNODJnaldNeXlHNThFdURnOFJPOF82ekFNQ1VTX0NjQ0tPVmZrQUJNSkpQNU9JaVZ5TFpBX2xFdGRmMEV4UGQyMUFIY01wbTI1NVVLMFpvN3NKN1JvcV9CTExJZ1B2ZHUtVk9Pc2VzQ1BEby1EUGk2bWdkUEt6ek5CR0VR0gGHAUFVX3lxTE1wSEJRcFRsZi1lTHdCNW16MXM5SzhENzduT2VlbVJZRENyRmFNS1hXZjMzY3N0MUJROHp4ZVdrRVVVN1MtNjdoaEhabkliczlFYmtCcEYtOHB2MUR5SUtYWUJsSjRzWnpXNlczb25YeUhlWHUwYklSYVRpOHMwZkxlbzh0aWJKYw?oc=5\" target=\"_blank\">Spit test to predict which men will get prostate cancer being hailed as 'holy-grail of healthcare'</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Mirror</font>"
    },
    {
        "title": "Oakworth woman's fundraising mission in support of Prostate Cancer UK - Keighley News",
        "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxQVWwwVjhmMTVFVFNzelJDTFRXblZQU2l6NzlvbzNELUkxWWR6V3JveHB1OXRndWFpQkxzWHQweFpDVzFDZVdYaHNqY2VHZEM1WVNSWW9rWEJ3ZFNCdlFmUDE2ZlhCV2JlbUpuVFpGRHc4aWdsNDJKRE9IYzY1WUM4T2tDQWxrUzZZcUVlOVRGZVVpTEE?oc=5",
        "pubDate": "Sun, 13 Oct 2024 11:48:32 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMikwFBVV95cUxQVWwwVjhmMTVFVFNzelJDTFRXblZQU2l6NzlvbzNELUkxWWR6V3JveHB1OXRndWFpQkxzWHQweFpDVzFDZVdYaHNqY2VHZEM1WVNSWW9rWEJ3ZFNCdlFmUDE2ZlhCV2JlbUpuVFpGRHc4aWdsNDJKRE9IYzY1WUM4T2tDQWxrUzZZcUVlOVRGZVVpTEE?oc=5\" target=\"_blank\">Oakworth woman's fundraising mission in support of Prostate Cancer UK</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Keighley News</font>"
    },
    {
        "title": "CANCER : THE BIGGEST KILLER IN ZIM - NewsdzeZimbabwe",
        "link": "https://news.google.com/rss/articles/CBMigAFBVV95cUxNTE9Yck1qeEV0V3dRMUtBaWdsb1lGOWNLZ2xiTmZuV2Jza09ycFNSQmVuVm56RnhDcjl1d0c1VWp0bjF0Qlh5Umw1TUZ3NDJ3M0lBcl9pQkF6b3duRXk4Rk9GcXVLaVVzYzZORk1KT0tCRllZUFI3ZnZ6MkhVbldKSQ?oc=5",
        "pubDate": "Tue, 15 Oct 2024 07:54:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMigAFBVV95cUxNTE9Yck1qeEV0V3dRMUtBaWdsb1lGOWNLZ2xiTmZuV2Jza09ycFNSQmVuVm56RnhDcjl1d0c1VWp0bjF0Qlh5Umw1TUZ3NDJ3M0lBcl9pQkF6b3duRXk4Rk9GcXVLaVVzYzZORk1KT0tCRllZUFI3ZnZ6MkhVbldKSQ?oc=5\" target=\"_blank\">CANCER : THE BIGGEST KILLER IN ZIM</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">NewsdzeZimbabwe</font>"
    },
    {
        "title": "Diabetes drug could cut debilitating side-effects of prostate cancer medicines, research finds - Daily Mail",
        "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxON0xLc1hBYzlEb3JYNG9ST19qSmxod2ljMFZCc3Mta3NVWXpwdEJIenJ4NlRIbDhnQ2dPUy1BWTNiaV9PWUNUMDk2dnQ3M3kzMHFLQ0xWLUlEWlU3XzNJMkJDRTdmcmJPaGpHWEtGR1lhZmtGNGRoMGVMZnB4V3NiRnU1bWZrOTZqV3R3S3JFQ0F5Y2w4VDJmaHBBakxqQWZhblN0NW5IaG7SAa4BQVVfeXFMTUo1c2lwUERrS2NOdVZxaHpWNXM5T0JEb0l1dFQyd3BVLVcxYnZNR25rVjV0RlZaWWVLQ0NlRWNUQkF3cjZDdWg2TFZ3eGp3NVVMUUZ5d2swZ3kzUEtfY1Fod0pPSHlwOEc4bUtndjB5Rk15cGxWRU1YWmM3VGVSaWFWREgtWHA4ZkZzWDdEWlo3ZndrWlNOZ2w4M0daVnBTcGFfeGYyYWZkUFlWUWtR?oc=5",
        "pubDate": "Sun, 13 Oct 2024 01:09:45 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiqAFBVV95cUxON0xLc1hBYzlEb3JYNG9ST19qSmxod2ljMFZCc3Mta3NVWXpwdEJIenJ4NlRIbDhnQ2dPUy1BWTNiaV9PWUNUMDk2dnQ3M3kzMHFLQ0xWLUlEWlU3XzNJMkJDRTdmcmJPaGpHWEtGR1lhZmtGNGRoMGVMZnB4V3NiRnU1bWZrOTZqV3R3S3JFQ0F5Y2w4VDJmaHBBakxqQWZhblN0NW5IaG7SAa4BQVVfeXFMTUo1c2lwUERrS2NOdVZxaHpWNXM5T0JEb0l1dFQyd3BVLVcxYnZNR25rVjV0RlZaWWVLQ0NlRWNUQkF3cjZDdWg2TFZ3eGp3NVVMUUZ5d2swZ3kzUEtfY1Fod0pPSHlwOEc4bUtndjB5Rk15cGxWRU1YWmM3VGVSaWFWREgtWHA4ZkZzWDdEWlo3ZndrWlNOZ2w4M0daVnBTcGFfeGYyYWZkUFlWUWtR?oc=5\" target=\"_blank\">Diabetes drug could cut debilitating side-effects of prostate cancer medicines, research finds</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Daily Mail</font>"
    },
    {
        "title": "New screening trial could save thousands from prostate cancer - The Guardian",
        "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNdm94NDU2YjZUQlJmQTFhU1J0Y2FGWF9rM1lmdTFZdkpyWTZOV0pCdFQ0cExnUXUzYm12dUdrSXo4S1JfWEtMVFFLYkt4LTEwSE9KaFdNbURIclZpYWxYMDFoTnlOUTl2Q0pOQnJtQlVrTkVBcnVjdzNkS3Y3MHp2LUUxS2puSXhQOXZ3cmc0OFFzV2JmQ18xRjZJczdRTlZoZTh4RkI3cmN5SkxnaE9WcFBtMng2YzE1bGNjdk9USHNtVkQ20gHEAUFVX3lxTFAzNE5ETU9pcndtTVdIUk9UWlozUjFhanVONEVBTDc0cy05YnV5WUxHSVgxUWdSSHc5TFRJVUhGUVZuRHg1OS1JbG83Wm5oNXJSOXZaelVXMER2QndBT0otY2pNNVNmclZ0VXNZRk9rNkkyZzlmWmxEdEIyTVZGOUdTSGkxMlhXa2hBT3dGVTFsMUxMbjdxNWVEcFhCMWNDSXhHVm5MYzdUOVpRdmVqN3FQNC1VSDdBNDVoclpCY2t2SmlGY00?oc=5",
        "pubDate": "Sat, 14 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMixAFBVV95cUxNdm94NDU2YjZUQlJmQTFhU1J0Y2FGWF9rM1lmdTFZdkpyWTZOV0pCdFQ0cExnUXUzYm12dUdrSXo4S1JfWEtMVFFLYkt4LTEwSE9KaFdNbURIclZpYWxYMDFoTnlOUTl2Q0pOQnJtQlVrTkVBcnVjdzNkS3Y3MHp2LUUxS2puSXhQOXZ3cmc0OFFzV2JmQ18xRjZJczdRTlZoZTh4RkI3cmN5SkxnaE9WcFBtMng2YzE1bGNjdk9USHNtVkQ20gHEAUFVX3lxTFAzNE5ETU9pcndtTVdIUk9UWlozUjFhanVONEVBTDc0cy05YnV5WUxHSVgxUWdSSHc5TFRJVUhGUVZuRHg1OS1JbG83Wm5oNXJSOXZaelVXMER2QndBT0otY2pNNVNmclZ0VXNZRk9rNkkyZzlmWmxEdEIyTVZGOUdTSGkxMlhXa2hBT3dGVTFsMUxMbjdxNWVEcFhCMWNDSXhHVm5MYzdUOVpRdmVqN3FQNC1VSDdBNDVoclpCY2t2SmlGY00?oc=5\" target=\"_blank\">New screening trial could save thousands from prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Guardian</font>"
    },
    {
        "title": "Can MRIs ensure prostate cancer screening does more good than harm? - STAT",
        "link": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNTVEzYkJkRW4tM3d2TmhfUVhnVWdkQl81STVtY09seWk4anBYeE9YVXVHdmlXNHBCZEVsd0ZjU00tYUFnZmZSU1BTMS1ZY2luTG9fcVp3blA2bFp1V2dRZHdMSzJiRGNaT1BTUWxlYzlWd3Q2Q0xEV29aQ2g1VUE1TTJ1NUg2SVduaVN6YzZfS2xpc3pWNGdPOWk4ZHFIelVsUExlVGx3?oc=5",
        "pubDate": "Wed, 25 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMipgFBVV95cUxNTVEzYkJkRW4tM3d2TmhfUVhnVWdkQl81STVtY09seWk4anBYeE9YVXVHdmlXNHBCZEVsd0ZjU00tYUFnZmZSU1BTMS1ZY2luTG9fcVp3blA2bFp1V2dRZHdMSzJiRGNaT1BTUWxlYzlWd3Q2Q0xEV29aQ2g1VUE1TTJ1NUg2SVduaVN6YzZfS2xpc3pWNGdPOWk4ZHFIelVsUExlVGx3?oc=5\" target=\"_blank\">Can MRIs ensure prostate cancer screening does more good than harm?</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">STAT</font>"
    },
    {
        "title": "Alan Knight: Ex-Portsmouth goalkeeper has prostate cancer - BBC",
        "link": "https://news.google.com/rss/articles/CBMiakFVX3lxTE1aS0czaUpuRXFrNVl3QUQyVzVSNTdFcWtEeHNPcTJyVUZBWHB6UjZ1TlFxZlZlTnVGVkwySVowQmQwMFUzMHNrM2xEcFF5NkpFY1hfTWFlbVRpUXBWcGJJM0Qxa2E2b0c1MXfSAWxBVV95cUxNeTlqTVQ5R3RXU2o5ZWIwbEtvOGt2V21SbHFzdkhVTlFWOVlUOThDZWpuT3pUM0ZFanpaTm1wZVBUWHBKV0pvTXh5ODVKLXBIZFhoNkhpcHdvVG1YZVlWLXB5TkdDQklqVDVkWlk?oc=5",
        "pubDate": "Thu, 10 Oct 2024 15:35:23 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiakFVX3lxTE1aS0czaUpuRXFrNVl3QUQyVzVSNTdFcWtEeHNPcTJyVUZBWHB6UjZ1TlFxZlZlTnVGVkwySVowQmQwMFUzMHNrM2xEcFF5NkpFY1hfTWFlbVRpUXBWcGJJM0Qxa2E2b0c1MXfSAWxBVV95cUxNeTlqTVQ5R3RXU2o5ZWIwbEtvOGt2V21SbHFzdkhVTlFWOVlUOThDZWpuT3pUM0ZFanpaTm1wZVBUWHBKV0pvTXh5ODVKLXBIZFhoNkhpcHdvVG1YZVlWLXB5TkdDQklqVDVkWlk?oc=5\" target=\"_blank\">Alan Knight: Ex-Portsmouth goalkeeper has prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC</font>"
    },
    {
        "title": "Majority of black people think racism played role in failure to test for prostate cancer - The Guardian",
        "link": "https://news.google.com/rss/articles/CBMizAFBVV95cUxQbUhxV3ZqSU5uUVdyRlF0dVByOERQUGNqejFsSTAtQl9RWkNPY3NBU1lNVGFTYU96TXU5Ti1hTk9LWkFteVlXNWNKdEZTOHltazBaV3ZQWWFidnhEWGhqaXdUSWZCd1FEYkltYnpkdFZOUTJ2Y1NPQ3JQSkp5S3ZLSVhPMk9zVWNhMDd1QTRDYmZFZE51VmpMYXNScW9XZnc1UE55LXRfQmQ5SFAyNEJURzBuSzFxWEh4TlZ5ZGh5ZnFfWndvMUlYNlRsUjHSAcwBQVVfeXFMTnUyR2F0U0hldkZKaFRZSmkzbE0yaDdXc2RvNmdLSjk0MTVGV0x1Mnk3WVVVNm1DOHZjYnZ2ZjVyc2JiOC13ZjFNYjNyakZBR185YjRHVlM3X3lsMjhfVnR1azR4NFpicXcxY0N4MHhFa0dXT2NUZjRIRUpJNVZObDBiaUpyS1h2R3RBNXRoR3pjbEs3NnZTZFVITmpZUDZZS3c4MGhiMjVLRDEwcnBCYURsd2FBdnF3dFRKVjRhTkdVWjRMS005Q3ItN2g5?oc=5",
        "pubDate": "Thu, 26 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMizAFBVV95cUxQbUhxV3ZqSU5uUVdyRlF0dVByOERQUGNqejFsSTAtQl9RWkNPY3NBU1lNVGFTYU96TXU5Ti1hTk9LWkFteVlXNWNKdEZTOHltazBaV3ZQWWFidnhEWGhqaXdUSWZCd1FEYkltYnpkdFZOUTJ2Y1NPQ3JQSkp5S3ZLSVhPMk9zVWNhMDd1QTRDYmZFZE51VmpMYXNScW9XZnc1UE55LXRfQmQ5SFAyNEJURzBuSzFxWEh4TlZ5ZGh5ZnFfWndvMUlYNlRsUjHSAcwBQVVfeXFMTnUyR2F0U0hldkZKaFRZSmkzbE0yaDdXc2RvNmdLSjk0MTVGV0x1Mnk3WVVVNm1DOHZjYnZ2ZjVyc2JiOC13ZjFNYjNyakZBR185YjRHVlM3X3lsMjhfVnR1azR4NFpicXcxY0N4MHhFa0dXT2NUZjRIRUpJNVZObDBiaUpyS1h2R3RBNXRoR3pjbEs3NnZTZFVITmpZUDZZS3c4MGhiMjVLRDEwcnBCYURsd2FBdnF3dFRKVjRhTkdVWjRMS005Q3ItN2g5?oc=5\" target=\"_blank\">Majority of black people think racism played role in failure to test for prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Guardian</font>"
    },
    {
        "title": "Prostate cancer spit test could save the NHS £500 million a year - The Institute of Cancer Research",
        "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQZnRTMF95bTNhYmRwdTkwdENpWXBhRUZJNklRZFdaV3ppTUp5Q21ic05JX096OUxYSFp2ZXhXN3VzX1oxTFd2enB4cDRpVERSYm52LVdXWVBVdmY1QWVDampMd0JjeEJqSzhUdWFiNFVDWlhuanpOUTFsVlJUeEZDN2M3QWRvS3A4QWdHMmhxUzNqTzJ5Z2FKRjBNSUVvV0U?oc=5",
        "pubDate": "Mon, 14 Oct 2024 04:34:31 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMinwFBVV95cUxQZnRTMF95bTNhYmRwdTkwdENpWXBhRUZJNklRZFdaV3ppTUp5Q21ic05JX096OUxYSFp2ZXhXN3VzX1oxTFd2enB4cDRpVERSYm52LVdXWVBVdmY1QWVDampMd0JjeEJqSzhUdWFiNFVDWlhuanpOUTFsVlJUeEZDN2M3QWRvS3A4QWdHMmhxUzNqTzJ5Z2FKRjBNSUVvV0U?oc=5\" target=\"_blank\">Prostate cancer spit test could save the NHS £500 million a year</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Institute of Cancer Research</font>"
    },
    {
        "title": "Coaching staff raise money for Prostate Cancer UK - Stockport County",
        "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxPM0JKVUxSSDduQVV5N3M1QnU4cDdjdlE0QVlRakVZSkF5RE45R3o4ZVMtbUE0dUF5cFB4YXhpRmcxaE1qQjh3alBnajRuNjdaU0ZQZFdsUDZPMWhHNWJtYmphU2JtSUZYcG95UmlvZWJ4SWN5d0xScFM3UzV3aVh6MGlNeWFDbnU3WXc?oc=5",
        "pubDate": "Sat, 12 Oct 2024 16:03:22 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiigFBVV95cUxPM0JKVUxSSDduQVV5N3M1QnU4cDdjdlE0QVlRakVZSkF5RE45R3o4ZVMtbUE0dUF5cFB4YXhpRmcxaE1qQjh3alBnajRuNjdaU0ZQZFdsUDZPMWhHNWJtYmphU2JtSUZYcG95UmlvZWJ4SWN5d0xScFM3UzV3aVh6MGlNeWFDbnU3WXc?oc=5\" target=\"_blank\">Coaching staff raise money for Prostate Cancer UK</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Stockport County</font>"
    },
    {
        "title": "The neuroendocrine transition in prostate cancer is dynamic and dependent on ASCL1 - Nature.com",
        "link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTFBsZVRGWGIwaE5tRDUyTlBfU2h3bnhvZmUtdUxMMVAzeU92ZnV0S0FIUS0yM3h5RHJkVWVqYjB6SXVxY1dBaEZiUW5zeWVNOUtSajhZOGJjb242MnU5anBj?oc=5",
        "pubDate": "Fri, 11 Oct 2024 10:03:20 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiX0FVX3lxTFBsZVRGWGIwaE5tRDUyTlBfU2h3bnhvZmUtdUxMMVAzeU92ZnV0S0FIUS0yM3h5RHJkVWVqYjB6SXVxY1dBaEZiUW5zeWVNOUtSajhZOGJjb242MnU5anBj?oc=5\" target=\"_blank\">The neuroendocrine transition in prostate cancer is dynamic and dependent on ASCL1</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Nature.com</font>"
    },
    {
        "title": "Inspiring Bermondsey man opened a gym for prostate cancer patients - Southwark News",
        "link": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQV3RtS296V3FITDVDakZXdkVmcDM4MWpqOE1KaXMwV016WjlQc1RmOXhkbHdYWDlZYWcwbGRTQ0ZmaUp6Ml9nTUQwaWw2N3hxM3h3a2ZBUC0yend2VFlyVXphYTBHdkgzYmpQNTViZlRMVzBydnl4TU53WFpwc01WaWdwY0Y5eENEYjJFcVJCRDRkNHBKbU1YdDFWMksyeGZvS0o2c3VhQkd6ZnhtdExteQ?oc=5",
        "pubDate": "Mon, 14 Oct 2024 17:30:49 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMisAFBVV95cUxQV3RtS296V3FITDVDakZXdkVmcDM4MWpqOE1KaXMwV016WjlQc1RmOXhkbHdYWDlZYWcwbGRTQ0ZmaUp6Ml9nTUQwaWw2N3hxM3h3a2ZBUC0yend2VFlyVXphYTBHdkgzYmpQNTViZlRMVzBydnl4TU53WFpwc01WaWdwY0Y5eENEYjJFcVJCRDRkNHBKbU1YdDFWMksyeGZvS0o2c3VhQkd6ZnhtdExteQ?oc=5\" target=\"_blank\">Inspiring Bermondsey man opened a gym for prostate cancer patients</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Southwark News</font>"
    },
    {
        "title": "‘A simple prostate test saved my life — but I had to fight to get one’ - The Times",
        "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQMllqTFVVd1lVTDJERzNhWGpxOFB1WU13a0hTbHZKU21CLUc4aUJOOElNUFI1dGF2Uy0ybXZ2dGFZQzg3dWpvSjNLWnEzRW83TXA0cGlzZ1ZmazVmaHRMcklfYWxINTI1QXRseGVHNTl2R1U4S0w4UldyWWRRczhxSkR6cmVFbnZWWkRtbDJDUFVRVUxCdzRwTHFHTQ?oc=5",
        "pubDate": "Mon, 14 Oct 2024 06:20:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMimwFBVV95cUxQMllqTFVVd1lVTDJERzNhWGpxOFB1WU13a0hTbHZKU21CLUc4aUJOOElNUFI1dGF2Uy0ybXZ2dGFZQzg3dWpvSjNLWnEzRW83TXA0cGlzZ1ZmazVmaHRMcklfYWxINTI1QXRseGVHNTl2R1U4S0w4UldyWWRRczhxSkR6cmVFbnZWWkRtbDJDUFVRVUxCdzRwTHFHTQ?oc=5\" target=\"_blank\">‘A simple prostate test saved my life — but I had to fight to get one’</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Times</font>"
    },
    {
        "title": "Salford student raises over £500 for Prostate Cancer UK running the half marathon - Salford Now",
        "link": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQTDI4SF91R1ZqMjFsclBQVkY5WmE4WUZpd0FCb3Zhc1o2QkdWREVveGZia3BXLS1JOXliNWQ1UjNrMDhVQlhSZkdvOHFaLWlWSUtmLTl3YmFBNmY1OTVVSVcwd0xxY3hHc3RVTzU2TUk5aWNCY3pvSXVvYXRzd0FGSTdwNkVYdC1DWElndlB6d2V5aWVpeFVfN19FSnBRMHVnRDRIazRiRW1ZcFNfTHBvVFB3TmtlMHlKZ2Z5ekl3?oc=5",
        "pubDate": "Mon, 14 Oct 2024 15:34:41 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMivgFBVV95cUxQTDI4SF91R1ZqMjFsclBQVkY5WmE4WUZpd0FCb3Zhc1o2QkdWREVveGZia3BXLS1JOXliNWQ1UjNrMDhVQlhSZkdvOHFaLWlWSUtmLTl3YmFBNmY1OTVVSVcwd0xxY3hHc3RVTzU2TUk5aWNCY3pvSXVvYXRzd0FGSTdwNkVYdC1DWElndlB6d2V5aWVpeFVfN19FSnBRMHVnRDRIazRiRW1ZcFNfTHBvVFB3TmtlMHlKZ2Z5ekl3?oc=5\" target=\"_blank\">Salford student raises over £500 for Prostate Cancer UK running the half marathon</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Salford Now</font>"
    },
    {
        "title": "Clinical Perspectives from the ARANOTE Trial in Metastatic Hormone-Sensitive Prostate Cancer - Urology Times",
        "link": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQM3hZTzJXbGNfTHpNenFORFpDcWVQX3A5aW9VanFWZl9GSHRYamdVMGZsSXUyX0p6bU5ZTWh0bDI5RWFPOVNSODd2VlJ1djQ3S09lYm55S1FjWkVCTVhYY1hJVHhpQWNiZzVRcUxOd25seUdDTS1HbGlwVjlxQ0JnWWNBV1BMWlJJNnI4eEFQWEFDMkJ5emo3M1Jua3pRQ3k3dm9EZjU4UWc5bHdWN3paWEsybEVSdDRscTJRZy0zaDhYSVJo?oc=5",
        "pubDate": "Mon, 14 Oct 2024 17:12:39 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMixAFBVV95cUxQM3hZTzJXbGNfTHpNenFORFpDcWVQX3A5aW9VanFWZl9GSHRYamdVMGZsSXUyX0p6bU5ZTWh0bDI5RWFPOVNSODd2VlJ1djQ3S09lYm55S1FjWkVCTVhYY1hJVHhpQWNiZzVRcUxOd25seUdDTS1HbGlwVjlxQ0JnWWNBV1BMWlJJNnI4eEFQWEFDMkJ5emo3M1Jua3pRQ3k3dm9EZjU4UWc5bHdWN3paWEsybEVSdDRscTJRZy0zaDhYSVJo?oc=5\" target=\"_blank\">Clinical Perspectives from the ARANOTE Trial in Metastatic Hormone-Sensitive Prostate Cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Urology Times</font>"
    },
    {
        "title": "Pfizer shares positive phase 3 results for Talzenna combination in prostate cancer - PMLiVE",
        "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOaEdyd2lMUnMxOWh5WVl4ZkZMaGhqX0szYTY2MzFmMGpOd0R1UmdMQTJZNFFESV8ydEFqUnJGVWp0dzhmc295MkdhVWlFVXluLTE1T05kRHdOdEdNSWJuS0FyUXQ4V3E4akJsMjhHbWx5SzdMUEd2SlY1ekt5OWRJNXkwWTVOQjF5ZUwtRzZmS2tPdWZEZ2JlNDJ5RURhV2QyYXZyTmgzLXlnMzA5c1BEcTFsU3I?oc=5",
        "pubDate": "Mon, 14 Oct 2024 11:22:38 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMitAFBVV95cUxOaEdyd2lMUnMxOWh5WVl4ZkZMaGhqX0szYTY2MzFmMGpOd0R1UmdMQTJZNFFESV8ydEFqUnJGVWp0dzhmc295MkdhVWlFVXluLTE1T05kRHdOdEdNSWJuS0FyUXQ4V3E4akJsMjhHbWx5SzdMUEd2SlY1ekt5OWRJNXkwWTVOQjF5ZUwtRzZmS2tPdWZEZ2JlNDJ5RURhV2QyYXZyTmgzLXlnMzA5c1BEcTFsU3I?oc=5\" target=\"_blank\">Pfizer shares positive phase 3 results for Talzenna combination in prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">PMLiVE</font>"
    },
    {
        "title": "New hope for prostate cancer: new form of immunotherapy could prevent resistance to hormone therapy - University of Sheffield News",
        "link": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPdU1zeFZfemRPWi1JVGRsVHpRRE51RjJqUzNhSVRjOUthZlhaaGhfTzJXdnE1MjFwX1V6MERtQ2htQl9uSWtYSGlvamRfQ0RyckF3R2tEZFhRTHg1d2dTQnBKcE1PMmNqbTlFSHBSZUgxM3pVVGdPVDVZUTUwYnByVkFyQkNHb1hlcWNkNHUtQ1lBaFU5MGJQaGZBYzdFUEJHOFUtaDVuR0NtSzRZVHhYb1hLQzJsbG1YcDRqWGF3?oc=5",
        "pubDate": "Mon, 05 Aug 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMivgFBVV95cUxPdU1zeFZfemRPWi1JVGRsVHpRRE51RjJqUzNhSVRjOUthZlhaaGhfTzJXdnE1MjFwX1V6MERtQ2htQl9uSWtYSGlvamRfQ0RyckF3R2tEZFhRTHg1d2dTQnBKcE1PMmNqbTlFSHBSZUgxM3pVVGdPVDVZUTUwYnByVkFyQkNHb1hlcWNkNHUtQ1lBaFU5MGJQaGZBYzdFUEJHOFUtaDVuR0NtSzRZVHhYb1hLQzJsbG1YcDRqWGF3?oc=5\" target=\"_blank\">New hope for prostate cancer: new form of immunotherapy could prevent resistance to hormone therapy</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">University of Sheffield News</font>"
    },
    {
        "title": "African Men May Have Higher Risk of Developing Prostate Cancer Earlier - The ASCO Post",
        "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOdEpUWHNNb1BodERBUW9WbkhldkZLZXYwVXItcTJzSXJDMndabEwzZUVUOU1LQ1hwcHNwRFF3NGVoZWZpNmNvZkE5UjY3endMWU9xOVg0U2k2TG9EZFRDcFZHd3dvbU9ycTZQVEh3MHJwMTBLTmFldXV2TTJEN0ZwVGdDem94TmZWYjZ6UUpGNTBiY1htVkZDVmQyUnBhTi1tSWV3MkJwa3Z6Znhya2lV?oc=5",
        "pubDate": "Mon, 14 Oct 2024 15:31:12 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMirwFBVV95cUxOdEpUWHNNb1BodERBUW9WbkhldkZLZXYwVXItcTJzSXJDMndabEwzZUVUOU1LQ1hwcHNwRFF3NGVoZWZpNmNvZkE5UjY3endMWU9xOVg0U2k2TG9EZFRDcFZHd3dvbU9ycTZQVEh3MHJwMTBLTmFldXV2TTJEN0ZwVGdDem94TmZWYjZ6UUpGNTBiY1htVkZDVmQyUnBhTi1tSWV3MkJwa3Z6Znhya2lV?oc=5\" target=\"_blank\">African Men May Have Higher Risk of Developing Prostate Cancer Earlier</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The ASCO Post</font>"
    },
    {
        "title": "New saliva-based prostate cancer test could save NHS £500m - Innovation News Network",
        "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPMDFUWU1tWEFpRUFHTkdCZ25RT1Fma01aWlZDZ1pCWXRmVWlOUUd6eXRRMDEzenFMNTFkNURNdUloV0E3VWRmdWdxVTkxRHZDZjdsbFhON2RBakNoQ3FTckdDZDY0Mi1pYTFyN0plVWhLNE5BVldaQmRQRWxtajJLcExXUkpqQmdfVS1UUG1EbzF3SlBkcUlzMU51VDVfSVN6MmRvUg?oc=5",
        "pubDate": "Mon, 14 Oct 2024 12:36:54 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMipAFBVV95cUxPMDFUWU1tWEFpRUFHTkdCZ25RT1Fma01aWlZDZ1pCWXRmVWlOUUd6eXRRMDEzenFMNTFkNURNdUloV0E3VWRmdWdxVTkxRHZDZjdsbFhON2RBakNoQ3FTckdDZDY0Mi1pYTFyN0plVWhLNE5BVldaQmRQRWxtajJLcExXUkpqQmdfVS1UUG1EbzF3SlBkcUlzMU51VDVfSVN6MmRvUg?oc=5\" target=\"_blank\">New saliva-based prostate cancer test could save NHS £500m</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Innovation News Network</font>"
    },
    {
        "title": "Prostate cancer blood test could save thousands more lives, charity says - Express",
        "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNbTVIcHVvamxLWHR0SjZINzhyd3Bvak9mdjR0SUFnTU1XZl9LTy1renNFLXNDeXlTYVJsczk4QUlSYU1Qc2tHOW1ySHRQOEZobFRsRkdhNDVNMUNyb0VBM3dIRS1ncGp6VE40ZkN3STJyeFRGN2k2Mld0VzZIUHZkTEs2OWZoMlJ4WEHSAY8BQVVfeXFMT1Qta2loLWxFdl9SNzJoTDJwSnNpXzA3T3lzLXMwM0h2RXpmVjNYOTlpTnpvUmFxNXRqRGtNWGNIUkhlZW0xNlNBa3RuZ3FQSkRaTldxNEx5bUxlX3Zob2JYOVdpOGdYS3lBaFBMd0dncnRnVUJUN3VnSWg2RUd2M25iSUFtdFpPWThpd1VsVkU?oc=5",
        "pubDate": "Sun, 13 Oct 2024 23:01:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiigFBVV95cUxNbTVIcHVvamxLWHR0SjZINzhyd3Bvak9mdjR0SUFnTU1XZl9LTy1renNFLXNDeXlTYVJsczk4QUlSYU1Qc2tHOW1ySHRQOEZobFRsRkdhNDVNMUNyb0VBM3dIRS1ncGp6VE40ZkN3STJyeFRGN2k2Mld0VzZIUHZkTEs2OWZoMlJ4WEHSAY8BQVVfeXFMT1Qta2loLWxFdl9SNzJoTDJwSnNpXzA3T3lzLXMwM0h2RXpmVjNYOTlpTnpvUmFxNXRqRGtNWGNIUkhlZW0xNlNBa3RuZ3FQSkRaTldxNEx5bUxlX3Zob2JYOVdpOGdYS3lBaFBMd0dncnRnVUJUN3VnSWg2RUd2M25iSUFtdFpPWThpd1VsVkU?oc=5\" target=\"_blank\">Prostate cancer blood test could save thousands more lives, charity says</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Express</font>"
    },
    {
        "title": "Red flags for silent cancer amid warning NHS guidelines are diagnosing 'too late' - Gloucestershire Live",
        "link": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQeUJNMjZIeGRQdnZYSktoYXpEWFBuZnNYbG1IdTRUalZYU0lZcWZnZ05UazAtTXp2Z0g0cHVaNE43RFlVMWxROGlNNG90dzk3UTBjeU4wX0RWWVFJYkdDV3lVQS1EOHg1R01LTHZHNU40eEIwRkI5Y3RTQjhUMWtuclpWX1ZFTGFrb19HSTlHSdIBlAFBVV95cUxPejFsbkVtbll1a3haN3Z5c2tsdHBmeHpPcG1qbXNSb2ZBdlUwOHNwSjBMLXhfZ2h0bkE3R2VpTWFzRW90dnhPX1FZS3ZnX0hnTTFFVm1XeU51TVNUX2ZhWmUwbjI2bHZGZkpYUlNEQXd4VW1OczM3eUhUMEk1QW1xYTRvRl9nOEw5TjNUUmh2M0VicEFZ?oc=5",
        "pubDate": "Tue, 15 Oct 2024 04:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMijwFBVV95cUxQeUJNMjZIeGRQdnZYSktoYXpEWFBuZnNYbG1IdTRUalZYU0lZcWZnZ05UazAtTXp2Z0g0cHVaNE43RFlVMWxROGlNNG90dzk3UTBjeU4wX0RWWVFJYkdDV3lVQS1EOHg1R01LTHZHNU40eEIwRkI5Y3RTQjhUMWtuclpWX1ZFTGFrb19HSTlHSdIBlAFBVV95cUxPejFsbkVtbll1a3haN3Z5c2tsdHBmeHpPcG1qbXNSb2ZBdlUwOHNwSjBMLXhfZ2h0bkE3R2VpTWFzRW90dnhPX1FZS3ZnX0hnTTFFVm1XeU51TVNUX2ZhWmUwbjI2bHZGZkpYUlNEQXd4VW1OczM3eUhUMEk1QW1xYTRvRl9nOEw5TjNUUmh2M0VicEFZ?oc=5\" target=\"_blank\">Red flags for silent cancer amid warning NHS guidelines are diagnosing 'too late'</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Gloucestershire Live</font>"
    },
    {
        "title": "How WhatsApp can help with prostate cancer detection and diagnosis - Cardiff University",
        "link": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOdC1VYXVCdFUzOXBVNVdHZXduSVc0QUJ6SDJyTjRicU43M2NzZm0yc1VCSVYxN0JqRzJhTGVsZkxUWFVscXNCNnNiR2VzbUVhRGNzTmREUDZDTDM3OW1xWjFiNW4tV2t3cXpPeU5nQkJ4QUgwSl9rSXZnS0luS2lEdlY5VGR1TFpCLTVNUnRITExOakw0MTVnRkRrekJKckFoTHR5aldiRHluaVotOWhZ?oc=5",
        "pubDate": "Thu, 12 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMirwFBVV95cUxOdC1VYXVCdFUzOXBVNVdHZXduSVc0QUJ6SDJyTjRicU43M2NzZm0yc1VCSVYxN0JqRzJhTGVsZkxUWFVscXNCNnNiR2VzbUVhRGNzTmREUDZDTDM3OW1xWjFiNW4tV2t3cXpPeU5nQkJ4QUgwSl9rSXZnS0luS2lEdlY5VGR1TFpCLTVNUnRITExOakw0MTVnRkRrekJKckFoTHR5aldiRHluaVotOWhZ?oc=5\" target=\"_blank\">How WhatsApp can help with prostate cancer detection and diagnosis</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Cardiff University</font>"
    },
    {
        "title": "Identification of a 5-gene signature panel for the prediction of prostate cancer progression - Nature.com",
        "link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTE1acTJMZnB0QzZjVlR6REROUlhvbGFNY1pCRVdiNFJhMmFCb09tSUtWdTd0YVAtMXlBRGY0Y1Rqdk1QbkNfQlNrZUkyTHZmb29rdi1yd3pQVlRhTVBydVY0?oc=5",
        "pubDate": "Mon, 14 Oct 2024 16:19:45 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiX0FVX3lxTE1acTJMZnB0QzZjVlR6REROUlhvbGFNY1pCRVdiNFJhMmFCb09tSUtWdTd0YVAtMXlBRGY0Y1Rqdk1QbkNfQlNrZUkyTHZmb29rdi1yd3pQVlRhTVBydVY0?oc=5\" target=\"_blank\">Identification of a 5-gene signature panel for the prediction of prostate cancer progression</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Nature.com</font>"
    },
    {
        "title": "New drug target discovered for aggressive form of prostate cancer - The Institute of Cancer Research",
        "link": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPZnB3NDlyV3haZy1BQnM0QzdiNmxWVG1VTmdaYkdBT3FGS0pNSFNnRWdQMWUwTno4Zm12UjM2RnhZS1pkblUxTl9mYXpGaWptRkczOTYxZmJyMkpFTUIzQmRES1RhZHppclpmOUUzcU9EaGlUMzFqV0lWdFpQZU5ILVFnVHY0OHpZRjdnNWdYSFhIYkNQcmVIa0NPOFB1QXFSRmc?oc=5",
        "pubDate": "Tue, 17 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiogFBVV95cUxPZnB3NDlyV3haZy1BQnM0QzdiNmxWVG1VTmdaYkdBT3FGS0pNSFNnRWdQMWUwTno4Zm12UjM2RnhZS1pkblUxTl9mYXpGaWptRkczOTYxZmJyMkpFTUIzQmRES1RhZHppclpmOUUzcU9EaGlUMzFqV0lWdFpQZU5ILVFnVHY0OHpZRjdnNWdYSFhIYkNQcmVIa0NPOFB1QXFSRmc?oc=5\" target=\"_blank\">New drug target discovered for aggressive form of prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Institute of Cancer Research</font>"
    },
    {
        "title": "Updated Findings in Prostate Cancer Screening With Systemic Biopsy vs MRI-Targeted Biopsy - The ASCO Post",
        "link": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxPcWU5V2JVVzVYVi1yYll0bXZvRTByaGt6RVNwNFJjXzktTWRGN1BBRVFXaXBuR0xKSFFtRWt5emNBSHUzcnRyb1g4THhIV3RzWEVUdmJJUExEUnh3T3l0Z2tza2hIT0VtRHhXNG1ETTJ4My1CeEZQeXBuLVB6S25RRFFsTVJYM0k3TGlXR04wa04tay1wOE1UVFF0X21XcjIzWC1wRVhPbWROS0FfM1BDTWJrbEVRQndGRndhRlczTy1wc2pQdG1kRw?oc=5",
        "pubDate": "Mon, 14 Oct 2024 15:41:13 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiyAFBVV95cUxPcWU5V2JVVzVYVi1yYll0bXZvRTByaGt6RVNwNFJjXzktTWRGN1BBRVFXaXBuR0xKSFFtRWt5emNBSHUzcnRyb1g4THhIV3RzWEVUdmJJUExEUnh3T3l0Z2tza2hIT0VtRHhXNG1ETTJ4My1CeEZQeXBuLVB6S25RRFFsTVJYM0k3TGlXR04wa04tay1wOE1UVFF0X21XcjIzWC1wRVhPbWROS0FfM1BDTWJrbEVRQndGRndhRlczTy1wc2pQdG1kRw?oc=5\" target=\"_blank\">Updated Findings in Prostate Cancer Screening With Systemic Biopsy vs MRI-Targeted Biopsy</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The ASCO Post</font>"
    },
    {
        "title": "Prostate cancer 'holy grail' spit test could save NHS £500m every year - Express",
        "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNdGoyekdZbU51cWRheG5OMFV3cTdMQVA3SzVNcmVyMDg1RzdWbkJINUw4QkRCQUFEcGlEQ1pIXzY3VDhPeDBHN3ZzeDlwUy1oNlMxc1l4ekkwbFZZb1U3Z3pXejZWLXppODFDMHBmWkY1T1FhZ2VZMzJTbUZmZG1JMVl1aE9lT0tIRXZ30gGQAUFVX3lxTE5qamhXLTFYQ0s4aVNOdDFaRUMwOUU4anpxVjZTREJsNmdHZi1ZWGdVN3YxZkxKVk1XREhmQWFFTUlRNkVUNEUyVHNJTlJtX21GazBjYWtTVnhWcWQ3QVZKdHVKSld3WTVTZTdZZ2lNRF83SVUtQ1hkME5CYkhZaGN2U3d3RnhUWEpYZUYxS0ZYWg?oc=5",
        "pubDate": "Sun, 13 Oct 2024 10:09:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiiwFBVV95cUxNdGoyekdZbU51cWRheG5OMFV3cTdMQVA3SzVNcmVyMDg1RzdWbkJINUw4QkRCQUFEcGlEQ1pIXzY3VDhPeDBHN3ZzeDlwUy1oNlMxc1l4ekkwbFZZb1U3Z3pXejZWLXppODFDMHBmWkY1T1FhZ2VZMzJTbUZmZG1JMVl1aE9lT0tIRXZ30gGQAUFVX3lxTE5qamhXLTFYQ0s4aVNOdDFaRUMwOUU4anpxVjZTREJsNmdHZi1ZWGdVN3YxZkxKVk1XREhmQWFFTUlRNkVUNEUyVHNJTlJtX21GazBjYWtTVnhWcWQ3QVZKdHVKSld3WTVTZTdZZ2lNRF83SVUtQ1hkME5CYkhZaGN2U3d3RnhUWEpYZUYxS0ZYWg?oc=5\" target=\"_blank\">Prostate cancer 'holy grail' spit test could save NHS £500m every year</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Express</font>"
    },
    {
        "title": "Charity calls for change to prostate cancer testing guidelines - The National",
        "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPTS1ZTHdLLS1Uc3ZuV2VMOXRLSWpNcWY2UXRhNDU1R3dRbWtlU1h4M3dIRllPd1pUM1pzT1l2b0JDQ0h5Ni1pTmQ5Ti1TZTNtX0F5R0h5NlIwUlRoSmtoMmlXQ3BnWlB1dHlJUS1pSy1ESkdZamQ2bXZISTNCUDhWa2tpbTVvdEllZUFVTS1yMy16WUhMeFg2aTVWeUh2Zk5LcXZ1NHZFMDBTckMz?oc=5",
        "pubDate": "Sun, 13 Oct 2024 23:14:06 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMirAFBVV95cUxPTS1ZTHdLLS1Uc3ZuV2VMOXRLSWpNcWY2UXRhNDU1R3dRbWtlU1h4M3dIRllPd1pUM1pzT1l2b0JDQ0h5Ni1pTmQ5Ti1TZTNtX0F5R0h5NlIwUlRoSmtoMmlXQ3BnWlB1dHlJUS1pSy1ESkdZamQ2bXZISTNCUDhWa2tpbTVvdEllZUFVTS1yMy16WUhMeFg2aTVWeUh2Zk5LcXZ1NHZFMDBTckMz?oc=5\" target=\"_blank\">Charity calls for change to prostate cancer testing guidelines</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The National</font>"
    },
    {
        "title": "PSA test - NHS Website",
        "link": "https://news.google.com/rss/articles/CBMiUEFVX3lxTE9vbm9zNDlaQU5iVFNQWXBseHpoVmxCOTB2bGRHbGtqQU5CR1FNYTRJT1ZfcWp3UHN5OUVEaXoyU203OVNFajJOUHRwLXUzUG9G?oc=5",
        "pubDate": "Wed, 04 Sep 2024 12:58:34 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiUEFVX3lxTE9vbm9zNDlaQU5iVFNQWXBseHpoVmxCOTB2bGRHbGtqQU5CR1FNYTRJT1ZfcWp3UHN5OUVEaXoyU203OVNFajJOUHRwLXUzUG9G?oc=5\" target=\"_blank\">PSA test</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">NHS Website</font>"
    },
    {
        "title": "Enzalutamide confers small benefit vs. abiraterone in metastatic prostate cancer - Healio",
        "link": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxNSUdnX3RjLVNnXzRHRHBFSWFRbElRbnVQd3hldjM2V2QyS3c1amluOWdONVU1ZlVDaXV4aDBhdUdnNWpQZXBFR2QwZm4yWnhpMTNhWHNCd1Ewc0Z4OUplazNuWkZkLUNvUnNYYjY0WDllVUd4Zmt5SWJFTzRhOUFMU29LcGxHWFdEVEtnVm9kN0hpUmYyYkxXRW45TlI0Y0N5TVI1UTR3VEQxLUJNaEFUcWI0aHFsS1dEVDZmTGpHM05KckJGcFlOY29uYi14YnJaM3c?oc=5",
        "pubDate": "Sat, 12 Oct 2024 09:27:14 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi0gFBVV95cUxNSUdnX3RjLVNnXzRHRHBFSWFRbElRbnVQd3hldjM2V2QyS3c1amluOWdONVU1ZlVDaXV4aDBhdUdnNWpQZXBFR2QwZm4yWnhpMTNhWHNCd1Ewc0Z4OUplazNuWkZkLUNvUnNYYjY0WDllVUd4Zmt5SWJFTzRhOUFMU29LcGxHWFdEVEtnVm9kN0hpUmYyYkxXRW45TlI0Y0N5TVI1UTR3VEQxLUJNaEFUcWI0aHFsS1dEVDZmTGpHM05KckJGcFlOY29uYi14YnJaM3c?oc=5\" target=\"_blank\">Enzalutamide confers small benefit vs. abiraterone in metastatic prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Healio</font>"
    },
    {
        "title": "Prostate cancer incidence and mortality in Europe and implications for screening activities: population based study - The BMJ",
        "link": "https://news.google.com/rss/articles/CBMiW0FVX3lxTE5jVEVKOUNGZVk0elZ0WHJSYmVlZEFNcDBKcjIySHdNWEtGQjNYMzRTams2di1xZDczUTNTSEVYWUtWMkF4Unhnem5HdlBpTmFjWmFZYjlsaEp4MTg?oc=5",
        "pubDate": "Wed, 04 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiW0FVX3lxTE5jVEVKOUNGZVk0elZ0WHJSYmVlZEFNcDBKcjIySHdNWEtGQjNYMzRTams2di1xZDczUTNTSEVYWUtWMkF4Unhnem5HdlBpTmFjWmFZYjlsaEp4MTg?oc=5\" target=\"_blank\">Prostate cancer incidence and mortality in Europe and implications for screening activities: population based study</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The BMJ</font>"
    },
    {
        "title": "Don't be a Man prostate cancer awareness campaign takes on La Concha mountain - Surinenglish.com",
        "link": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxON2dYQUI4NWthaE15X0t0WUkyc0FKbUMxVFJTY0owSW5zZTNEdzZkS1dKRUxXN1B2RjlNVFpYRTFRSlZucWpUYnJkckF3cWJ1OTVFSTFJM3gwU3Z4eHM1VkZocjM3OUFPVWNFN2o0bDJjcktNU2lKT3pRRldQblNqTHZWV0g5QlZ3QTE3WDlyN3BFMlRaSFdGamxRd1ZsZWhJb25RVUN5aW5RNjk2WlZpOXdVZ2MwN2tHSjRXeVRhLTE4UnM?oc=5",
        "pubDate": "Fri, 11 Oct 2024 13:23:58 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiwwFBVV95cUxON2dYQUI4NWthaE15X0t0WUkyc0FKbUMxVFJTY0owSW5zZTNEdzZkS1dKRUxXN1B2RjlNVFpYRTFRSlZucWpUYnJkckF3cWJ1OTVFSTFJM3gwU3Z4eHM1VkZocjM3OUFPVWNFN2o0bDJjcktNU2lKT3pRRldQblNqTHZWV0g5QlZ3QTE3WDlyN3BFMlRaSFdGamxRd1ZsZWhJb25RVUN5aW5RNjk2WlZpOXdVZ2MwN2tHSjRXeVRhLTE4UnM?oc=5\" target=\"_blank\">Don't be a Man prostate cancer awareness campaign takes on La Concha mountain</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Surinenglish.com</font>"
    },
    {
        "title": "Support academy staff in fight against Prostate Cancer - Hearts FC",
        "link": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQM1JBbE02NFBkMklrRGVheVdYN3c2Q1BaLWNDQ1dDY21sZllMay1Tc01GNTdJNGpVQ29iVkUwUmhFTTVFbG50V084eDNrbHE2eXd5T0xacHkzUFBUeW93Y0N3OWpsNWloTmNHSmRBRDZucHFtTE9Qb2tvOXhTMG0yVThiNVY0dzdyUWJZNVZycW92RkJtNllz?oc=5",
        "pubDate": "Mon, 30 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMilwFBVV95cUxQM1JBbE02NFBkMklrRGVheVdYN3c2Q1BaLWNDQ1dDY21sZllMay1Tc01GNTdJNGpVQ29iVkUwUmhFTTVFbG50V084eDNrbHE2eXd5T0xacHkzUFBUeW93Y0N3OWpsNWloTmNHSmRBRDZucHFtTE9Qb2tvOXhTMG0yVThiNVY0dzdyUWJZNVZycW92RkJtNllz?oc=5\" target=\"_blank\">Support academy staff in fight against Prostate Cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Hearts FC</font>"
    },
    {
        "title": "Simple saliva test could save the NHS millions of pounds by speeding up prostate cancer diagnoses - Daily Mail",
        "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNZjUyVFlKNUdaZHdIZ1VILU1UallKMTRuc1Q3aUR6Y0gxZl9Bd0ZmelZaeWtzWEZ5NkJjNFctajdNOU5TZG1RX2tYRkpjdkZXUGctMW9fTU1yX1BIT1BZQTBmMHZhR1dMU1ZsaHdfMXRGSS00R2lkVVBOQzhydUJpOGM3U2xzcmdfemlselFTRmpkUXAwYXZJMDJKY0o5dzBYUWk40gGoAUFVX3lxTE1NTEo3clJJaEk3cEJPX2V1OWkxSFFIeFdBX2Naa3NnY1lIcUl4YVFNSGsyZWVDUWx5WFVYR05wSVRxQllLSWpvM05RTjBRcVFZaVN2cGl0Y1lhajItOEhaN3dtSTl0WmZ0SmVUT0Ruc25rTEpKNHktUG5EOEZPYmFkM2h6bzB2MExUUHBmbGdWT1R5eHV2Wm5FWnBSc3F1RUhuS2g3X2hYMw?oc=5",
        "pubDate": "Mon, 14 Oct 2024 00:46:09 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiowFBVV95cUxNZjUyVFlKNUdaZHdIZ1VILU1UallKMTRuc1Q3aUR6Y0gxZl9Bd0ZmelZaeWtzWEZ5NkJjNFctajdNOU5TZG1RX2tYRkpjdkZXUGctMW9fTU1yX1BIT1BZQTBmMHZhR1dMU1ZsaHdfMXRGSS00R2lkVVBOQzhydUJpOGM3U2xzcmdfemlselFTRmpkUXAwYXZJMDJKY0o5dzBYUWk40gGoAUFVX3lxTE1NTEo3clJJaEk3cEJPX2V1OWkxSFFIeFdBX2Naa3NnY1lIcUl4YVFNSGsyZWVDUWx5WFVYR05wSVRxQllLSWpvM05RTjBRcVFZaVN2cGl0Y1lhajItOEhaN3dtSTl0WmZ0SmVUT0Ruc25rTEpKNHktUG5EOEZPYmFkM2h6bzB2MExUUHBmbGdWT1R5eHV2Wm5FWnBSc3F1RUhuS2g3X2hYMw?oc=5\" target=\"_blank\">Simple saliva test could save the NHS millions of pounds by speeding up prostate cancer diagnoses</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Daily Mail</font>"
    },
    {
        "title": "Prostate cancer patients facing long waits at regional centre - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE1YeVJkNzR3OGc4WmhFamNIaGtwcUJteGlya0hORXA3T2R5TXpuUHR6WVByakpkdTBscGhpeTlvZDBvTmw4TWlfaVdVOHY4SUt2TVMteU9kRWU4QdIBX0FVX3lxTFBBMHR1SUVvQmRwc2U2ckFueGRQcDlISzRWWm4xQ19adUVJc0xrMW5JSWtFcmpzcnJ2ODRnYURMd0NhRGxMUDNTdVRfUXl1cmIta2lqdGNiXzJrbDRiNGlB?oc=5",
        "pubDate": "Tue, 03 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTE1YeVJkNzR3OGc4WmhFamNIaGtwcUJteGlya0hORXA3T2R5TXpuUHR6WVByakpkdTBscGhpeTlvZDBvTmw4TWlfaVdVOHY4SUt2TVMteU9kRWU4QdIBX0FVX3lxTFBBMHR1SUVvQmRwc2U2ckFueGRQcDlISzRWWm4xQ19adUVJc0xrMW5JSWtFcmpzcnJ2ODRnYURMd0NhRGxMUDNTdVRfUXl1cmIta2lqdGNiXzJrbDRiNGlB?oc=5\" target=\"_blank\">Prostate cancer patients facing long waits at regional centre</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    },
    {
        "title": "Men at higher risk of prostate cancer should be given 'life-saving' test option - The Mirror",
        "link": "https://news.google.com/rss/articles/CBMigwFBVV95cUxOZl9JZG5aVXJna0xfcGF5aEZfcFVxRkZwSXExc1h4dnVjV0hTR2d1RGRneVp5alFjakZydk5wZXlxeTVSWFdlczVERTV0REhkZ1pySGRBN2sweTVOTGJsZUpyUDRCQTVlbnFUTk55SXRWRDdUWkYxNEUtUFRDUjk0ZENjUdIBiAFBVV95cUxNelNUTWQ5cmZsS2VvQ1pSQldIdUM5amZCbVB5c0NCX0xOd2QxNnlqNzdSSkV5S3pHdHhTT245SEgySXpLYl9XZWR6WjFVVHFVajIxZ0N0bU1DN1Q4Qks5U3JRSk1xdWZhdkx6ZTFBSWFna2Rrb0hKZGREcS1USmFzUmVGeXRNbzZk?oc=5",
        "pubDate": "Mon, 14 Oct 2024 10:42:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMigwFBVV95cUxOZl9JZG5aVXJna0xfcGF5aEZfcFVxRkZwSXExc1h4dnVjV0hTR2d1RGRneVp5alFjakZydk5wZXlxeTVSWFdlczVERTV0REhkZ1pySGRBN2sweTVOTGJsZUpyUDRCQTVlbnFUTk55SXRWRDdUWkYxNEUtUFRDUjk0ZENjUdIBiAFBVV95cUxNelNUTWQ5cmZsS2VvQ1pSQldIdUM5amZCbVB5c0NCX0xOd2QxNnlqNzdSSkV5S3pHdHhTT245SEgySXpLYl9XZWR6WjFVVHFVajIxZ0N0bU1DN1Q4Qks5U3JRSk1xdWZhdkx6ZTFBSWFna2Rrb0hKZGREcS1USmFzUmVGeXRNbzZk?oc=5\" target=\"_blank\">Men at higher risk of prostate cancer should be given 'life-saving' test option</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Mirror</font>"
    },
    {
        "title": "ASCO 2024: Prostate cancer spit test better for men with high genetic risk than standard blood test - The Institute of Cancer Research",
        "link": "https://news.google.com/rss/articles/CBMizgFBVV95cUxQSE9ibzF1SmNaU2s4WUl3SGxrd1RfempIQ25SZzRMYlZMNU9yaG9xMHhybUFiaXBkN3k0WEQ5a3BLRERWZGNnNGlCbDNSeDZWMVlGdmVpZGN5SGN3OVpzNWstUk1aUFVvakFrSURfUDQxRlNnYnJ4WTRSYm5JR2JpSVRPS3VnOVNFV1hEUlhBQWdIem1tZlYwN3VDejk1VmJ1RmRldUx2d2pzOGNvWk5hWlh4OEVRcUdWSzR1OGpyTzVSR0Rxem9iUHVqLVRIQQ?oc=5",
        "pubDate": "Fri, 31 May 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMizgFBVV95cUxQSE9ibzF1SmNaU2s4WUl3SGxrd1RfempIQ25SZzRMYlZMNU9yaG9xMHhybUFiaXBkN3k0WEQ5a3BLRERWZGNnNGlCbDNSeDZWMVlGdmVpZGN5SGN3OVpzNWstUk1aUFVvakFrSURfUDQxRlNnYnJ4WTRSYm5JR2JpSVRPS3VnOVNFV1hEUlhBQWdIem1tZlYwN3VDejk1VmJ1RmRldUx2d2pzOGNvWk5hWlh4OEVRcUdWSzR1OGpyTzVSR0Rxem9iUHVqLVRIQQ?oc=5\" target=\"_blank\">ASCO 2024: Prostate cancer spit test better for men with high genetic risk than standard blood test</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Institute of Cancer Research</font>"
    },
    {
        "title": "EU Approval Sought for Darolutamide Plus ADT for mHSPC - OncLive",
        "link": "https://news.google.com/rss/articles/CBMigwFBVV95cUxNVjd0MXc5Zm9HcjdsWkV0akpDWlZBNlhDcmxxanotYTNKLTN0MUJPZnhkd25ZOVN5RW81Q0J4RDh5bl9qSU52cExwbVVkSjFGU3VvUk9xNHZOdkJ4d2pNT3FCbjFpWGpfdkE2MUNGWFg5QVlzU0ItZ2tOWDVYSVRMSXBDZw?oc=5",
        "pubDate": "Mon, 14 Oct 2024 16:08:41 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMigwFBVV95cUxNVjd0MXc5Zm9HcjdsWkV0akpDWlZBNlhDcmxxanotYTNKLTN0MUJPZnhkd25ZOVN5RW81Q0J4RDh5bl9qSU52cExwbVVkSjFGU3VvUk9xNHZOdkJ4d2pNT3FCbjFpWGpfdkE2MUNGWFg5QVlzU0ItZ2tOWDVYSVRMSXBDZw?oc=5\" target=\"_blank\">EU Approval Sought for Darolutamide Plus ADT for mHSPC</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">OncLive</font>"
    },
    {
        "title": "What Should You Do When a Patient Asks for PSA Test? - Medscape",
        "link": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPUmdIaWhOUjFqaF8zQTd3OHFiZUtnRnNjd1dWRnppN2VfRHRxci1iRDlpeGk5VU5QWU04UFUwT0x2OE9Cbkc5dXFOT0Vlc3IyVG1tWTZQdDZCczhkWGozYml1QzJhYy1nMzVXekc3aUNnbl83OGZXdmI1dEZPWm5hRGRhSHMzRUpwNzQwWTkzQm45aU9pSmVTdncxOA?oc=5",
        "pubDate": "Thu, 10 Oct 2024 17:41:10 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMimwFBVV95cUxPUmdIaWhOUjFqaF8zQTd3OHFiZUtnRnNjd1dWRnppN2VfRHRxci1iRDlpeGk5VU5QWU04UFUwT0x2OE9Cbkc5dXFOT0Vlc3IyVG1tWTZQdDZCczhkWGozYml1QzJhYy1nMzVXekc3aUNnbl83OGZXdmI1dEZPWm5hRGRhSHMzRUpwNzQwWTkzQm45aU9pSmVTdncxOA?oc=5\" target=\"_blank\">What Should You Do When a Patient Asks for PSA Test?</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Medscape</font>"
    },
    {
        "title": "Combination extends survival in metastatic prostate cancer - Healio",
        "link": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNaUpNeENGV2dRcEpCbU1LOEVLUm9WZ0FIRnhlOTZEVTktUl9ON1RIU2ExM2Eta3ZkekhCVjc5aWdFZEo3NDNEcHo2VFZnZk1GTm92LXdheVprTk9uOHFCaHQzSFFhcmhzb1BqcDBvd3J2WF9TRDB2OFhMWTRIOHFkZU1GcnYtRi1HRjA4aDd0cHpjNTAwYTIxcV9qZWlwVXY1STMxTUZicHVUZHRRS0VzNnNhdWtFUQ?oc=5",
        "pubDate": "Thu, 10 Oct 2024 17:02:09 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMitgFBVV95cUxNaUpNeENGV2dRcEpCbU1LOEVLUm9WZ0FIRnhlOTZEVTktUl9ON1RIU2ExM2Eta3ZkekhCVjc5aWdFZEo3NDNEcHo2VFZnZk1GTm92LXdheVprTk9uOHFCaHQzSFFhcmhzb1BqcDBvd3J2WF9TRDB2OFhMWTRIOHFkZU1GcnYtRi1HRjA4aDd0cHpjNTAwYTIxcV9qZWlwVXY1STMxTUZicHVUZHRRS0VzNnNhdWtFUQ?oc=5\" target=\"_blank\">Combination extends survival in metastatic prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Healio</font>"
    },
    {
        "title": "Pfizer reports positive data from prostate cancer combination therapy trial - Clinical Trials Arena",
        "link": "https://news.google.com/rss/articles/CBMigAFBVV95cUxQQU9zc1IxR1ctbXlaT0ppdTIwTnZKaWd3d09RQTdvYUdxb0xtRllvTWJTMlZHRHRteW94Nko0QXBEU1pGVlBhdzNfbnVPMm91UF9CWXlVS0FmSk1nWldFUWVlQW0tUHVIZ2dTcHBvOEtTYnIzcjZqX2l6a0RTakgzTA?oc=5",
        "pubDate": "Fri, 11 Oct 2024 10:58:11 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMigAFBVV95cUxQQU9zc1IxR1ctbXlaT0ppdTIwTnZKaWd3d09RQTdvYUdxb0xtRllvTWJTMlZHRHRteW94Nko0QXBEU1pGVlBhdzNfbnVPMm91UF9CWXlVS0FmSk1nWldFUWVlQW0tUHVIZ2dTcHBvOEtTYnIzcjZqX2l6a0RTakgzTA?oc=5\" target=\"_blank\">Pfizer reports positive data from prostate cancer combination therapy trial</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Clinical Trials Arena</font>"
    },
    {
        "title": "Darts competition raises vital funds for prostate cancer research - Basingstoke Gazette",
        "link": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPdmVWbjFaZXkxOFFJSmQtSWR2bGE4bW1QZWZUd19MUVIxWlpUVndIMkVucUVqMnJxbGFzcUZHVVFiNllfenpBMUFJVVNsMWZVMjhCbzhPSjFRWmZEc1hBamozR0dybkNCaGk2cTF1ckVmb1NybTlBWEZqZ2FySUs4MXEwLWVWOUxYVzNleDdwOENMeFo5czhoYk5jNzAtZVpsRnc?oc=5",
        "pubDate": "Fri, 11 Oct 2024 16:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiogFBVV95cUxPdmVWbjFaZXkxOFFJSmQtSWR2bGE4bW1QZWZUd19MUVIxWlpUVndIMkVucUVqMnJxbGFzcUZHVVFiNllfenpBMUFJVVNsMWZVMjhCbzhPSjFRWmZEc1hBamozR0dybkNCaGk2cTF1ckVmb1NybTlBWEZqZ2FySUs4MXEwLWVWOUxYVzNleDdwOENMeFo5czhoYk5jNzAtZVpsRnc?oc=5\" target=\"_blank\">Darts competition raises vital funds for prostate cancer research</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Basingstoke Gazette</font>"
    },
    {
        "title": "New prostate cancer screening trial could save thousands of lives - Imperial College Healthcare NHS Trust",
        "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQQlMzQ1QxbzVoMk90c2k4YUhhZTY1ZmZ6akRzNndnZjFIemZZbUs2amZnbE9yOHREeXhadEw3SjVLb2FXT01JZVhoVVNWZ3RIUllMeFlJS2hFSlN1aXBJQ0E5aGhldThueWhUbm9fdjhGd2h1NjlyVG16a3JYSmhBMzJYSDNRZ0pIeTAzT0NPcVpKNUx2V3FyX2RWZURKdTFjUGwtek5iVkcyVWc?oc=5",
        "pubDate": "Wed, 01 May 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiqwFBVV95cUxQQlMzQ1QxbzVoMk90c2k4YUhhZTY1ZmZ6akRzNndnZjFIemZZbUs2amZnbE9yOHREeXhadEw3SjVLb2FXT01JZVhoVVNWZ3RIUllMeFlJS2hFSlN1aXBJQ0E5aGhldThueWhUbm9fdjhGd2h1NjlyVG16a3JYSmhBMzJYSDNRZ0pIeTAzT0NPcVpKNUx2V3FyX2RWZURKdTFjUGwtek5iVkcyVWc?oc=5\" target=\"_blank\">New prostate cancer screening trial could save thousands of lives</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Imperial College Healthcare NHS Trust</font>"
    },
    {
        "title": "FMD - New £42 million screening trial to improve efficacy of prostate cancer screening - QMUL",
        "link": "https://news.google.com/rss/articles/CBMixgFBVV95cUxOaF9HQktyc1RSbXg4YmVBZnB2b3dJZHdDNWJ2N1h6TEdDQlBVMnYzUTBaS0g1TnBpcW1BX3VYRkRfSUFKaVhlVXBmaFUwLVIzX0tUT3c5N205bTRDakdvLWZVRVoyNlNFMDJRNDV1Ri05VUx4VDhPVWlsZVQ4R2pxUVZlWUxkSk9tSllycjFfNmRBWGtFUG9ZdVVYN2NSRVlSM2poc1g1LUViYnN0Z29MRklSZjU5ZGxlYTlIZ3ZDX0lZc2RHYUE?oc=5",
        "pubDate": "Wed, 01 May 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMixgFBVV95cUxOaF9HQktyc1RSbXg4YmVBZnB2b3dJZHdDNWJ2N1h6TEdDQlBVMnYzUTBaS0g1TnBpcW1BX3VYRkRfSUFKaVhlVXBmaFUwLVIzX0tUT3c5N205bTRDakdvLWZVRVoyNlNFMDJRNDV1Ri05VUx4VDhPVWlsZVQ4R2pxUVZlWUxkSk9tSllycjFfNmRBWGtFUG9ZdVVYN2NSRVlSM2poc1g1LUViYnN0Z29MRklSZjU5ZGxlYTlIZ3ZDX0lZc2RHYUE?oc=5\" target=\"_blank\">FMD - New £42 million screening trial to improve efficacy of prostate cancer screening</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">QMUL</font>"
    },
    {
        "title": "Prostate cancer: Glowing dye used to help find invisible cells - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE9YM2wwQ0lHOXZ0V29aWHdfcklMczUzY3NaczN1aEd1MUNERVk3WjFYYU5OUkJSWXJVUFVJRnRvSmxodV9CQjBKczIwQnRscVJWTzViYnUyMG1Cd9IBX0FVX3lxTE5NSGgxZlF5eTd5ZHU2Y0Q5NEpxTWVTbXA2aUhjNEF2ZVp0TWRBbjFJa3V0NmJpQ0lQeFl3MTZVTHMxS3RLTHlIZWpNSXVRNmpURGtWckpEV3VkbEZPMHNn?oc=5",
        "pubDate": "Sun, 09 Jun 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTE9YM2wwQ0lHOXZ0V29aWHdfcklMczUzY3NaczN1aEd1MUNERVk3WjFYYU5OUkJSWXJVUFVJRnRvSmxodV9CQjBKczIwQnRscVJWTzViYnUyMG1Cd9IBX0FVX3lxTE5NSGgxZlF5eTd5ZHU2Y0Q5NEpxTWVTbXA2aUhjNEF2ZVp0TWRBbjFJa3V0NmJpQ0lQeFl3MTZVTHMxS3RLTHlIZWpNSXVRNmpURGtWckpEV3VkbEZPMHNn?oc=5\" target=\"_blank\">Prostate cancer: Glowing dye used to help find invisible cells</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    },
    {
        "title": "Piflufolastat approved as diagnostic tool for adults with prostate cancer - GOV.UK",
        "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPU0NSOXhRa2NHdk1UbGZFUTZvU3U2UVh0Ql9GdnlnQUJwQUg2Y0hnaWxMbENuZXhhMU14N2NzRFBmN0daSlYtelN6dEpJb200R1BqYWhCbGIyS0FiNXNsVzRuVTVFUFF4djRiNEJLWUtzdVVFODQ3RUtfQ3k1d18zalZmZ2hwNEFMQlRaYW4xVHRsLThubzhJd2pBTVhPZWhUalVTRDNKY1NEMXFl?oc=5",
        "pubDate": "Wed, 06 Mar 2024 08:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMirAFBVV95cUxPU0NSOXhRa2NHdk1UbGZFUTZvU3U2UVh0Ql9GdnlnQUJwQUg2Y0hnaWxMbENuZXhhMU14N2NzRFBmN0daSlYtelN6dEpJb200R1BqYWhCbGIyS0FiNXNsVzRuVTVFUFF4djRiNEJLWUtzdVVFODQ3RUtfQ3k1d18zalZmZ2hwNEFMQlRaYW4xVHRsLThubzhJd2pBTVhPZWhUalVTRDNKY1NEMXFl?oc=5\" target=\"_blank\">Piflufolastat approved as diagnostic tool for adults with prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">GOV.UK</font>"
    },
    {
        "title": "More than 40,000 people could benefit after NICE recommends new ‘take at home’ pill for advanced prostate cancer - NICE",
        "link": "https://news.google.com/rss/articles/CBMi4gFBVV95cUxQc0laUXFIVnMyZ05EaWliMTh0S190WTFOVjVCeWxJalU2RTVtcWdjTGx0R1RaQUxaZGF6VlBhY1JaaWlNVWhJQjNpREpvMHM1VU9vbGhJRl8zRXRseDAtb1ZFVm5wMDRIY3FTT2FjNWpTd1paTnI0STkwcjZhaWFERlFZTE9OamZ2Z3I1WlJxUU5zakpUOE43Q1Q2eHRhZkxKcmU5aS04ZkhjUl9JRXhLdU9qbm5uaUM3QzdpcHctX294T3FDNWs1TEdKM285bGJhOGdEM0FseUFMMWV6aGliRkNB?oc=5",
        "pubDate": "Fri, 19 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi4gFBVV95cUxQc0laUXFIVnMyZ05EaWliMTh0S190WTFOVjVCeWxJalU2RTVtcWdjTGx0R1RaQUxaZGF6VlBhY1JaaWlNVWhJQjNpREpvMHM1VU9vbGhJRl8zRXRseDAtb1ZFVm5wMDRIY3FTT2FjNWpTd1paTnI0STkwcjZhaWFERlFZTE9OamZ2Z3I1WlJxUU5zakpUOE43Q1Q2eHRhZkxKcmU5aS04ZkhjUl9JRXhLdU9qbm5uaUM3QzdpcHctX294T3FDNWs1TEdKM285bGJhOGdEM0FseUFMMWV6aGliRkNB?oc=5\" target=\"_blank\">More than 40,000 people could benefit after NICE recommends new ‘take at home’ pill for advanced prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">NICE</font>"
    },
    {
        "title": "Nivolumab plus SOC associated with improved FFBR in GG5 prostate cancer - Urology Times",
        "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQbzE2V0JBaDBjZXRjcjNUbUdORVNnd2ZNNnN5V3EwY01nYkpRcVBBS0xLNjZlWEJQUnlKdk5KbVlnY1dmWGlldnVfTnZZUW85TThfZC12MW5xbktoQWZmQkNPREZlYm1vZU4tbThobjlHbkoxWmpQNHY2azlrVjJyOHZiYzh4dmZoelVNVHRDMTk1Ykdua1JZNkVqNHNGMm0wOHAwbXJQNzY?oc=5",
        "pubDate": "Fri, 11 Oct 2024 15:57:37 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiqAFBVV95cUxQbzE2V0JBaDBjZXRjcjNUbUdORVNnd2ZNNnN5V3EwY01nYkpRcVBBS0xLNjZlWEJQUnlKdk5KbVlnY1dmWGlldnVfTnZZUW85TThfZC12MW5xbktoQWZmQkNPREZlYm1vZU4tbThobjlHbkoxWmpQNHY2azlrVjJyOHZiYzh4dmZoelVNVHRDMTk1Ykdua1JZNkVqNHNGMm0wOHAwbXJQNzY?oc=5\" target=\"_blank\">Nivolumab plus SOC associated with improved FFBR in GG5 prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Urology Times</font>"
    },
    {
        "title": "Prostate cancer screening 'too late' for Lincolnshire patient - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5GUUtyZG8wc1hzWmlDOUp0Wnk4cW1DRWhVamZBenFUbm5ZdjNxMFZDcUd3RHVPRF84UnBPb3lhQ2pockFLRHBmSUM0RVBnUmd1Xy1XUXdqeEdwQdIBX0FVX3lxTFBHRXBua0pQdy1rWFFOMzZKYWMyUFBNRGVFMUo4bk9PNUNfTkNMc0h0QWhtU2tnNlYwZHRqOV8zb0hFb3c5a25Oa1JGeWRHRlJVeWc5ck1tbkw3dHctRVNr?oc=5",
        "pubDate": "Mon, 02 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTE5GUUtyZG8wc1hzWmlDOUp0Wnk4cW1DRWhVamZBenFUbm5ZdjNxMFZDcUd3RHVPRF84UnBPb3lhQ2pockFLRHBmSUM0RVBnUmd1Xy1XUXdqeEdwQdIBX0FVX3lxTFBHRXBua0pQdy1rWFFOMzZKYWMyUFBNRGVFMUo4bk9PNUNfTkNMc0h0QWhtU2tnNlYwZHRqOV8zb0hFb3c5a25Oa1JGeWRHRlJVeWc5ck1tbkw3dHctRVNr?oc=5\" target=\"_blank\">Prostate cancer screening 'too late' for Lincolnshire patient</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    },
    {
        "title": "Travel expert Rick Steves updates followers on prostate cancer treatment - The Seattle Times",
        "link": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNZDZyNndhT1BpLVZwSzd6dVpXYlI2N1NlZ1JBdFJ6aU5qQmJtSExnTFNMX3FUX3JteTRMVFdtWW9fTmpUQVM3UmQ3S1R0LWctd19zYTlmMUhMenE1RjM4RjdsUERVc2t6dmVfLTMzYkdYYy1VZWM3RW9XS3h4NDRsdFFPRlZQTEdzei1STmotR0FPTDJfaGliY1FRTkNkdTFpSUhib0t1SDB6ZUZZQUUybk0ybXc?oc=5",
        "pubDate": "Sat, 12 Oct 2024 18:14:46 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMitAFBVV95cUxNZDZyNndhT1BpLVZwSzd6dVpXYlI2N1NlZ1JBdFJ6aU5qQmJtSExnTFNMX3FUX3JteTRMVFdtWW9fTmpUQVM3UmQ3S1R0LWctd19zYTlmMUhMenE1RjM4RjdsUERVc2t6dmVfLTMzYkdYYy1VZWM3RW9XS3h4NDRsdFFPRlZQTEdzei1STmotR0FPTDJfaGliY1FRTkNkdTFpSUhib0t1SDB6ZUZZQUUybk0ybXc?oc=5\" target=\"_blank\">Travel expert Rick Steves updates followers on prostate cancer treatment</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Seattle Times</font>"
    },
    {
        "title": "More men with advanced prostate cancer could be successfully treated with precision drug olaparib - The Institute of Cancer Research",
        "link": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNTWtrSkJ6WFdUcHlVdTJqSG9GUW4xZFNFcHRyNFlQbnRGZlFHak95UXpxTE56bEwzYUNxSmMtWlJ5OHFadElKc0QwTndYdzhTRFFIUmpSeDdJeUlWVW1BT3Y2VklVZnFGTmt3NmpiandLdVRWVjA1aG55TkQ4MG9ZNW5sNFdtQWhzcWFIeUNfQzY5ZnpKeUxkMlEtcFFIWWtaSGRMcWJCNHR3T0dQS1E1UFgtMkhnYUh3aXBlZkZpeUhWWHhfWXlMTDNoMUc?oc=5",
        "pubDate": "Mon, 15 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMizAFBVV95cUxNTWtrSkJ6WFdUcHlVdTJqSG9GUW4xZFNFcHRyNFlQbnRGZlFHak95UXpxTE56bEwzYUNxSmMtWlJ5OHFadElKc0QwTndYdzhTRFFIUmpSeDdJeUlWVW1BT3Y2VklVZnFGTmt3NmpiandLdVRWVjA1aG55TkQ4MG9ZNW5sNFdtQWhzcWFIeUNfQzY5ZnpKeUxkMlEtcFFIWWtaSGRMcWJCNHR3T0dQS1E1UFgtMkhnYUh3aXBlZkZpeUhWWHhfWXlMTDNoMUc?oc=5\" target=\"_blank\">More men with advanced prostate cancer could be successfully treated with precision drug olaparib</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Institute of Cancer Research</font>"
    },
    {
        "title": "Social support may benefit men’s health after prostate cancer diagnosis - HSPH News",
        "link": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQZkdiNnpmWnZpTG1oVzJvS0xrTFZ1dXotalN2dElvaWFGMUkzNFFGUWJMWEFGekJBczF6dF9ad0NWTlZOWDhoaXNnVlRTMU5KcjNJanhwQU5RU1lneUI5SWd6VlM2N05aZG5MNUw1WkVndFZWeS1qdlBoS25oMks2UzdXdkxvZ3k4a3k2a0lsU3BYUkhRYXp2WFR3?oc=5",
        "pubDate": "Wed, 25 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMimgFBVV95cUxQZkdiNnpmWnZpTG1oVzJvS0xrTFZ1dXotalN2dElvaWFGMUkzNFFGUWJMWEFGekJBczF6dF9ad0NWTlZOWDhoaXNnVlRTMU5KcjNJanhwQU5RU1lneUI5SWd6VlM2N05aZG5MNUw1WkVndFZWeS1qdlBoS25oMks2UzdXdkxvZ3k4a3k2a0lsU3BYUkhRYXp2WFR3?oc=5\" target=\"_blank\">Social support may benefit men’s health after prostate cancer diagnosis</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">HSPH News</font>"
    },
    {
        "title": "New prostate cancer treatments could reach men sooner | UCL News - UCL - University College London",
        "link": "https://news.google.com/rss/articles/CBMikwFBVV95cUxPejl1Qm91QkZBMmFtdVAwSHJZTTFKTFI0dEM0azkzcEt1YjZ5cUFqUHBSR01SVDhrV1pZekx4TUY0cHYwblBBZW4tUzRrRERYN3NaYXJLUHRUMlF4N1BqMFJaSDFoX1RZSi1WNjlvVFd4SFhhQ2xabUZQZ1pURXRYamJYRWdONzdfdWtfYWItaUVpSU0?oc=5",
        "pubDate": "Mon, 11 Mar 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMikwFBVV95cUxPejl1Qm91QkZBMmFtdVAwSHJZTTFKTFI0dEM0azkzcEt1YjZ5cUFqUHBSR01SVDhrV1pZekx4TUY0cHYwblBBZW4tUzRrRERYN3NaYXJLUHRUMlF4N1BqMFJaSDFoX1RZSi1WNjlvVFd4SFhhQ2xabUZQZ1pURXRYamJYRWdONzdfdWtfYWItaUVpSU0?oc=5\" target=\"_blank\">New prostate cancer treatments could reach men sooner | UCL News - UCL</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">University College London</font>"
    },
    {
        "title": "Prostate cancer reshapes the secreted and extracellular vesicle urinary proteomes - Nature.com",
        "link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTE0wMjFqa19UUU4wemg1SzlZWXNGSlNHZ1hKUThDTU5yQjJMcTZHUXdvWVh0b1ZIX01NWUdYR2ZPZWtCV2E5LTlranVZcWM2QnpjRUVWeFRBc0l3MWp0R2Ew?oc=5",
        "pubDate": "Thu, 13 Jun 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiX0FVX3lxTE0wMjFqa19UUU4wemg1SzlZWXNGSlNHZ1hKUThDTU5yQjJMcTZHUXdvWVh0b1ZIX01NWUdYR2ZPZWtCV2E5LTlranVZcWM2QnpjRUVWeFRBc0l3MWp0R2Ew?oc=5\" target=\"_blank\">Prostate cancer reshapes the secreted and extracellular vesicle urinary proteomes</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Nature.com</font>"
    },
    {
        "title": "Novel light-based technique shows 90% accuracy in early prostate cancer detection - Medical Xpress",
        "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxOaXFEZG9QbWNEWGlTRmc3dTlRTDY0ckxXV1l4MmNyd2pfNDQ1cmpFdU05aURvTDlTNHNKRjhPUVRyN0k1ZnVUSDBYbUZRT05KcFVoazdHdm16QWlNQU1DWVhNX2dXWEF3eF9fYnRFTGVFVUdfb0RIUER6cWE4ZnVCTDV6TW04akZPdWtz?oc=5",
        "pubDate": "Mon, 02 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiiwFBVV95cUxOaXFEZG9QbWNEWGlTRmc3dTlRTDY0ckxXV1l4MmNyd2pfNDQ1cmpFdU05aURvTDlTNHNKRjhPUVRyN0k1ZnVUSDBYbUZRT05KcFVoazdHdm16QWlNQU1DWVhNX2dXWEF3eF9fYnRFTGVFVUdfb0RIUER6cWE4ZnVCTDV6TW04akZPdWtz?oc=5\" target=\"_blank\">Novel light-based technique shows 90% accuracy in early prostate cancer detection</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Medical Xpress</font>"
    },
    {
        "title": "Pfizer targets broad Talzenna approval in prostate cancer as trial meets patient survival goal - FiercePharma",
        "link": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNNVFud0RhNTB5S2JMdm1CaDBaa3JkSG44RXBqQnk2NEN1czRTQU56WVVIQmJ6S1VMZE9FYkQ0ZXpnRWhBd0kzemZPQnBBUVpwd2QydU8wdDFoallpX0sweDV4LUNXQ2VoeVVqTy1rZHh0bWI3RTJYbHZEMmhkdWZObF90VFFCbmd6Q29oLU0tajdSYmNXMEk0US1TeGJNN1NyNFRwRTZfNkdjc3JoZzg5TnRka2wwUGJLWjFwZURvOFhZQQ?oc=5",
        "pubDate": "Thu, 10 Oct 2024 14:18:27 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiwgFBVV95cUxNNVFud0RhNTB5S2JMdm1CaDBaa3JkSG44RXBqQnk2NEN1czRTQU56WVVIQmJ6S1VMZE9FYkQ0ZXpnRWhBd0kzemZPQnBBUVpwd2QydU8wdDFoallpX0sweDV4LUNXQ2VoeVVqTy1rZHh0bWI3RTJYbHZEMmhkdWZObF90VFFCbmd6Q29oLU0tajdSYmNXMEk0US1TeGJNN1NyNFRwRTZfNkdjc3JoZzg5TnRka2wwUGJLWjFwZURvOFhZQQ?oc=5\" target=\"_blank\">Pfizer targets broad Talzenna approval in prostate cancer as trial meets patient survival goal</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">FiercePharma</font>"
    },
    {
        "title": "Bradford prostate cancer team to attend Saltaire festival as Yorkshire comes top in country for men presenting too late for cure – Bradford Teaching Hospitals NHS Foundation Trust - Bradford Teaching Hospitals NHS Foundation Trust",
        "link": "https://news.google.com/rss/articles/CBMi-gFBVV95cUxQUW04WF9GYnlELTh2VjJRTGpwWWRmWlBHMnhNTjBWQmJ6Vi1Va0RWOEhnemFESkRxVk4zaUlIT0QtNklYSDhqbGQtY0pGWE50YkpBamh1Yk1BOGgzcEZrNXI5OGRocVE0T1VUUXB1V0JlWFhLTmowemI4T3EwcmhkVDdyN29QVWI2OE1FOS11Z0xDSkdUS1hISWV3S1JySThYOUdIa3p2SXdxME1lZDUtVFMtR2hmVVIwTi1SeW9RQmlwLVMtRV84enpLRzlrbzd5ZF92dVhnRnJGWWdjM2N6YkItMi1xQTFybXowZnRSalcwejBFeEZia0pB?oc=5",
        "pubDate": "Wed, 18 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi-gFBVV95cUxQUW04WF9GYnlELTh2VjJRTGpwWWRmWlBHMnhNTjBWQmJ6Vi1Va0RWOEhnemFESkRxVk4zaUlIT0QtNklYSDhqbGQtY0pGWE50YkpBamh1Yk1BOGgzcEZrNXI5OGRocVE0T1VUUXB1V0JlWFhLTmowemI4T3EwcmhkVDdyN29QVWI2OE1FOS11Z0xDSkdUS1hISWV3S1JySThYOUdIa3p2SXdxME1lZDUtVFMtR2hmVVIwTi1SeW9RQmlwLVMtRV84enpLRzlrbzd5ZF92dVhnRnJGWWdjM2N6YkItMi1xQTFybXowZnRSalcwejBFeEZia0pB?oc=5\" target=\"_blank\">Bradford prostate cancer team to attend Saltaire festival as Yorkshire comes top in country for men presenting too late for cure – Bradford Teaching Hospitals NHS Foundation Trust</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Bradford Teaching Hospitals NHS Foundation Trust</font>"
    },
    {
        "title": "New screening trial to save thousands of men’s lives from prostate cancer - The Institute of Cancer Research",
        "link": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPX09UOGRIM2NLcENmNWg2R3h4VFpQRkJVeEdIVFFnd0JRSS02SjM5bU9iSHNsOEE2TklnYWc4WElXZkR4d3U1WU01TWxjNVlPbVBiV3ZRcmdDa296ODluZHIySWJldHJMWF8xNlBOV1pmR1MxdDZ3aDc1T0tZcnFiSnB1Yzlmd0tWQkVGN3JLbEc3NHNzdDY0TXhDaGtxVWE4SzVBemNJZUJ3TDFL?oc=5",
        "pubDate": "Tue, 30 Apr 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMirAFBVV95cUxPX09UOGRIM2NLcENmNWg2R3h4VFpQRkJVeEdIVFFnd0JRSS02SjM5bU9iSHNsOEE2TklnYWc4WElXZkR4d3U1WU01TWxjNVlPbVBiV3ZRcmdDa296ODluZHIySWJldHJMWF8xNlBOV1pmR1MxdDZ3aDc1T0tZcnFiSnB1Yzlmd0tWQkVGN3JLbEc3NHNzdDY0TXhDaGtxVWE4SzVBemNJZUJ3TDFL?oc=5\" target=\"_blank\">New screening trial to save thousands of men’s lives from prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Institute of Cancer Research</font>"
    },
    {
        "title": "Koelis, DeepHealth Collaborate On Prostate Cancer Treatment - MPO-mag",
        "link": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQSHNZeloyWF9NdU5vRjFhcC1UY2x3dXdfYW9keFl4WGpWODQtRjVmc1hyZkVNZGd0MVctNUxWdlVHUncwMnV3bDZ0M25XekR1SHBzUHVlY1JmTU5NZG9vNFYyc3k3VV9GOGFJa2VnV2tuQk5zVVZQcnE4eXNlWUZDSmVrV3JRVU92N0dhNllydFpZNXF5WnVnTjVkSWdsX0RBbnZhNG9SOTZfMFNEakdDNExCS3RVZkJRdjhBb2l1TQ?oc=5",
        "pubDate": "Fri, 11 Oct 2024 14:32:21 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMivwFBVV95cUxQSHNZeloyWF9NdU5vRjFhcC1UY2x3dXdfYW9keFl4WGpWODQtRjVmc1hyZkVNZGd0MVctNUxWdlVHUncwMnV3bDZ0M25XekR1SHBzUHVlY1JmTU5NZG9vNFYyc3k3VV9GOGFJa2VnV2tuQk5zVVZQcnE4eXNlWUZDSmVrV3JRVU92N0dhNllydFpZNXF5WnVnTjVkSWdsX0RBbnZhNG9SOTZfMFNEakdDNExCS3RVZkJRdjhBb2l1TQ?oc=5\" target=\"_blank\">Koelis, DeepHealth Collaborate On Prostate Cancer Treatment</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">MPO-mag</font>"
    },
    {
        "title": "Wiltshire organist's 18-hour hymn recital for cancer charity - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5qMGtaU1dlaXhUZERTR3dZbGh0a09BcFhmY3YwUWMycEdUNjV3M2NOOElpdk1lQm9mRUNUbnAtNkVXdzMxU3J3NGdoXzhMX2RaMnFPYjB0V1owQdIBX0FVX3lxTE9jLVU0cEozUGpaQjlHRi1oSks4MXJSaTlteXlTa0Y1Z1lDNS1vODR2bzllc3Qzam9QRGlFTHktbUtQbmJjMW40UC1iTVdoQkFtTnZfVzRPVFZ4Y2NON2dj?oc=5",
        "pubDate": "Sun, 06 Oct 2024 07:11:23 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTE5qMGtaU1dlaXhUZERTR3dZbGh0a09BcFhmY3YwUWMycEdUNjV3M2NOOElpdk1lQm9mRUNUbnAtNkVXdzMxU3J3NGdoXzhMX2RaMnFPYjB0V1owQdIBX0FVX3lxTE9jLVU0cEozUGpaQjlHRi1oSks4MXJSaTlteXlTa0Y1Z1lDNS1vODR2bzllc3Qzam9QRGlFTHktbUtQbmJjMW40UC1iTVdoQkFtTnZfVzRPVFZ4Y2NON2dj?oc=5\" target=\"_blank\">Wiltshire organist's 18-hour hymn recital for cancer charity</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    },
    {
        "title": "Can Blood Test Predict Survival in Metastatic Prostate Cancer? - The ASCO Post",
        "link": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNRE1td2FSTkVIeFBRMHg1djRRaFpqc0FRNG9DS2p5aVJpUllBSzQ4UVc4RkJXYmExSGI3U3VhTUpzc1hOcUY2YnFROTZSZVNHS3doZ0JfZnV3ZVVMVHMzakliZVF1RDAxaXcyM3VvTElzbDFub1ZEZVB1QWxnd3Y3SnYwSkhwdFFOTVMzU0hTY19yT0ZPUGVkeWh6ZWFPMkRGN1BR?oc=5",
        "pubDate": "Wed, 09 Oct 2024 17:42:18 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiowFBVV95cUxNRE1td2FSTkVIeFBRMHg1djRRaFpqc0FRNG9DS2p5aVJpUllBSzQ4UVc4RkJXYmExSGI3U3VhTUpzc1hOcUY2YnFROTZSZVNHS3doZ0JfZnV3ZVVMVHMzakliZVF1RDAxaXcyM3VvTElzbDFub1ZEZVB1QWxnd3Y3SnYwSkhwdFFOTVMzU0hTY19yT0ZPUGVkeWh6ZWFPMkRGN1BR?oc=5\" target=\"_blank\">Can Blood Test Predict Survival in Metastatic Prostate Cancer?</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The ASCO Post</font>"
    },
    {
        "title": "Specialist equipment to help with identifying prostate cancer - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBwQmNlS1dNcW1PVHRGdE1MbC1yTDhmT3VWWW9GSC1xX2JzTGdERmVFeFNnZTd4YXAwYUJqQlBwWm41bWZ1N2UxajFNVXdHU0hpRm1iLTRyaWhNUdIBX0FVX3lxTE1yUWo2a1VWaWhsSjdWRmJmRmpRNVZ3MnN5ejBSVlNVbk9rRlQ0R3BqTzdYRm9iWlVpSVU2SzdRYm5kbmI2cEhuWU9FVTFFdThqMWRpYnRhNlhhemRaTUM0?oc=5",
        "pubDate": "Tue, 16 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTFBwQmNlS1dNcW1PVHRGdE1MbC1yTDhmT3VWWW9GSC1xX2JzTGdERmVFeFNnZTd4YXAwYUJqQlBwWm41bWZ1N2UxajFNVXdHU0hpRm1iLTRyaWhNUdIBX0FVX3lxTE1yUWo2a1VWaWhsSjdWRmJmRmpRNVZ3MnN5ejBSVlNVbk9rRlQ0R3BqTzdYRm9iWlVpSVU2SzdRYm5kbmI2cEhuWU9FVTFFdThqMWRpYnRhNlhhemRaTUM0?oc=5\" target=\"_blank\">Specialist equipment to help with identifying prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    },
    {
        "title": "Looking backwards and looking forwards: the view from the middle - Nature.com",
        "link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTFA2NTdwWll3Xy1iYS1yNGFyamt0NmxrclY4ZGMzQjA0d2Zua3pyQUtKT3FfNmo4Mmc2TS1DdTZsTGxlM015Q0lEOVdfY2dTOGEzeHlVZWdGMkZYaEZTSmNn?oc=5",
        "pubDate": "Fri, 11 Oct 2024 12:27:42 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiX0FVX3lxTFA2NTdwWll3Xy1iYS1yNGFyamt0NmxrclY4ZGMzQjA0d2Zua3pyQUtKT3FfNmo4Mmc2TS1DdTZsTGxlM015Q0lEOVdfY2dTOGEzeHlVZWdGMkZYaEZTSmNn?oc=5\" target=\"_blank\">Looking backwards and looking forwards: the view from the middle</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Nature.com</font>"
    },
    {
        "title": "Bristol man raises awareness of prostate cancer on tractor - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE1BSDRmc3REVUplQ2toZ1hmSjJXRll0ajk0NENfenRoUlV0ZV9EMHFxRVZSOWhSSV9oX0FjUk83bk1oUWtSYkhmYkRHejJENER1MnN3dDlLUWs2d9IBX0FVX3lxTFBaQTBKUXV0aGZrUEJZeG1XamE5VEVTYkdlTURHV3QwdGZTMXNhcTZCT3M4Q1JfZjFkdl9CSmR5V3pDa0llOTFQcTd1R3k1MGpXZDZiQTY4dlVpclZOb21N?oc=5",
        "pubDate": "Tue, 17 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTE1BSDRmc3REVUplQ2toZ1hmSjJXRll0ajk0NENfenRoUlV0ZV9EMHFxRVZSOWhSSV9oX0FjUk83bk1oUWtSYkhmYkRHejJENER1MnN3dDlLUWs2d9IBX0FVX3lxTFBaQTBKUXV0aGZrUEJZeG1XamE5VEVTYkdlTURHV3QwdGZTMXNhcTZCT3M4Q1JfZjFkdl9CSmR5V3pDa0llOTFQcTd1R3k1MGpXZDZiQTY4dlVpclZOb21N?oc=5\" target=\"_blank\">Bristol man raises awareness of prostate cancer on tractor</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    },
    {
        "title": "The Lancet Commission on prostate cancer: planning for the surge in cases - The Lancet",
        "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxORDEteHdPSW9xYlJDeGdrNmUwWmVWT0dhTkk3UVEwSXNOaWhDM0V5Z2doZmx1M2pSRDdsUFFqd1ZYRkpBY0MzaVZsQ1pGV1FwQTFBa0N6U3VmTVN2V005a3AyaVRqZG5pV3FQQ1hWM2hXbmRqZ180VENVVXUtVkpxNWlPV1ZCUDY3bnI0?oc=5",
        "pubDate": "Wed, 10 Apr 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiiwFBVV95cUxORDEteHdPSW9xYlJDeGdrNmUwWmVWT0dhTkk3UVEwSXNOaWhDM0V5Z2doZmx1M2pSRDdsUFFqd1ZYRkpBY0MzaVZsQ1pGV1FwQTFBa0N6U3VmTVN2V005a3AyaVRqZG5pV3FQQ1hWM2hXbmRqZ180VENVVXUtVkpxNWlPV1ZCUDY3bnI0?oc=5\" target=\"_blank\">The Lancet Commission on prostate cancer: planning for the surge in cases</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Lancet</font>"
    },
    {
        "title": "Prostate cancer patient issues warning about 'silent killer' - BBC",
        "link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE1mWGlUVHJrNDBrR0YyTGxNdTQxc0hsT2laVDRjQ0o2UlhKUFRtcklzanBDREhBNXgyRHQ3cU5vWEdDWEFBcm95UjRUcF9lYnB4clFZZ2h5N1ltb0RY0gFiQVVfeXFMT2hMYkNUZC1SeUt3ejZycEI5MENaaHJPVkk4T1otT25GR1g5ZDlFVzFFOU5pMlc3Zmx6dk9FM2s3eXV3aWZ1Z2hzcFRDYzZxdElVYTVLcFhYQlhESXhtM05WZFE?oc=5",
        "pubDate": "Thu, 27 Jun 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiXEFVX3lxTE1mWGlUVHJrNDBrR0YyTGxNdTQxc0hsT2laVDRjQ0o2UlhKUFRtcklzanBDREhBNXgyRHQ3cU5vWEdDWEFBcm95UjRUcF9lYnB4clFZZ2h5N1ltb0RY0gFiQVVfeXFMT2hMYkNUZC1SeUt3ejZycEI5MENaaHJPVkk4T1otT25GR1g5ZDlFVzFFOU5pMlc3Zmx6dk9FM2s3eXV3aWZ1Z2hzcFRDYzZxdElVYTVLcFhYQlhESXhtM05WZFE?oc=5\" target=\"_blank\">Prostate cancer patient issues warning about 'silent killer'</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC</font>"
    },
    {
        "title": "New tool combining evolution and AI predicts prostate cancer recurrence more than a decade ahead - The Institute of Cancer Research",
        "link": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQSlRUWnlLel9fS1NzUVZwNzNjMzY5ajkzdlptOHpsNWNHQTVnR2hSa1RJTnJOT2s5ODZGb2t0eUR0dlJxWS1fWGNaci1VQW9zMXNXYUt3bVVDekJYLWRQV1dCVmN0NDhVbTZhLU12Q3J0dTZDRjJVbW1LYzFrYTVLNzBTczd6T1B4SkN0a3R1enBhdFVwdzFBRXJxOThleHRQYWZZQ3loV0tpaTE3Tzg1ckFBT01SRlpJY0ZpeFVjUEtyTjQySHVNM0Z3dw?oc=5",
        "pubDate": "Thu, 11 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiywFBVV95cUxQSlRUWnlLel9fS1NzUVZwNzNjMzY5ajkzdlptOHpsNWNHQTVnR2hSa1RJTnJOT2s5ODZGb2t0eUR0dlJxWS1fWGNaci1VQW9zMXNXYUt3bVVDekJYLWRQV1dCVmN0NDhVbTZhLU12Q3J0dTZDRjJVbW1LYzFrYTVLNzBTczd6T1B4SkN0a3R1enBhdFVwdzFBRXJxOThleHRQYWZZQ3loV0tpaTE3Tzg1ckFBT01SRlpJY0ZpeFVjUEtyTjQySHVNM0Z3dw?oc=5\" target=\"_blank\">New tool combining evolution and AI predicts prostate cancer recurrence more than a decade ahead</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Institute of Cancer Research</font>"
    },
    {
        "title": "The Lancet Commission on prostate cancer: planning for the surge in cases - The Lancet",
        "link": "https://news.google.com/rss/articles/CBMiY0FVX3lxTE02LWdUSnpzQmNmQkFHRXBQcEU1UzlyakFYRFBsN0hjeTUtN1RaZHlsVEJOSEpFMV9SLWJoUDh4b0NGbGxJUGdDN0lESURoNjVaN3A0WlUzOEpFbTUzcllIRnJjMA?oc=5",
        "pubDate": "Thu, 04 Apr 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiY0FVX3lxTE02LWdUSnpzQmNmQkFHRXBQcEU1UzlyakFYRFBsN0hjeTUtN1RaZHlsVEJOSEpFMV9SLWJoUDh4b0NGbGxJUGdDN0lESURoNjVaN3A0WlUzOEpFbTUzcllIRnJjMA?oc=5\" target=\"_blank\">The Lancet Commission on prostate cancer: planning for the surge in cases</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Lancet</font>"
    },
    {
        "title": "Scientists develop cheap and quick spit test for prostate cancer - The Guardian",
        "link": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQZm44cHk5WE1QNHlrZzhtT2l2UEVaYnp5LXJRb1ZocFNLdGMwOGlpYXBtWmFJNGpYdmotODFJX3dVWkVQblNSMlVWUjhkVmR6OTJ4SmRMcXVXdzZ6UWJsNzZUQVJBX2pDbFh0RjJOQUJULTNSSWJCWjZWQmF0c1EwbVBpMldvWTFyVDAta0dTcHJtYXVKZldkZTZ1QkJ5ZmYybk9abVJJczhsYmE2WEpLTmxEeU9ZdzFLVVcxU9IBvAFBVV95cUxQY05vQ21TTzlTN25MdjdYZGFDWlgyV2RCemFoU0YtanFGOUF6bHVFM1RUbWZpZ2pFWGJnRlhNRklaSGkxNFF5UXpOMW15VGR5MTd6eFFtc1I0UWRpRC1MWVE5Vmg5cHZwTmp0dTdvMnRUc084OElMUWw5SGE2MHVOLVhIV2tjYWpvWjNFR3ZMcXlmT05MZmpjSmZSTGVydXY3NEo2ZzFiSEVoZjdDZ0o2dzRkSkNOdGI5em40Wg?oc=5",
        "pubDate": "Fri, 31 May 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMivAFBVV95cUxQZm44cHk5WE1QNHlrZzhtT2l2UEVaYnp5LXJRb1ZocFNLdGMwOGlpYXBtWmFJNGpYdmotODFJX3dVWkVQblNSMlVWUjhkVmR6OTJ4SmRMcXVXdzZ6UWJsNzZUQVJBX2pDbFh0RjJOQUJULTNSSWJCWjZWQmF0c1EwbVBpMldvWTFyVDAta0dTcHJtYXVKZldkZTZ1QkJ5ZmYybk9abVJJczhsYmE2WEpLTmxEeU9ZdzFLVVcxU9IBvAFBVV95cUxQY05vQ21TTzlTN25MdjdYZGFDWlgyV2RCemFoU0YtanFGOUF6bHVFM1RUbWZpZ2pFWGJnRlhNRklaSGkxNFF5UXpOMW15VGR5MTd6eFFtc1I0UWRpRC1MWVE5Vmg5cHZwTmp0dTdvMnRUc084OElMUWw5SGE2MHVOLVhIV2tjYWpvWjNFR3ZMcXlmT05MZmpjSmZSTGVydXY3NEo2ZzFiSEVoZjdDZ0o2dzRkSkNOdGI5em40Wg?oc=5\" target=\"_blank\">Scientists develop cheap and quick spit test for prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Guardian</font>"
    },
    {
        "title": "AR Pathway Inhibitors vs Taxanes in mCRPC ProBio Trial - Bram De Laere - UroToday",
        "link": "https://news.google.com/rss/articles/CBMi5AFBVV95cUxQcEV0ZWRmZjNOS0p0N1FhNGloNG1Sc3RLc2R0YkFfeGs2WnAyUWlINzZMMllFUUZmX255Z3lpemxvMEE1S2VHcWI2RHBBRWVPR29ZZWQ4TFJvZmp3ZFNtQ1RhZEZnWlctdkdqY1VuQktKYXFqdmFldnZPZ1lhNjF4ZXhDUHJsZ1EwdjlteFJyX1dLZVF1amowR2JwMFF3TG9lZEE0WHhFdTRlS3ppeFlyNDRvWTJTcmQ0QVJ1dGF5ME9mSnNOa2pRNVdjYjVUY0xqOGFWWDlrcHJ5VWpoQkJqYXhlNmk?oc=5",
        "pubDate": "Tue, 15 Oct 2024 00:43:54 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi5AFBVV95cUxQcEV0ZWRmZjNOS0p0N1FhNGloNG1Sc3RLc2R0YkFfeGs2WnAyUWlINzZMMllFUUZmX255Z3lpemxvMEE1S2VHcWI2RHBBRWVPR29ZZWQ4TFJvZmp3ZFNtQ1RhZEZnWlctdkdqY1VuQktKYXFqdmFldnZPZ1lhNjF4ZXhDUHJsZ1EwdjlteFJyX1dLZVF1amowR2JwMFF3TG9lZEE0WHhFdTRlS3ppeFlyNDRvWTJTcmQ0QVJ1dGF5ME9mSnNOa2pRNVdjYjVUY0xqOGFWWDlrcHJ5VWpoQkJqYXhlNmk?oc=5\" target=\"_blank\">AR Pathway Inhibitors vs Taxanes in mCRPC ProBio Trial - Bram De Laere</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">UroToday</font>"
    },
    {
        "title": "Large-scale study identifies prostate cancer genetic risk factors in a diverse group of African men - Medical Xpress",
        "link": "https://news.google.com/rss/articles/CBMihgFBVV95cUxOSDVQVU1iWVFST01mRld1bmdwY29EMXl3Qkd4MXBabEVxZHZvbHlsNlVaUGVMc2U2WTZNS0VhRGwxRUtnZmNCeDRnNzVDNzYxQlM4X3VjQjhDaFFhNDk2eWpXbFJHY2l1QnNKcXBhdDZaS21LMVFud2VSV2lZZ1RDUjY4anNMUQ?oc=5",
        "pubDate": "Thu, 10 Oct 2024 17:15:28 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMihgFBVV95cUxOSDVQVU1iWVFST01mRld1bmdwY29EMXl3Qkd4MXBabEVxZHZvbHlsNlVaUGVMc2U2WTZNS0VhRGwxRUtnZmNCeDRnNzVDNzYxQlM4X3VjQjhDaFFhNDk2eWpXbFJHY2l1QnNKcXBhdDZaS21LMVFud2VSV2lZZ1RDUjY4anNMUQ?oc=5\" target=\"_blank\">Large-scale study identifies prostate cancer genetic risk factors in a diverse group of African men</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Medical Xpress</font>"
    },
    {
        "title": "Date set for next West Lothian Prostate Cancer Support Group meeting - Daily Record",
        "link": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxPcFNtdmNhTXE1N3ZlRFgwMG1rWHN3cEVHaFhlY0dfemJjRjc1UkU3MjViOXVlcjVDT2NYbnZ5aXVMYl9rMzRaVmlrbkpPaERzSDYwTzhDaTJOeU1PQWdHVlR4RENkeGZiTjZNalZ4ajdSVDRTNEpUUC1xN0Jpc1RRb1dQTkotME1v0gGOAUFVX3lxTE04aDdaOWZiTDNFXzQxQ1d1VGw4SC1fNGVnT0k1QThHSlhEeUludXUtZkZ2ZXBKemFGbGdRd1ZOeUN0MkswVWlfUXJ1angtMkVmWFVrSEVvTVlpWUg5WnZVSzYzbVE2c3M1dWRDMVl2Qnk2SlhFcXlqdWhVUngxdFEzQXBoRy1RcTVBSjVYelE?oc=5",
        "pubDate": "Fri, 11 Oct 2024 08:55:31 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiiAFBVV95cUxPcFNtdmNhTXE1N3ZlRFgwMG1rWHN3cEVHaFhlY0dfemJjRjc1UkU3MjViOXVlcjVDT2NYbnZ5aXVMYl9rMzRaVmlrbkpPaERzSDYwTzhDaTJOeU1PQWdHVlR4RENkeGZiTjZNalZ4ajdSVDRTNEpUUC1xN0Jpc1RRb1dQTkotME1v0gGOAUFVX3lxTE04aDdaOWZiTDNFXzQxQ1d1VGw4SC1fNGVnT0k1QThHSlhEeUludXUtZkZ2ZXBKemFGbGdRd1ZOeUN0MkswVWlfUXJ1angtMkVmWFVrSEVvTVlpWUg5WnZVSzYzbVE2c3M1dWRDMVl2Qnk2SlhFcXlqdWhVUngxdFEzQXBoRy1RcTVBSjVYelE?oc=5\" target=\"_blank\">Date set for next West Lothian Prostate Cancer Support Group meeting</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Daily Record</font>"
    },
    {
        "title": "Cancer cell-selective induction of mitochondrial stress and immunogenic cell death by PT-112 in human prostate cell lines - Journal of Translational Medicine",
        "link": "https://news.google.com/rss/articles/CBMijAFBVV95cUxPYlpDNFlvR3h1QTBLVno4WmNqS2NlWFZTczZqUVNhMEF5eFF3TlRZMXVvUkMyazBOV00wbXZoMlpVRUNXTmQtNnJSRzZMX3AzSFV2R2xhNVhxVEVJMTBHa1A3dS1fSXdJZEIwTGl0S0NwMW5RbUNBR2xfU05fQ3Y0QkNFNmlGQjZaamUtag?oc=5",
        "pubDate": "Fri, 11 Oct 2024 13:07:03 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMijAFBVV95cUxPYlpDNFlvR3h1QTBLVno4WmNqS2NlWFZTczZqUVNhMEF5eFF3TlRZMXVvUkMyazBOV00wbXZoMlpVRUNXTmQtNnJSRzZMX3AzSFV2R2xhNVhxVEVJMTBHa1A3dS1fSXdJZEIwTGl0S0NwMW5RbUNBR2xfU05fQ3Y0QkNFNmlGQjZaamUtag?oc=5\" target=\"_blank\">Cancer cell-selective induction of mitochondrial stress and immunogenic cell death by PT-112 in human prostate cell lines</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Journal of Translational Medicine</font>"
    },
    {
        "title": "Prostate cancer hopes raised after at-home spit test trials - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBmZEhLdlhjWXZPaDZtWTZET05XUjV0NUw5eVhNR0d3ZGVCSFpjNHotXzB5cWtFV2tTTkNyNjBMakNYUHliLWVPQ25MLVZQQzlmNVpuSjgwT09DUdIBX0FVX3lxTE9jUkN6RXhWT3RkMTh1RGNKSFFGYXFBQkpZVF93NkFKTWpQclUyZE55VGVPcW1OcUpTdHVtR3pCTERqcl8zTlA4cDBCWjRHV1FXVVlXNkFPajAwd2wzWmdR?oc=5",
        "pubDate": "Sat, 01 Jun 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTFBmZEhLdlhjWXZPaDZtWTZET05XUjV0NUw5eVhNR0d3ZGVCSFpjNHotXzB5cWtFV2tTTkNyNjBMakNYUHliLWVPQ25MLVZQQzlmNVpuSjgwT09DUdIBX0FVX3lxTE9jUkN6RXhWT3RkMTh1RGNKSFFGYXFBQkpZVF93NkFKTWpQclUyZE55VGVPcW1OcUpTdHVtR3pCTERqcl8zTlA4cDBCWjRHV1FXVVlXNkFPajAwd2wzWmdR?oc=5\" target=\"_blank\">Prostate cancer hopes raised after at-home spit test trials</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    },
    {
        "title": "Analysis of findings from long-term study reveals more genetic mutations associated with aggressive prostate cancer - The Institute of Cancer Research",
        "link": "https://news.google.com/rss/articles/CBMi5AFBVV95cUxOdmhUeXVSQzFiRlVzUjl1NUFfLVVfU0wyeWZmMDlFVGVpR2FOSmp1SmtnakJVS2RMaHBjbHdtS1U2MnhYNV96UHRKRmFXWXdBOEZfTmNqQUlOYWdaQUNxa1hZeEF6dUFTZkhxV0lNYW1SX2hWZGtxVThHZkZaRE81OVVoWi1GcUs1NUJMWldMbldPYnJhSk81ZjV0Zmt2MjZ6cTU2dFowSW4wc3pCRWVuREFlLWhDMkdfc2YtbmFpNm0zWjB5T042TTdFNHpJMlc2dnF5VDVWOGdfZzFCck9jbnRya0c?oc=5",
        "pubDate": "Tue, 02 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi5AFBVV95cUxOdmhUeXVSQzFiRlVzUjl1NUFfLVVfU0wyeWZmMDlFVGVpR2FOSmp1SmtnakJVS2RMaHBjbHdtS1U2MnhYNV96UHRKRmFXWXdBOEZfTmNqQUlOYWdaQUNxa1hZeEF6dUFTZkhxV0lNYW1SX2hWZGtxVThHZkZaRE81OVVoWi1GcUs1NUJMWldMbldPYnJhSk81ZjV0Zmt2MjZ6cTU2dFowSW4wc3pCRWVuREFlLWhDMkdfc2YtbmFpNm0zWjB5T042TTdFNHpJMlc2dnF5VDVWOGdfZzFCck9jbnRya0c?oc=5\" target=\"_blank\">Analysis of findings from long-term study reveals more genetic mutations associated with aggressive prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Institute of Cancer Research</font>"
    },
    {
        "title": "Large study of prostate cancer rates ‘indicative of overdiagnosis’ - Pulse",
        "link": "https://news.google.com/rss/articles/CBMi4wFBVV95cUxOS1NwclRrVFZ5UTIwV0RMX1hjOUlMaThGV3ZmS1hKZE1fQmpkekNpWjBqRHdKSVJEVUJ5dDF4MElCX1BLRWdpY0dWSEFOdGY2ZGhIempIb3AtRlZSNzVWcWNOSWZ1N002V0dYTUpmMS15cmppYldhcnE4ZUZkZlg5VEEyOWlxTzZ3d1NzY3hPT3l5amxla1p5OWRnSDZVN2tjUVNibmI4U1ZZMG1aQVhoVWp3V19LTGVBbC05cldLcEJnRlhMR25tWVktQ09fNUNDWEt5dkRTX1dyMzZkX21oUms1WQ?oc=5",
        "pubDate": "Wed, 25 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi4wFBVV95cUxOS1NwclRrVFZ5UTIwV0RMX1hjOUlMaThGV3ZmS1hKZE1fQmpkekNpWjBqRHdKSVJEVUJ5dDF4MElCX1BLRWdpY0dWSEFOdGY2ZGhIempIb3AtRlZSNzVWcWNOSWZ1N002V0dYTUpmMS15cmppYldhcnE4ZUZkZlg5VEEyOWlxTzZ3d1NzY3hPT3l5amxla1p5OWRnSDZVN2tjUVNibmI4U1ZZMG1aQVhoVWp3V19LTGVBbC05cldLcEJnRlhMR25tWVktQ09fNUNDWEt5dkRTX1dyMzZkX21oUms1WQ?oc=5\" target=\"_blank\">Large study of prostate cancer rates ‘indicative of overdiagnosis’</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Pulse</font>"
    },
    {
        "title": "Pfizer’s Talzenna/Xtandi Combo Hits On OS Endpoint In Prostate Cancer - Scrip",
        "link": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQWUlwdWVZTWpFRXJ4Wm5pU2xIR2lESlRfeW5qSmZ4bmYtTzBVbVdGMjBFSkF4b1NiRHBPNjJnOUNVdWR1V3VUVEFDdU1QTnRRNjRSams2V29UcWdtZlRIYnN0RTBkdXhucEctTTBoTWxQREZ4MFVSbmhmeVRDYU5VMXRINk9aWHMwSWlnRGx5N0haSjNDMHRtRmFFaGlCc0p0RE1xMkdn?oc=5",
        "pubDate": "Thu, 10 Oct 2024 18:06:09 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMipgFBVV95cUxQWUlwdWVZTWpFRXJ4Wm5pU2xIR2lESlRfeW5qSmZ4bmYtTzBVbVdGMjBFSkF4b1NiRHBPNjJnOUNVdWR1V3VUVEFDdU1QTnRRNjRSams2V29UcWdtZlRIYnN0RTBkdXhucEctTTBoTWxQREZ4MFVSbmhmeVRDYU5VMXRINk9aWHMwSWlnRGx5N0haSjNDMHRtRmFFaGlCc0p0RE1xMkdn?oc=5\" target=\"_blank\">Pfizer’s Talzenna/Xtandi Combo Hits On OS Endpoint In Prostate Cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Scrip</font>"
    },
    {
        "title": "Metabolic imaging across scales reveals distinct prostate cancer phenotypes - Nature.com",
        "link": "https://news.google.com/rss/articles/CBMiX0FVX3lxTE8tZWRaVXV1THRhaXNELThTWGVZU2k2aHBMYWFObXo4ZEJfQ2U5R19oaUlXNFhtUENyaHVaTzVrN09MU0tBeTNheGR2cV9uMG1pZGowRXBiRF9VSVI3TXZR?oc=5",
        "pubDate": "Tue, 16 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiX0FVX3lxTE8tZWRaVXV1THRhaXNELThTWGVZU2k2aHBMYWFObXo4ZEJfQ2U5R19oaUlXNFhtUENyaHVaTzVrN09MU0tBeTNheGR2cV9uMG1pZGowRXBiRF9VSVI3TXZR?oc=5\" target=\"_blank\">Metabolic imaging across scales reveals distinct prostate cancer phenotypes</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Nature.com</font>"
    },
    {
        "title": "We are finally improving prostate cancer diagnoses - here's how - New Scientist",
        "link": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQZVVOQzVFMVBXMmpYcTRFeV9TcXFOcjNPUnlIcDZlemZQMlZKSWN5TW5JN2RBdTgwYTJvWjFobUoyQzZpWmVMYUtMT0Fyb1NqWVFIY0RIOGs1ZUIydVdLSzE5TTQtQTNDcGhqQkZhM1ZWR3FxOFZpVTZzenhsZEYxVTE0TXlVLUg3OUpISXNRMG51Vi1IRXlRV0NOMW1EZWRXSGNvaU1YdnY0TWE0RXVLYWZxYw?oc=5",
        "pubDate": "Tue, 13 Aug 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiswFBVV95cUxQZVVOQzVFMVBXMmpYcTRFeV9TcXFOcjNPUnlIcDZlemZQMlZKSWN5TW5JN2RBdTgwYTJvWjFobUoyQzZpWmVMYUtMT0Fyb1NqWVFIY0RIOGs1ZUIydVdLSzE5TTQtQTNDcGhqQkZhM1ZWR3FxOFZpVTZzenhsZEYxVTE0TXlVLUg3OUpISXNRMG51Vi1IRXlRV0NOMW1EZWRXSGNvaU1YdnY0TWE0RXVLYWZxYw?oc=5\" target=\"_blank\">We are finally improving prostate cancer diagnoses - here's how</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">New Scientist</font>"
    },
    {
        "title": "ProtecT trial receives award for pioneering research demonstrating the safety of active surveillance - University of Bristol",
        "link": "https://news.google.com/rss/articles/CBMidEFVX3lxTE9xX0dJZVBvM2M3V3NjaTA1OGlQTzFINkpoXzZiQkZRa0xrMmFmTEE3N216VnlzdnRHRVUzQ0h2MC1NYlFvNy1zelc2SXVYcFNLQVI3dERMc1REMUdIMk9ETV9rTld3LXBxYVFRdkJBUS1DS3NZ?oc=5",
        "pubDate": "Tue, 13 Aug 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMidEFVX3lxTE9xX0dJZVBvM2M3V3NjaTA1OGlQTzFINkpoXzZiQkZRa0xrMmFmTEE3N216VnlzdnRHRVUzQ0h2MC1NYlFvNy1zelc2SXVYcFNLQVI3dERMc1REMUdIMk9ETV9rTld3LXBxYVFRdkJBUS1DS3NZ?oc=5\" target=\"_blank\">ProtecT trial receives award for pioneering research demonstrating the safety of active surveillance</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">University of Bristol</font>"
    },
    {
        "title": "Surrey: Mobile prostate cancer clinic to be deployed - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5mazI4UEt5WV9zbUNINHUwdmJJTF9QbE11cDZJV0NJNUE2M1RCQlctMXhYUTBEbDBGYkppQWw4WEVEVEMwM0d4aUZuRVRQeFF0SkxpWWx6Y2hBd9IBX0FVX3lxTE5DVFFOTGVjOUdEOEQ1VmpwOWNpWk9hMkdNZHZtYjhLRG1uY2pMUWJDUkpyMG9YTzNPLXVnMWJHT3VmeTNkVWZUUENmMm5ONk01cjhHMXM5RldIUHFabXBB?oc=5",
        "pubDate": "Wed, 21 Aug 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTE5mazI4UEt5WV9zbUNINHUwdmJJTF9QbE11cDZJV0NJNUE2M1RCQlctMXhYUTBEbDBGYkppQWw4WEVEVEMwM0d4aUZuRVRQeFF0SkxpWWx6Y2hBd9IBX0FVX3lxTE5DVFFOTGVjOUdEOEQ1VmpwOWNpWk9hMkdNZHZtYjhLRG1uY2pMUWJDUkpyMG9YTzNPLXVnMWJHT3VmeTNkVWZUUENmMm5ONk01cjhHMXM5RldIUHFabXBB?oc=5\" target=\"_blank\">Surrey: Mobile prostate cancer clinic to be deployed</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    },
    {
        "title": "New £42 million screening trial to improve efficacy of prostate cancer screening - QMUL",
        "link": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxPR2tCMUFxMDQ0bl8wU0I5bHJVTnF4akhwSWFFYk1tU3RuSS1aN2R4SWlDQ0VxWGNfakFDdk5SdDFsaHBqd2dhVTBHSUw5VktJN3ZXaER1OXZMdmpSWXBmS2pFenp2eUpjWUFsUUNPdXhaNERMeVpLaUIzMThXWGtlRGNwR0JHQ1VsM2lWVnNjc0diSWFWUTdOTk81SzhWZDlWZXdCMktoZDlnUXFVSzVMNklzRVNaNGxzaGdOMjRzSVJNZWxSeU9uTDlMdDJ4ZTZD?oc=5",
        "pubDate": "Wed, 01 May 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi0AFBVV95cUxPR2tCMUFxMDQ0bl8wU0I5bHJVTnF4akhwSWFFYk1tU3RuSS1aN2R4SWlDQ0VxWGNfakFDdk5SdDFsaHBqd2dhVTBHSUw5VktJN3ZXaER1OXZMdmpSWXBmS2pFenp2eUpjWUFsUUNPdXhaNERMeVpLaUIzMThXWGtlRGNwR0JHQ1VsM2lWVnNjc0diSWFWUTdOTk81SzhWZDlWZXdCMktoZDlnUXFVSzVMNklzRVNaNGxzaGdOMjRzSVJNZWxSeU9uTDlMdDJ4ZTZD?oc=5\" target=\"_blank\">New £42 million screening trial to improve efficacy of prostate cancer screening</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">QMUL</font>"
    },
    {
        "title": "Artificial intelligence reveals prostate cancer is not just one disease - Cancer Research UK News",
        "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQR20tb3FKRjNuQ2M4RW1EQzZLZ2VxMjZUQi1tNWdudkJnV1pOa3VyLWJaMlZ4S0VTY0VIZzJza0xwRHdSXzJSby1hQTFUYmVUcVdyLTVrRlZwb2g5a1BTdHIxcVYzUUp2VWpNeUdaMmFCQnlRRHo1SDY5ZXNsdzZvUFpKZElQZWhDUFNfQUdYZlVacUdOQ2VOc2s4VHhTMmZtTXBGVC1uM1VEbGpLMC1pQnhIMlJzaV9D?oc=5",
        "pubDate": "Thu, 29 Feb 2024 08:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiuAFBVV95cUxQR20tb3FKRjNuQ2M4RW1EQzZLZ2VxMjZUQi1tNWdudkJnV1pOa3VyLWJaMlZ4S0VTY0VIZzJza0xwRHdSXzJSby1hQTFUYmVUcVdyLTVrRlZwb2g5a1BTdHIxcVYzUUp2VWpNeUdaMmFCQnlRRHo1SDY5ZXNsdzZvUFpKZElQZWhDUFNfQUdYZlVacUdOQ2VOc2s4VHhTMmZtTXBGVC1uM1VEbGpLMC1pQnhIMlJzaV9D?oc=5\" target=\"_blank\">Artificial intelligence reveals prostate cancer is not just one disease</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Cancer Research UK News</font>"
    },
    {
        "title": "Dear Doctor: Do I just have to live with sexual disfunction after prostate cancer treatment? - OregonLive",
        "link": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxQaVk4Ni1ValpEanNDRXNTWTBOLU5hc19BUjIyWXdydzNZSnliUHc5ZnBlZHFGWFlockQ0ZVVSTUlCQjJISTM0WGpzamotZmFzTk10aDhGc3hudjM0SldIeERGU19BcEVOMzdfVlEtXzN4bWVUTG5NZldPU0gzc3VMbXhjYzRFS2MxdmxSbGNjVDIydHZrNmpyeHdTdEFucWRuWDRXQ1oxZ09YVTdUWWx2bzNQUDU4ODRPZWEyWmt1RWVTTHZBR1pCUEptZVdGcF9XUHBF0gHnAUFVX3lxTE13V3Jlc2pRa1JPTmZxY3p0bUVGWlJUaVFEZjdONlFjYnQycUVOVThqZmNrTG1RR0M0cDUwLVBWVHl1a2JsYWJTYVRQR282VXh2V1hUdTNhR3VuVGktV202R1NqQXNrVTRLSjhMNUdqb3Eya0RwcHRKeEpWLW1qSFVwemYyUUZiRzJUTFd2YXBOUmp5cWtHMmk4a0xJUS04TG5reGVXTUJzUmwwbnhrYVc2MmRydEgwa3dkSVZucUJhTkdxTFhELTJOUjFKaHlqMDFoZ1J3T01INERMQUFETGR2eGNQVS1uOA?oc=5",
        "pubDate": "Tue, 15 Oct 2024 13:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi0wFBVV95cUxQaVk4Ni1ValpEanNDRXNTWTBOLU5hc19BUjIyWXdydzNZSnliUHc5ZnBlZHFGWFlockQ0ZVVSTUlCQjJISTM0WGpzamotZmFzTk10aDhGc3hudjM0SldIeERGU19BcEVOMzdfVlEtXzN4bWVUTG5NZldPU0gzc3VMbXhjYzRFS2MxdmxSbGNjVDIydHZrNmpyeHdTdEFucWRuWDRXQ1oxZ09YVTdUWWx2bzNQUDU4ODRPZWEyWmt1RWVTTHZBR1pCUEptZVdGcF9XUHBF0gHnAUFVX3lxTE13V3Jlc2pRa1JPTmZxY3p0bUVGWlJUaVFEZjdONlFjYnQycUVOVThqZmNrTG1RR0M0cDUwLVBWVHl1a2JsYWJTYVRQR282VXh2V1hUdTNhR3VuVGktV202R1NqQXNrVTRLSjhMNUdqb3Eya0RwcHRKeEpWLW1qSFVwemYyUUZiRzJUTFd2YXBOUmp5cWtHMmk4a0xJUS04TG5reGVXTUJzUmwwbnhrYVc2MmRydEgwa3dkSVZucUJhTkdxTFhELTJOUjFKaHlqMDFoZ1J3T01INERMQUFETGR2eGNQVS1uOA?oc=5\" target=\"_blank\">Dear Doctor: Do I just have to live with sexual disfunction after prostate cancer treatment?</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">OregonLive</font>"
    },
    {
        "title": "Pompey legend Alan Knight reveals cancer battle - Portsmouth News",
        "link": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNT1ZWU3dLT2pFdEt4bTdxaDJ5aks5RjVoRmZ1Y1I0dkh2czZWTW5xY1Y0cWhGeFNUQy1lRHQ0aExyWUxaMG03M0Q0ZmtyRWRWNHpzVE5KNlhsbk91TGxoNmhWQWhWUkZ5cXhveGxhVXYzYnYxRGhMazdHeXRDYzZpdnFlNWhQcmpHaU4xOVBLUjNyUVg1M2xLMUxPU1B2R1pEZjBRUGVadEpsVXVsd0RENG91MXlnX0dU?oc=5",
        "pubDate": "Thu, 10 Oct 2024 15:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiuAFBVV95cUxNT1ZWU3dLT2pFdEt4bTdxaDJ5aks5RjVoRmZ1Y1I0dkh2czZWTW5xY1Y0cWhGeFNUQy1lRHQ0aExyWUxaMG03M0Q0ZmtyRWRWNHpzVE5KNlhsbk91TGxoNmhWQWhWUkZ5cXhveGxhVXYzYnYxRGhMazdHeXRDYzZpdnFlNWhQcmpHaU4xOVBLUjNyUVg1M2xLMUxPU1B2R1pEZjBRUGVadEpsVXVsd0RENG91MXlnX0dU?oc=5\" target=\"_blank\">Pompey legend Alan Knight reveals cancer battle</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Portsmouth News</font>"
    },
    {
        "title": "Draft NICE guidance recommends ‘at-home’ pill for advance prostate cancer - The Pharmaceutical Journal",
        "link": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNUS05R09BQVVQc3dlcTM2WE1Bb05uRVpqQUFaXzVhVzQyUVFOVkxFUVlfWlVmbnJPM2hKYUd2R1VhdHNnbDdCXzNVYUxVSGtQMVhZS2FBWmg5dFBVdERRV3hNRWJzbVBJMDMtTGtKVm4zZlZWZUhkSkFJRHNaVjEtY3pBdmRhR1VuOThnTGctVDVwRmdwQy16dVBZLTdJVjFLWHVPTUZCNGZ3RVZ3YlBHZmFDTG1NSVpoUEZv?oc=5",
        "pubDate": "Mon, 22 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiuwFBVV95cUxNUS05R09BQVVQc3dlcTM2WE1Bb05uRVpqQUFaXzVhVzQyUVFOVkxFUVlfWlVmbnJPM2hKYUd2R1VhdHNnbDdCXzNVYUxVSGtQMVhZS2FBWmg5dFBVdERRV3hNRWJzbVBJMDMtTGtKVm4zZlZWZUhkSkFJRHNaVjEtY3pBdmRhR1VuOThnTGctVDVwRmdwQy16dVBZLTdJVjFLWHVPTUZCNGZ3RVZ3YlBHZmFDTG1NSVpoUEZv?oc=5\" target=\"_blank\">Draft NICE guidance recommends ‘at-home’ pill for advance prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Pharmaceutical Journal</font>"
    },
    {
        "title": "Artificial Intelligence reveals prostate cancer is not just one disease - The Institute of Cancer Research",
        "link": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxPUG9udlFaZENjcWJyQ1FDQU5jSG9aZW5KN29MZ2oyWGhsOFVnTE82XzZvVFhfb2E3QWRncHNILURILTBEOWJIWE9KaF9sUGdfRzJ5cjZFMXhMRXh5OGk4ZWlST0w2WXB3WmxxOGxJZVFfd2w0MGxKRllPRHk5R3FERjFZYzJvYWVjYTJxSkZxRHNmTXhpbjR6cld4YldyN3hpc3JRS093REY1dw?oc=5",
        "pubDate": "Thu, 29 Feb 2024 08:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiqgFBVV95cUxPUG9udlFaZENjcWJyQ1FDQU5jSG9aZW5KN29MZ2oyWGhsOFVnTE82XzZvVFhfb2E3QWRncHNILURILTBEOWJIWE9KaF9sUGdfRzJ5cjZFMXhMRXh5OGk4ZWlST0w2WXB3WmxxOGxJZVFfd2w0MGxKRllPRHk5R3FERjFZYzJvYWVjYTJxSkZxRHNmTXhpbjR6cld4YldyN3hpc3JRS093REY1dw?oc=5\" target=\"_blank\">Artificial Intelligence reveals prostate cancer is not just one disease</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Institute of Cancer Research</font>"
    },
    {
        "title": "Prostate United | Bluebirds back Prostate Cancer UK’s latest campaign - Cardiff City",
        "link": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNMnk0YU1lSVVITVpPbk5pS2MwQzYtMUx2UFYzTkZrX3ZaZDhsNF9USEFqbVJLeHNobTZUOWxlZmRFcmFPX2FsWUNfdS1GdkJrQ2Y0YlZ2UVRpSzdTaWl3SE1zbWRRZkd0YXgxSjh6RERuSjMyVlNOT282d1Q2TjFoam8zbHlxU3Q5X0lPN09GUFdOVGRtUnlMZ1RWRjgxWXBqczFrS0x3?oc=5",
        "pubDate": "Wed, 25 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMipgFBVV95cUxNMnk0YU1lSVVITVpPbk5pS2MwQzYtMUx2UFYzTkZrX3ZaZDhsNF9USEFqbVJLeHNobTZUOWxlZmRFcmFPX2FsWUNfdS1GdkJrQ2Y0YlZ2UVRpSzdTaWl3SE1zbWRRZkd0YXgxSjh6RERuSjMyVlNOT282d1Q2TjFoam8zbHlxU3Q5X0lPN09GUFdOVGRtUnlMZ1RWRjgxWXBqczFrS0x3?oc=5\" target=\"_blank\">Prostate United | Bluebirds back Prostate Cancer UK’s latest campaign</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Cardiff City</font>"
    },
    {
        "title": "Prostate cancer cases worldwide likely to double by 2040, analysis finds - The Guardian",
        "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOYnhIeklRYUFBaXY1VW5teW95dEVQUXJJclZDOWFzcDZWbUVmX192a3l6ZXhUbTZkNGp6NkVjZVQwbUsySldVSHBZMGh3MXdOdXhKNDVHQmNoMGJsRnlVZEZzSGU0UjA0RUhPY3NRNDdONmJXeEt0elJ1N2xERF9SZ3gzZUpZdWdCUXdqSjVxOWxtMWQ4a0NyM1FvTEh3clVCcUs1M29yYkxKVGvSAasBQVVfeXFMUFRHZlp0TDljSEkwTmN5YTVCay0zdTIyV0FPUnYxU3dtYlBCVDlyeWpVTXdXYjFic1ZYRjNDRkx0NmRQakJCOXg0QUh2Q1gzT3YybXh4QUprOXpaV09HWFBzekpYSDBvNkpsemxKajhpS3lXSGV2WGpkT3h4TjRmYkw4ZlRRcW9WdlVtTkVjTENMUjgxLUZJY3JDaDB6bnhCMnJGaDdzN3I2NU1F?oc=5",
        "pubDate": "Thu, 04 Apr 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiqwFBVV95cUxOYnhIeklRYUFBaXY1VW5teW95dEVQUXJJclZDOWFzcDZWbUVmX192a3l6ZXhUbTZkNGp6NkVjZVQwbUsySldVSHBZMGh3MXdOdXhKNDVHQmNoMGJsRnlVZEZzSGU0UjA0RUhPY3NRNDdONmJXeEt0elJ1N2xERF9SZ3gzZUpZdWdCUXdqSjVxOWxtMWQ4a0NyM1FvTEh3clVCcUs1M29yYkxKVGvSAasBQVVfeXFMUFRHZlp0TDljSEkwTmN5YTVCay0zdTIyV0FPUnYxU3dtYlBCVDlyeWpVTXdXYjFic1ZYRjNDRkx0NmRQakJCOXg0QUh2Q1gzT3YybXh4QUprOXpaV09HWFBzekpYSDBvNkpsemxKajhpS3lXSGV2WGpkT3h4TjRmYkw4ZlRRcW9WdlVtTkVjTENMUjgxLUZJY3JDaDB6bnhCMnJGaDdzN3I2NU1F?oc=5\" target=\"_blank\">Prostate cancer cases worldwide likely to double by 2040, analysis finds</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Guardian</font>"
    },
    {
        "title": "When and Why To Get Screened for Prostate Cancer - Curetoday.com",
        "link": "https://news.google.com/rss/articles/CBMihgFBVV95cUxOamdvbDFOaFFoclFaNHpPTDJ4RWN2a3R5ZU43NUlRZ2Vaeld0eFl0RGtzU2p1R0hTSjM1cGl2ZjJBS2xiV3dMLU11SnU1dDJvWHdFYVFvSkRNY0VLMlk0VHMyQkJRRmlXTmVPODdoWXNYZjdoWDZUR0JQRFBNOFBMSDg4Z0tlUQ?oc=5",
        "pubDate": "Mon, 14 Oct 2024 17:42:59 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMihgFBVV95cUxOamdvbDFOaFFoclFaNHpPTDJ4RWN2a3R5ZU43NUlRZ2Vaeld0eFl0RGtzU2p1R0hTSjM1cGl2ZjJBS2xiV3dMLU11SnU1dDJvWHdFYVFvSkRNY0VLMlk0VHMyQkJRRmlXTmVPODdoWXNYZjdoWDZUR0JQRFBNOFBMSDg4Z0tlUQ?oc=5\" target=\"_blank\">When and Why To Get Screened for Prostate Cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Curetoday.com</font>"
    },
    {
        "title": "CAR-T immunotherapy for prostate cancer? - Harvard Health",
        "link": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQUGc3dmoxX3AzQlZEbzk1ZjJZNFBQeEg2LTBJLXRSTU5xdkxxWmtieXB4djNVX3pONmlnclEyXzZ5bi1TbVBZdmVwV0h2MV9xVkpFVERBTmMwMWxQNm5XMEdwRnhDZjhWaEl2bkxXWEZNNzV0U1UzZGhBSzlQN2hHSWdYeExrTUlWckdoVEJ3bUdwQQ?oc=5",
        "pubDate": "Mon, 16 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMikgFBVV95cUxQUGc3dmoxX3AzQlZEbzk1ZjJZNFBQeEg2LTBJLXRSTU5xdkxxWmtieXB4djNVX3pONmlnclEyXzZ5bi1TbVBZdmVwV0h2MV9xVkpFVERBTmMwMWxQNm5XMEdwRnhDZjhWaEl2bkxXWEZNNzV0U1UzZGhBSzlQN2hHSWdYeExrTUlWckdoVEJ3bUdwQQ?oc=5\" target=\"_blank\">CAR-T immunotherapy for prostate cancer?</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Harvard Health</font>"
    },
    {
        "title": "Low-grade prostate cancer may be rebranded to make it less scary - The Times",
        "link": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPbmtkSXBzRVVVT2xJdnROWklfS3AzS2NwVVROaV93UXVCcWdNVFpHWUlEY0Jld0RoU2ZXSEl3RVd2VnNKMVNRTDZPQ1NLblhTZWQyc2FZbTFYdVNHU3RnSTJBS2JUMDIwemRNazhvdG9BYjl3MUVTRDJvZUVsQUYzWE5WaC1udlBTb0RPZkRseXF2QVVFV21vOXAwX3lpYm1GRG1iaUhnajQ2c2cxZjFBR2dXam1jRWVUVEE?oc=5",
        "pubDate": "Tue, 01 Oct 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiugFBVV95cUxPbmtkSXBzRVVVT2xJdnROWklfS3AzS2NwVVROaV93UXVCcWdNVFpHWUlEY0Jld0RoU2ZXSEl3RVd2VnNKMVNRTDZPQ1NLblhTZWQyc2FZbTFYdVNHU3RnSTJBS2JUMDIwemRNazhvdG9BYjl3MUVTRDJvZUVsQUYzWE5WaC1udlBTb0RPZkRseXF2QVVFV21vOXAwX3lpYm1GRG1iaUhnajQ2c2cxZjFBR2dXam1jRWVUVEE?oc=5\" target=\"_blank\">Low-grade prostate cancer may be rebranded to make it less scary</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Times</font>"
    },
    {
        "title": "Prostate cancer breakthrough as scientists pinpoint protein for treatment - The Independent",
        "link": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPVW1jbVFQUGlXQ0VBWmNxT21pOEJoVmpEbHpGbGJSd3F6WGkxb3J5YmV1eldGRjN3cjBqb3NzV2VkOXR3ajFuY2w0U0lDTGEtVXoxOUFqYTM5a3N1Tllrd0hBUEp4OThRVHZGcG9XemZXZ1dHYzBFUWUxVGxQTUVQamRXU1NfcWNOR1dQaF92MGpWNllEbVA0OGgyOVI2Z3pY?oc=5",
        "pubDate": "Tue, 17 Sep 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMioAFBVV95cUxPVW1jbVFQUGlXQ0VBWmNxT21pOEJoVmpEbHpGbGJSd3F6WGkxb3J5YmV1eldGRjN3cjBqb3NzV2VkOXR3ajFuY2w0U0lDTGEtVXoxOUFqYTM5a3N1Tllrd0hBUEp4OThRVHZGcG9XemZXZ1dHYzBFUWUxVGxQTUVQamRXU1NfcWNOR1dQaF92MGpWNllEbVA0OGgyOVI2Z3pY?oc=5\" target=\"_blank\">Prostate cancer breakthrough as scientists pinpoint protein for treatment</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Independent</font>"
    },
    {
        "title": "Government can save lives and smash inequalities by changing prostate cancer guidelines, say experts - The University of Manchester",
        "link": "https://news.google.com/rss/articles/CBMi1wFBVV95cUxOdjNNNm9LV3NCOWowOExnZEpOTHdMNU15d2JBNEhDWVZkRDhMYWRBU2ZHbjcyOEJiN1RZYlhHZmVJQkFYV0NPUlV2Q1B4cDhxS2tpeXdoUHR3M0xuSEt2THdySFBtbzlNaUp5dURhWXlVMmZTTTBPM25ZZEI1djJ4UW8ySEVRbVJVeFZkZ1dzWmp1anhVU29TVHBkSjRlUndvQURDUGtac0hVZUVYY3BrQ3ozMzRfME5ydzFPTHZFbzB6WUpoRHROajRYQVdwc3Q4UkZTb2JtOA?oc=5",
        "pubDate": "Tue, 23 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMi1wFBVV95cUxOdjNNNm9LV3NCOWowOExnZEpOTHdMNU15d2JBNEhDWVZkRDhMYWRBU2ZHbjcyOEJiN1RZYlhHZmVJQkFYV0NPUlV2Q1B4cDhxS2tpeXdoUHR3M0xuSEt2THdySFBtbzlNaUp5dURhWXlVMmZTTTBPM25ZZEI1djJ4UW8ySEVRbVJVeFZkZ1dzWmp1anhVU29TVHBkSjRlUndvQURDUGtac0hVZUVYY3BrQ3ozMzRfME5ydzFPTHZFbzB6WUpoRHROajRYQVdwc3Q4UkZTb2JtOA?oc=5\" target=\"_blank\">Government can save lives and smash inequalities by changing prostate cancer guidelines, say experts</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The University of Manchester</font>"
    },
    {
        "title": "Pfizer reports positive data from prostate cancer combination therapy trial - Yahoo Finance",
        "link": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxOTWR0NngycWVfelV6SkkzQWpfZkdSSlZYQk5VMFN1R3pVUWtrTDk1bjRkUU9vSkNSalVBSmhNclJVRDA1RHVEWnVqR0lVbW95QXM0OHlWeTJ6STRyeDRwUDdWYzlyU3pma0FfcU5UenRNd1E5MmZfSjZrNk9vSlpsZnFSS2stclNObjBv?oc=5",
        "pubDate": "Fri, 11 Oct 2024 11:21:10 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiiwFBVV95cUxOTWR0NngycWVfelV6SkkzQWpfZkdSSlZYQk5VMFN1R3pVUWtrTDk1bjRkUU9vSkNSalVBSmhNclJVRDA1RHVEWnVqR0lVbW95QXM0OHlWeTJ6STRyeDRwUDdWYzlyU3pma0FfcU5UenRNd1E5MmZfSjZrNk9vSlpsZnFSS2stclNObjBv?oc=5\" target=\"_blank\">Pfizer reports positive data from prostate cancer combination therapy trial</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">Yahoo Finance</font>"
    },
    {
        "title": "'My life was saved after GP put me on trial which randomly checks for prostate cancer' - The Mirror",
        "link": "https://news.google.com/rss/articles/CBMid0FVX3lxTFBwaktCU2wxNW9YYi1sX0M1OGQybGdHSmk0Sko0Ylg2LUEweml1SVg1UXJjdDRTSi1KWFd2RVc1ZUgzZHBmYTJFOFZYeUpTZVlkY3Bvd0V5MnJYOW1idVZBbWZ3YUhLSnJvczBWdWJTWHRQUmFIeWtN0gF8QVVfeXFMT1RuTjg4cWpDd09ZYS1GWG1TMGFvdWpuOEI5eXE4MkxwU1F1M0o5ei1VdzJEV2JtclFFVXpuUnh1eDhrbGJfbVljMmpwcG5oS2NLWWI4d0dINEZkMzRIcmxvbEdfeW9TSmY3c3pTX2xWUTFnUVlVTGxQZEQteA?oc=5",
        "pubDate": "Mon, 14 Oct 2024 10:32:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMid0FVX3lxTFBwaktCU2wxNW9YYi1sX0M1OGQybGdHSmk0Sko0Ylg2LUEweml1SVg1UXJjdDRTSi1KWFd2RVc1ZUgzZHBmYTJFOFZYeUpTZVlkY3Bvd0V5MnJYOW1idVZBbWZ3YUhLSnJvczBWdWJTWHRQUmFIeWtN0gF8QVVfeXFMT1RuTjg4cWpDd09ZYS1GWG1TMGFvdWpuOEI5eXE4MkxwU1F1M0o5ei1VdzJEV2JtclFFVXpuUnh1eDhrbGJfbVljMmpwcG5oS2NLWWI4d0dINEZkMzRIcmxvbEdfeW9TSmY3c3pTX2xWUTFnUVlVTGxQZEQteA?oc=5\" target=\"_blank\">'My life was saved after GP put me on trial which randomly checks for prostate cancer'</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">The Mirror</font>"
    },
    {
        "title": "Talazoparib Plus Enzalutamide Improves Survival in Metastatic CRPC - www.oncnursingnews.com/",
        "link": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOc2NNWDQtWG5zVHBDOGQzM2dtdkdzdVIxZVBwbW5vZE92SFFjZHk5UUF1M3drclFpRk5VSmcxYXh2UUpveUwxQ3c4RFpTT3RrbV9tSzg2VXljanFOdVFkMVVFRG5Sd3c2QWxRdGhvQUM2TXVxSDVKbzEwZWtXemNrRzQ1RHduS2E3MWlBbXp1a0hnMVEydWlQeUFGaUJyalR0SnlwTA?oc=5",
        "pubDate": "Fri, 11 Oct 2024 18:05:12 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMipAFBVV95cUxOc2NNWDQtWG5zVHBDOGQzM2dtdkdzdVIxZVBwbW5vZE92SFFjZHk5UUF1M3drclFpRk5VSmcxYXh2UUpveUwxQ3c4RFpTT3RrbV9tSzg2VXljanFOdVFkMVVFRG5Sd3c2QWxRdGhvQUM2TXVxSDVKbzEwZWtXemNrRzQ1RHduS2E3MWlBbXp1a0hnMVEydWlQeUFGaUJyalR0SnlwTA?oc=5\" target=\"_blank\">Talazoparib Plus Enzalutamide Improves Survival in Metastatic CRPC</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">www.oncnursingnews.com/</font>"
    },
    {
        "title": "MRI screening for prostate cancer shows promise - NIHR Evidence",
        "link": "https://news.google.com/rss/articles/CBMiigFBVV95cUxQaEdldzNxUm90YmRKMmIwbXVVNXVINHJTRDRsalFIbjQzSFFyOXBKNEJOYk1wc0JWWXVzcGdRQXRfQ1RJQkx2MVRaUFhaU1NnVFFNZ3NBS29WQi1WRHFxNHRsa29Qa2dFOElLZzkxMWlQMm04RUphME1oWWhhMEZieHc1WjdzaGtXQlE?oc=5",
        "pubDate": "Wed, 13 Mar 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiigFBVV95cUxQaEdldzNxUm90YmRKMmIwbXVVNXVINHJTRDRsalFIbjQzSFFyOXBKNEJOYk1wc0JWWXVzcGdRQXRfQ1RJQkx2MVRaUFhaU1NnVFFNZ3NBS29WQi1WRHFxNHRsa29Qa2dFOElLZzkxMWlQMm04RUphME1oWWhhMEZieHc1WjdzaGtXQlE?oc=5\" target=\"_blank\">MRI screening for prostate cancer shows promise</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">NIHR Evidence</font>"
    },
    {
        "title": "Lincolnshire bin lorry goes blue for prostate cancer - BBC.com",
        "link": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE1samlTQ2l6dE5taV9UNG9lMlV5a3NqaGJGaXY2RkY2WVZnb2tNR096SExmSGJobUsyb181b2ZibDZLYWQzUE11bWVoWTFWUUNoMF9xRThOeEcwd9IBX0FVX3lxTE1yclpWZFJaRXpaOFNsc01lMWpkVzc5VjlwSklFcVNzaXJrX3FKZEplQW1HazVDY2d2TEVvSlVXMnA0QnczRzM1SHFNdF9SUDhwM3Fza0R2ZWNSWXZQNHRB?oc=5",
        "pubDate": "Tue, 09 Jul 2024 07:00:00 GMT",
        "description": "<a href=\"https://news.google.com/rss/articles/CBMiWkFVX3lxTE1samlTQ2l6dE5taV9UNG9lMlV5a3NqaGJGaXY2RkY2WVZnb2tNR096SExmSGJobUsyb181b2ZibDZLYWQzUE11bWVoWTFWUUNoMF9xRThOeEcwd9IBX0FVX3lxTE1yclpWZFJaRXpaOFNsc01lMWpkVzc5VjlwSklFcVNzaXJrX3FKZEplQW1HazVDY2d2TEVvSlVXMnA0QnczRzM1SHFNdF9SUDhwM3Fza0R2ZWNSWXZQNHRB?oc=5\" target=\"_blank\">Lincolnshire bin lorry goes blue for prostate cancer</a>&nbsp;&nbsp;<font color=\"#6f6f6f\">BBC.com</font>"
    }
  ];

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get('http://localhost:3000/api/news', { responseType: 'text' }).pipe(
      map((rssData: string) => {
        return this.parseXML(rssData);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => 'Something went wrong; please try again later.');
  }

  // Parsing the XML response from Google News RSS
  private parseXML(rssData: string): any[] {
    const parser = new DOMParser();
    const xml = parser.parseFromString(rssData, 'text/xml');
    const items = xml.querySelectorAll('item');
    const parsedNews: any[] = [];

    items.forEach(item => {
      parsedNews.push({
        title: item.querySelector('title')?.textContent,
        link: item.querySelector('link')?.textContent,
        pubDate: item.querySelector('pubDate')?.textContent,
        description: item.querySelector('description')?.textContent,
      });
    });

    return parsedNews;
  }
}
