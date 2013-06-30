<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Video API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Video extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Media_Video'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a video
		 * via /api/video/basics/{videos_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a video";

		
		}
		
		/**
		 * action_get_types() Return all formats this video is available in
		 * via /api/video/types/{videos_id}
		 *
		 */
		public function action_get_types()
		{
			$this->payloadDesc = "Return all formats this video is available in";

		     // CHECK FOR PARAMETERS:
			// is_high_def 
			// Show either high def or non-HD video types
				
			if((int)trim($this->request->query('is_high_def')) > 0)
			{
				$is_high_def = (int)trim($this->request->query('is_high_def'));
			}

		}
		
		/**
		 * action_get_meta() Retrives all metadata for a certain video.
		 * via /api/video/meta/{videos_id}
		 *
		 */
		public function action_get_meta()
		{
			$this->payloadDesc = "Retrives all metadata for a certain video.";

		     // CHECK FOR PARAMETERS:
			// video_types_id 
			// Get only video metadata for a specific video type
				
			if((int)trim($this->request->query('video_types_id')) > 0)
			{
				$video_types_id = (int)trim($this->request->query('video_types_id'));
			}

		}

		/**
		 * action_get_search() Search for videos
		 * via /api/video/search/{videos_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "Search for videos";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// sports_id
			// Narrow list based on tagged user's sport affiliations

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id
			// Narrow user list to users of a comp level

			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			// gradyear
			// This will have to search the grad year of all the players tagged in the video

			if(trim($this->request->query('gradyear')) != "")
			{
				$arguments["gradyear"] = trim($this->request->query('gradyear'));
			}

			// orderby
			// Default will be to order by votes.

			if(trim($this->request->query('orderby')) != "")
			{
				$arguments["orderby"] = trim($this->request->query('orderby'));
			}

			// searchtext
			// A string to search names of tagged athletes

			if(trim($this->request->query('searchtext')) != "")
			{
				$arguments["searchtext"] = trim($this->request->query('searchtext'));
			}

			$video_model = ORM::factory("Media_Video");
			return $video_model->getSearch($arguments);
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Post a new Video
		 * via /api/video/add/{0}
		 *
		 */
		public function action_post_add()
		{

			//$this->populateAuthVars();
			if(!$this->is_logged_in)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "You must be logged in in order to upload a video",
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;
			}

			set_time_limit(0);

			ini_set('upload_max_filesize', '500M');
			ini_set('post_max_size', '500M');
			ini_set('max_execution_time', 1800);

			ini_set('max_input_time', 1800);
			@ini_set('track_errors', 1);

			/************************************************************************
			 * This section takes care of chunked uploading and won't return anything
			 * until the chunked uploading is complete and the temp file is saved...
			 ***********************************************************************/

			// Settings
			//	$targetDir = ini_get("upload_tmp_dir") . DIRECTORY_SEPARATOR . "plupload";
			$targetDir = DOCROOT . '../files_temp';
			//$targetDir = '/var/www/files_temp';
//$targetDir = 'uploads';

			$cleanupTargetDir = true; // Remove old files
			$maxFileAge = 5 * 3600; // Temp file age in seconds

// 5 minutes execution time
			@set_time_limit(5 * 60);

// Uncomment this one to fake upload time
// usleep(5000);

// Get parameters
			$chunk = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
			$chunks = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 0;
			$fileName = isset($_REQUEST["name"]) ? $_REQUEST["name"] : '';

// Clean the fileName for security reasons
			$fileName = preg_replace('/[^\w\._]+/', '_', $fileName);

// Make sure the fileName is unique but only if chunking is disabled
			if ($chunks < 2 && file_exists($targetDir . DIRECTORY_SEPARATOR . $fileName))
			{
				$ext = strrpos($fileName, '.');
				$fileName_a = substr($fileName, 0, $ext);
				$fileName_b = substr($fileName, $ext);

				$count = 1;
				while (file_exists($targetDir . DIRECTORY_SEPARATOR . $fileName_a . '_' . $count . $fileName_b))
					$count++;

				$fileName = $fileName_a . '_' . $count . $fileName_b;
			}

			$filePath = $targetDir . DIRECTORY_SEPARATOR . $fileName;

// Create target dir
			if (!file_exists($targetDir))
				@mkdir($targetDir);

// Remove old temp files
			if ($cleanupTargetDir && is_dir($targetDir) && ($dir = opendir($targetDir)))
			{
				while (($file = readdir($dir)) !== false)
				{
					$tmpfilePath = $targetDir . DIRECTORY_SEPARATOR . $file;

					// Remove temp file if it is older than the max age and is not the current file
					if (preg_match('/\.part$/', $file) && (filemtime($tmpfilePath) < time() - $maxFileAge) && ($tmpfilePath != "{$filePath}.part"))
					{
						@unlink($tmpfilePath);
					}
				}

				closedir($dir);
			} else
			{
				$error_array = array(
					"error" => "Failed to open temp directory.",
					"code" => 100
				);
			//	$this->addError($error_array,true);
			}

			$contentType = "";

// Look for the content type header
			if (isset($_SERVER["HTTP_CONTENT_TYPE"]))
				$contentType = $_SERVER["HTTP_CONTENT_TYPE"];

			if (isset($_SERVER["CONTENT_TYPE"]))
				$contentType = $_SERVER["CONTENT_TYPE"];

// Handle non multipart uploads older WebKit versions didn't support multipart in HTML5
			if (strpos($contentType, "multipart") !== false)
			{
				if (isset($_FILES['file']['tmp_name']) && is_uploaded_file($_FILES['file']['tmp_name']))
				{
					// Open temp file
					$out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
					if ($out)
					{
						// Read binary input stream and append it to temp file
						$in = fopen($_FILES['file']['tmp_name'], "rb");

						if ($in)
						{
							while ($buff = fread($in, 4096))
								fwrite($out, $buff);
						} else {
							$error_array = array(
								"error" => "Failed to open input stream.",
								"code" => 101
							);
							$this->addError($error_array,true);
						}
						fclose($in);
						fclose($out);
						@unlink($_FILES['file']['tmp_name']);
					} else
					{
						$error_array = array(
							"error" => "Failed to open output stream.",
							"code" => 102
						);
						$this->addError($error_array,true);
					}
				}
				else
				{
					$error_array = array(
						"error" => "Failed to move uploaded file.",
						"code" => 103
					);
					$this->addError($error_array,true);
				}
			} else
			{
				// Open temp file
				$out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
				if ($out)
				{
					// Read binary input stream and append it to temp file
					$in = fopen("php://input", "rb");

					if ($in)
					{
						while ($buff = fread($in, 4096))
							fwrite($out, $buff);
					}
					else
					{
						// Create Array for Error Data
						$error_array = array(
							"error" => "Failed to open input stream.",
							"code" => 101
						);
						$this->addError($error_array,true);
					}
					fclose($in);
					fclose($out);
				}
				else
				{
					// Create Array for Error Data
					$error_array = array(
						"error" => "Failed to open output stream.",
						"code" => 102
					);
					$this->addError($error_array,true);
				}
			}

			/************************************************************************
			 * Finished with chunked uploading.  Rename the file and call addVideo
			 ************************************************************************/

			// Check if file has been uploaded
			if (!$chunks || $chunk == $chunks - 1)
			{
				// Strip the temp .part suffix off
				rename("{$filePath}.part", $filePath);

				$args['video_file'] = $filePath;

				$this->payloadDesc = "Post a new Video";

			     // CHECK FOR PARAMETERS:
				// name (REQUIRED)
				// The name of the video clip

				if(trim($this->request->post('name')) != "")
				{
					$args['name'] = trim($this->request->post('name'));
				}

				else // THIS WAS A REQUIRED PARAMETER
				{
					// Create Array for Error Data
					$error_array = array(
						"error" => "Required Parameter Missing",
						"param_name" => "name",
						"param_desc" => "The name of the video clip"
					);

					// Set whether it is a fatal error
					$is_fatal = true;

					// Call method to throw an error
					$this->addError($error_array,$is_fatal);

				}

				// sports_id
				// The ID of the sport this video is associated with

				if((int)trim($this->request->post('sports_id')) > 0)
				{
					$args['sports_id'] = (int)trim($this->request->post('sports_id'));
				}

				// video_services_id
				// An optional video service that is responsible for this video

				if((int)trim($this->request->post('video_services_id')) > 0)
				{
					$args['video_services_id'] = (int)trim($this->request->post('video_services_id'));
				}

				$result = $this->mainModel->addVideo($args);

				if(get_class($result) == get_class($this->mainModel))
				{
					return $result;
				}
				elseif(is_subclass_of($result,'Exception'))
				{
					//parse error and add to error array
					$this->processValidationError($result,$this->mainModel->error_message_path);
					return $result;
				}

			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information about a video
		 * via /api/video/basics/{videos_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about a video";

		     // CHECK FOR PARAMETERS:
			// video_services_id 
			// Change the video service this video belongs to
				
			if((int)trim($this->put('video_services_id')) > 0)
			{
				$video_services_id = (int)trim($this->put('video_services_id'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Video
		 * via /api/video/base/{videos_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Video";

		
		}
		
	}