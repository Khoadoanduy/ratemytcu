// fetch("https://www.ratemyprofessors.com/graphql", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,ja-JP;q=0.6,ja;q=0.5",
//     "authorization": "Basic dGVzdDp0ZXN0",
//     "cache-control": "no-cache",
//     "content-type": "application/json",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "cookie": "_cc_id=64b10e71ab76f6eabbf2776025252d03; _lc2_fpi=5ee24c8f6482--01h9v2na3fkapf9y2my5brrq57; trc_cookie_storage=taboola%2520global%253Auser-id%3D1541ebcb-3606-42e7-9e07-10a6a4831d05-tuctbdd2abc; _hjSessionUser_1667000=eyJpZCI6IjkyNjBhODI3LTE0MjktNTExZi05NDhkLTM3YjljZTYzMDIzOSIsImNyZWF0ZWQiOjE2OTQxOTk2MjEzOTUsImV4aXN0aW5nIjp0cnVlfQ==; cto_bundle=TO9P3F9lQ1BPeGZZVkxwemlrMUI3ZmZ5cWxIODl1ajh1R29Wc3VHTFBtRWRySzhSUlVPeklEY1dzSEZ0MCUyRmZ2bk0lMkJCczZqWW00UE1QQlI3NDZoM1p2TDBqdDhtaGdoeFl4WkhXYTdkcGFLa3R5WDI4RkhFR2NUSUdvOW5LVGtRaThlbFBFYm8lMkY4ZEg4VHFaWmVWdHhYTk9ucDRCb1FWalRzdEtrU3NwJTJGamxSQUZ5MCUzRA; cto_bidid=sPSlF19ZU1lJdnNLZ25Sb0J4d1BGcHZIcUIwbmQ1UmFiSG5SRVpzRXI1ejJuc0dNQ2VjaWNCV0xLN2g2Q3Btem15S0ZOQ1lVJTJCdzJrRDVoaHJCQU5lYXpBZDU2Qlg0MUNJckg0V2t6d1BnaktnZTFLeVl1V1p1Qk95NVI5MDh4WUx2M21k; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2FhLj29uLrffSWTMgwGto7hG8q8xVdF4Gw%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX1%2BP1dIVKAz8w7PIWO4AHAjq5BljvCBkVuQ%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX1%2BwFe%2BddwCaGE3qdB1LMkJFDc6sQv6R5kSH5BJJVBS18kee9ZQg8eFmT4sE7OkNpxZzKVMHo%2BmWiA%3D%3D; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX19%2BKtZwa6UJK9MjyTQ%2FMIjAXifBPG1dz0R4U%2FdO0sNQ6gH5eIGvTFlaigIb0giO9TosDxls8P17qaJMmHp8%2BQXMMmfQRXReMxA%3D; rl_page_init_referring_domain=RudderEncrypt%3AU2FsdGVkX18QKwpr8BFW4QwPdta686Bjg8dwFm6GweRuwburpnImuH%2FDrBCQNPF0; rl_user_id=RudderEncrypt%3AU2FsdGVkX19UhjN95nabgLveQd%2Bqx6Kjuod5MM3yzLWBK5eQFNCbwt5GSQwCrLk1jM30Oc%2F22rKCIAK%2FNB0Nzw%3D%3D; rl_trait=RudderEncrypt%3AU2FsdGVkX199DZbfpnssBNycPKaklWa2r5YfLcOn5HDzL4otwXuCdqVn1SWsKEHg8t9zC2WkOkdWkIdYPDzoTSISyHaaxEWxviHKSakNmyImMJTuj%2Fswhz7XGI6yJBdvDKUtfz9JtdylnPtV6wJespUEFd%2BRf1LXou%2BR9jdAf5BOYIY0kbuDil2WVPblrLvIlwhoMd3VDYCmF57kb3yNeyrEUVr1ZmJafKkrgnPtmO4%3D; rl_session=RudderEncrypt%3AU2FsdGVkX1%2FWBs5%2B%2Bp6DecTGeq%2FBOTJ6uxCVdr4Wn7KUybipbu6g9URN%2FoYYOJu8LIGcxajQh%2Fh0RSgBUXTtvN4y%2FYHDTAA0X0pVqzpCYbZBNETLDEodk01Snju4CzRRGqCFf0uyLeTSZ3twY0yAAg%3D%3D; datadome=4oxWRszNYOV5~_GVFU5~jqNhoC0WjqTf7sNSO1ie~zIIeJV3JnyjAbwjlzJf3k5Qo~0NI_G0jeCAXjJlqfucEHVCU19ud7NoUV-g1Y20elBpgjAQrDRSCGzLAerB0IgU; _ga=GA1.2.1958002172.1694199621; _cc_id=598db235b52fa4144173402060a4e6f1; _pubcid=37b72ec1-e900-499a-95e6-9ffa0aff802a; cto_bidid=KeL8Vl9ZU1lJdnNLZ25Sb0J4d1BGcHZIcUIwbmQ1UmFiSG5SRVpzRXI1ejJuc0dNQ2VjaWNCV0xLN2g2Q3Btem15S0ZOQ1lVJTJCdzJrRDVoaHJCQU5lYXpBZDU2Qlg0MUNJckg0V2t6d1BnaktnZTFJWjRGYUZhU1lyTWRSZ0ppUjFZMFhW; cto_bidid=KeL8Vl9ZU1lJdnNLZ25Sb0J4d1BGcHZIcUIwbmQ1UmFiSG5SRVpzRXI1ejJuc0dNQ2VjaWNCV0xLN2g2Q3Btem15S0ZOQ1lVJTJCdzJrRDVoaHJCQU5lYXpBZDU2Qlg0MUNJckg0V2t6d1BnaktnZTFJWjRGYUZhU1lyTWRSZ0ppUjFZMFhW; cto_bundle=qXpWNl9lQ1BPeGZZVkxwemlrMUI3ZmZ5cWxCRTVXa1hzY2VWREZYdjM5aCUyQmtYYko2OVEzWGhEOXpuQjBhOWw4NFl4JTJCMUp0VE9RTlBrd0JxWjg1blVNT1J4dW1XUkRqNSUyRk02M0V2bHNTVFYlMkJOZnBCT2dxVTJ4cTdKeVh0cUlsbVJ3MjYxNWJpMyUyRmVkQ0lLVGVtcU5Ka20zcERaV1o2VHJxVW9KemlWRVpyeFl4eGFJeHpQS2JaTU5IbDRuMUQ4SldoMHVWeVphT21PZUE2akdKbGxFeFQ4cW5pUEdlSzZXUlhPeHlyeUJPaHpxU2ZVSGhzdWxLMmZ2SVJWcENIUk1kb0Z6ZTdrbFJNclJNTlBzZllXSTFLa0xXOVNPYTglMkJVTU93NnVjdHpIQmFQSmV5TjVpd3BHc3hjdk5oN2J5QXhEcGduaw; cto_bundle=qXpWNl9lQ1BPeGZZVkxwemlrMUI3ZmZ5cWxCRTVXa1hzY2VWREZYdjM5aCUyQmtYYko2OVEzWGhEOXpuQjBhOWw4NFl4JTJCMUp0VE9RTlBrd0JxWjg1blVNT1J4dW1XUkRqNSUyRk02M0V2bHNTVFYlMkJOZnBCT2dxVTJ4cTdKeVh0cUlsbVJ3MjYxNWJpMyUyRmVkQ0lLVGVtcU5Ka20zcERaV1o2VHJxVW9KemlWRVpyeFl4eGFJeHpQS2JaTU5IbDRuMUQ4SldoMHVWeVphT21PZUE2akdKbGxFeFQ4cW5pUEdlSzZXUlhPeHlyeUJPaHpxU2ZVSGhzdWxLMmZ2SVJWcENIUk1kb0Z6ZTdrbFJNclJNTlBzZllXSTFLa0xXOVNPYTglMkJVTU93NnVjdHpIQmFQSmV5TjVpd3BHc3hjdk5oN2J5QXhEcGduaw; _ga_J1PYGTS7GG=GS1.2.1698253218.1.1.1698253444.0.0.0; __gads=ID=fd2e1f629aab4fe0:T=1694199624:RT=1698253612:S=ALNI_MaSx7yUFugj58QoOwL5JT-kd_mRaQ; __gpi=UID=00000d9109401813:T=1694199624:RT=1698253612:S=ALNI_MYHco_85-bdrBW3QNHKDzMhnyAlaw; _ga_WET17VWCJ3=GS1.1.1698253217.10.1.1698253887.0.0.0; ccpa-notice-viewed-02=true; oauthState=Q-ty8zNJEvW-BMzQLyEjv-AWsEbc3Zir6GqpyXdP6xQ; oauthProvider=google; cid=Qhg5moOg7X-20240408; userSchoolId=U2Nob29sLTEwMDg=; userSchoolLegacyId=1008; userSchoolName=Texas%20Christian%20University",
//     "Referer": "https://www.ratemyprofessors.com/professor/2423137",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "{\"query\":\"query TeacherRatingsPageQuery(\\n  $id: ID!\\n) {\\n  node(id: $id) {\\n    __typename\\n    ... on Teacher {\\n      id\\n      legacyId\\n      firstName\\n      lastName\\n      department\\n      school {\\n        legacyId\\n        name\\n        city\\n        state\\n        country\\n        id\\n      }\\n      lockStatus\\n      ...StickyHeader_teacher\\n      ...RatingDistributionWrapper_teacher\\n      ...TeacherInfo_teacher\\n      ...SimilarProfessors_teacher\\n      ...TeacherRatingTabs_teacher\\n    }\\n    id\\n  }\\n}\\n\\nfragment StickyHeader_teacher on Teacher {\\n  ...HeaderDescription_teacher\\n  ...HeaderRateButton_teacher\\n}\\n\\nfragment RatingDistributionWrapper_teacher on Teacher {\\n  ...NoRatingsArea_teacher\\n  ratingsDistribution {\\n    total\\n    ...RatingDistributionChart_ratingsDistribution\\n  }\\n}\\n\\nfragment TeacherInfo_teacher on Teacher {\\n  id\\n  lastName\\n  numRatings\\n  ...RatingValue_teacher\\n  ...NameTitle_teacher\\n  ...TeacherTags_teacher\\n  ...NameLink_teacher\\n  ...TeacherFeedback_teacher\\n  ...RateTeacherLink_teacher\\n  ...CompareProfessorLink_teacher\\n}\\n\\nfragment SimilarProfessors_teacher on Teacher {\\n  department\\n  relatedTeachers {\\n    legacyId\\n    ...SimilarProfessorListItem_teacher\\n    id\\n  }\\n}\\n\\nfragment TeacherRatingTabs_teacher on Teacher {\\n  numRatings\\n  courseCodes {\\n    courseName\\n    courseCount\\n  }\\n  ...RatingsList_teacher\\n  ...RatingsFilter_teacher\\n}\\n\\nfragment RatingsList_teacher on Teacher {\\n  id\\n  legacyId\\n  lastName\\n  numRatings\\n  school {\\n    id\\n    legacyId\\n    name\\n    city\\n    state\\n    avgRating\\n    numRatings\\n  }\\n  ...Rating_teacher\\n  ...NoRatingsArea_teacher\\n  ratings(first: 20) {\\n    edges {\\n      cursor\\n      node {\\n        ...Rating_rating\\n        id\\n        __typename\\n      }\\n    }\\n    pageInfo {\\n      hasNextPage\\n      endCursor\\n    }\\n  }\\n}\\n\\nfragment RatingsFilter_teacher on Teacher {\\n  courseCodes {\\n    courseCount\\n    courseName\\n  }\\n}\\n\\nfragment Rating_teacher on Teacher {\\n  ...RatingFooter_teacher\\n  ...RatingSuperHeader_teacher\\n  ...ProfessorNoteSection_teacher\\n}\\n\\nfragment NoRatingsArea_teacher on Teacher {\\n  lastName\\n  ...RateTeacherLink_teacher\\n}\\n\\nfragment Rating_rating on Rating {\\n  comment\\n  flagStatus\\n  createdByUser\\n  teacherNote {\\n    id\\n  }\\n  ...RatingHeader_rating\\n  ...RatingSuperHeader_rating\\n  ...RatingValues_rating\\n  ...CourseMeta_rating\\n  ...RatingTags_rating\\n  ...RatingFooter_rating\\n  ...ProfessorNoteSection_rating\\n}\\n\\nfragment RatingHeader_rating on Rating {\\n  legacyId\\n  date\\n  class\\n  helpfulRating\\n  clarityRating\\n  isForOnlineClass\\n}\\n\\nfragment RatingSuperHeader_rating on Rating {\\n  legacyId\\n}\\n\\nfragment RatingValues_rating on Rating {\\n  helpfulRating\\n  clarityRating\\n  difficultyRating\\n}\\n\\nfragment CourseMeta_rating on Rating {\\n  attendanceMandatory\\n  wouldTakeAgain\\n  grade\\n  textbookUse\\n  isForOnlineClass\\n  isForCredit\\n}\\n\\nfragment RatingTags_rating on Rating {\\n  ratingTags\\n}\\n\\nfragment RatingFooter_rating on Rating {\\n  id\\n  comment\\n  adminReviewedAt\\n  flagStatus\\n  legacyId\\n  thumbsUpTotal\\n  thumbsDownTotal\\n  thumbs {\\n    thumbsUp\\n    thumbsDown\\n    computerId\\n    id\\n  }\\n  teacherNote {\\n    id\\n  }\\n  ...Thumbs_rating\\n}\\n\\nfragment ProfessorNoteSection_rating on Rating {\\n  teacherNote {\\n    ...ProfessorNote_note\\n    id\\n  }\\n  ...ProfessorNoteEditor_rating\\n}\\n\\nfragment ProfessorNote_note on TeacherNotes {\\n  comment\\n  ...ProfessorNoteHeader_note\\n  ...ProfessorNoteFooter_note\\n}\\n\\nfragment ProfessorNoteEditor_rating on Rating {\\n  id\\n  legacyId\\n  class\\n  teacherNote {\\n    id\\n    teacherId\\n    comment\\n  }\\n}\\n\\nfragment ProfessorNoteHeader_note on TeacherNotes {\\n  createdAt\\n  updatedAt\\n}\\n\\nfragment ProfessorNoteFooter_note on TeacherNotes {\\n  legacyId\\n  flagStatus\\n}\\n\\nfragment Thumbs_rating on Rating {\\n  id\\n  comment\\n  adminReviewedAt\\n  flagStatus\\n  legacyId\\n  thumbsUpTotal\\n  thumbsDownTotal\\n  thumbs {\\n    computerId\\n    thumbsUp\\n    thumbsDown\\n    id\\n  }\\n  teacherNote {\\n    id\\n  }\\n}\\n\\nfragment RateTeacherLink_teacher on Teacher {\\n  legacyId\\n  numRatings\\n  lockStatus\\n}\\n\\nfragment RatingFooter_teacher on Teacher {\\n  id\\n  legacyId\\n  lockStatus\\n  isProfCurrentUser\\n  ...Thumbs_teacher\\n}\\n\\nfragment RatingSuperHeader_teacher on Teacher {\\n  firstName\\n  lastName\\n  legacyId\\n  school {\\n    name\\n    id\\n  }\\n}\\n\\nfragment ProfessorNoteSection_teacher on Teacher {\\n  ...ProfessorNote_teacher\\n  ...ProfessorNoteEditor_teacher\\n}\\n\\nfragment ProfessorNote_teacher on Teacher {\\n  ...ProfessorNoteHeader_teacher\\n  ...ProfessorNoteFooter_teacher\\n}\\n\\nfragment ProfessorNoteEditor_teacher on Teacher {\\n  id\\n}\\n\\nfragment ProfessorNoteHeader_teacher on Teacher {\\n  lastName\\n}\\n\\nfragment ProfessorNoteFooter_teacher on Teacher {\\n  legacyId\\n  isProfCurrentUser\\n}\\n\\nfragment Thumbs_teacher on Teacher {\\n  id\\n  legacyId\\n  lockStatus\\n  isProfCurrentUser\\n}\\n\\nfragment SimilarProfessorListItem_teacher on RelatedTeacher {\\n  legacyId\\n  firstName\\n  lastName\\n  avgRating\\n}\\n\\nfragment RatingValue_teacher on Teacher {\\n  avgRating\\n  numRatings\\n  ...NumRatingsLink_teacher\\n}\\n\\nfragment NameTitle_teacher on Teacher {\\n  id\\n  firstName\\n  lastName\\n  department\\n  school {\\n    legacyId\\n    name\\n    id\\n  }\\n  ...TeacherDepartment_teacher\\n  ...TeacherBookmark_teacher\\n}\\n\\nfragment TeacherTags_teacher on Teacher {\\n  lastName\\n  teacherRatingTags {\\n    legacyId\\n    tagCount\\n    tagName\\n    id\\n  }\\n}\\n\\nfragment NameLink_teacher on Teacher {\\n  isProfCurrentUser\\n  id\\n  legacyId\\n  firstName\\n  lastName\\n  school {\\n    name\\n    id\\n  }\\n}\\n\\nfragment TeacherFeedback_teacher on Teacher {\\n  numRatings\\n  avgDifficulty\\n  wouldTakeAgainPercent\\n}\\n\\nfragment CompareProfessorLink_teacher on Teacher {\\n  legacyId\\n}\\n\\nfragment TeacherDepartment_teacher on Teacher {\\n  department\\n  departmentId\\n  school {\\n    legacyId\\n    name\\n    id\\n  }\\n}\\n\\nfragment TeacherBookmark_teacher on Teacher {\\n  id\\n  isSaved\\n}\\n\\nfragment NumRatingsLink_teacher on Teacher {\\n  numRatings\\n  ...RateTeacherLink_teacher\\n}\\n\\nfragment RatingDistributionChart_ratingsDistribution on ratingsDistribution {\\n  r1\\n  r2\\n  r3\\n  r4\\n  r5\\n}\\n\\nfragment HeaderDescription_teacher on Teacher {\\n  id\\n  firstName\\n  lastName\\n  department\\n  school {\\n    legacyId\\n    name\\n    city\\n    state\\n    id\\n  }\\n  ...TeacherTitles_teacher\\n  ...TeacherBookmark_teacher\\n}\\n\\nfragment HeaderRateButton_teacher on Teacher {\\n  ...RateTeacherLink_teacher\\n}\\n\\nfragment TeacherTitles_teacher on Teacher {\\n  department\\n  school {\\n    legacyId\\n    name\\n    id\\n  }\\n}\\n\",\"variables\":{\"id\":\"VGVhY2hlci0yNDIzMTM3\"}}",
//   "method": "POST"
// }); ;
const PROFESSOR_ID = `
query ($query: TeacherSearchQuery!) {
    newSearch {
        teachers(query: $query) {
            edges {
                node {
                	id
                }
            }
        }
    }
}
`;
const PROFESSOR_DATA = `
query ($id: ID!) {
    node(id: $id) {
        ... on Teacher {
            id
            department
            legacyId
            firstName
            lastName
            avgRating
            numRatings
            avgDifficulty
            wouldTakeAgainPercent
        }
    }
}
`;

const fetchProfIDFallbackLoop = (profName) => {
	return new Promise(async (resolve, reject) => {
		let response = null;
		let raw_response = null;
		
			const SCHOOL_ID = "U2Nob29sLTEwMDg="// TCU ID ;
			raw_response = await fetch(
				"https://www.ratemyprofessors.com/graphql",
				{
					method: "POST",
					headers: {
						"Authorization": "Basic dGVzdDp0ZXN0",
					},
					body: JSON.stringify({
						query: PROFESSOR_ID,
						variables: {
							query: { text: profName, schoolID: SCHOOL_ID },
						},
					}),
				}
			);

			response = await raw_response.json();
			if (response.data.newSearch.teachers.edges.length !== 0) {
				resolve(response);
				return;
			
		}

		resolve(response);
		return;
	});
};

fetch("https://www.ratemyprofessors.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Basic dGVzdDp0ZXN0",
    // Add other necessary headers here
  },
  body: JSON.stringify({
    query: PROFESSOR_DATA,
    variables: {
      id: "VGVhY2hlci0yNDIzMTM3"
    }
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
  // Handle the response data as needed
})
.catch(error => {
  console.error("Error:", error);
});
