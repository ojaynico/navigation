﻿using System;

namespace Navigation
{
	/// <summary>
	/// Configures Web Forms state information. A child of a <see cref="FluentDialog"/>
	/// element, it represents the endpoint of a navigation
	/// </summary>
	public class WebFormsState : FluentState
	{
#if !NET40Plus
		/// <summary>
		/// Initializes a new instance of the <see cref="WebFormsState"/> class
		/// </summary>
		/// <param name="page">The aspx page</param>
		public WebFormsState(string page)
		{
		}
#else
		/// <summary>
		/// Initializes a new instance of the <see cref="WebFormsState"/> class
		/// </summary>
		/// <param name="route">The route Url pattern</param>
		/// <param name="page">The aspx page</param>
		public WebFormsState(string route, string page)
			: base(route)
		{
			if (string.IsNullOrEmpty(page))
				throw new ArgumentException("page");
			AddAttribute("page", page);
		}
#endif
	}
}
